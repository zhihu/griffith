import React, {useEffect, useRef} from 'react'
import EventEmitter from 'eventemitter3'
import {
  ACTIONS,
  EVENTS,
  ActionParamsMap,
  EventParamsMap,
  createMessageHelper,
} from 'griffith-message'

const EVENT_TYPE = 'event'
const ACTION_TYPE = 'action'

interface Subscription {
  unsubscribe: () => void
}

export interface MessageContextValue {
  subscribeEvent: <T extends keyof EventParamsMap>(
    eventName: T,
    handler: EventParamsMap[T]
  ) => Subscription
  dispatchAction: <T extends keyof ActionParamsMap>(
    actionName: T,
    ...data: Parameters<ActionParamsMap[T]>
  ) => void
}

export interface InternalContextValue {
  emitEvent<T extends keyof EventParamsMap>(
    eventName: T,
    ...data: Parameters<EventParamsMap[T]>
  ): void
  subscribeAction<T extends keyof ActionParamsMap>(
    actionName: T,
    listener: ActionParamsMap[T]
  ): Subscription
}

/**
 * 用于播放器内部，只能接收外界传入的 Action，向外界发出 Event
 */
export const InternalContext = React.createContext<InternalContextValue>(
  {} as any
)
InternalContext.displayName = 'InternalMessageContext'

/**
 * 用于播放器外部，只能接收播放器发出的 Event, 或者向播放器发送 Action
 */
export const ExternalContext = React.createContext<MessageContextValue>(
  null as any
)
ExternalContext.displayName = 'ExternalMessageContext'

type MessageContextRef = React.MutableRefObject<MessageContextValue | void>

type MessageProviderProps = {
  id: string
  targetOrigin: string
  enableCrossWindow?: boolean
  onEvent?: (name: EVENTS, data?: unknown) => void
  dispatchRef?: React.MutableRefObject<
    MessageContextValue['dispatchAction'] | void
  >
  messageContextRef?: MessageContextRef
}

type MessageHelper = ReturnType<typeof createMessageHelper>

/**
 *
 * Retrieve `MessageContext` from outside of Player
 *
 * ```js
 * const messageContextRef = useMessageContextRef()
 *
 * render(
 *  <>
 *    <Player messageContextRef={messageContextRef} />
 *    <button onClick={() => messageContextRef.dispatchAction(ACTIONS.PLAY)}>Play</button>
 *  </>
 * )
 * ```
 */
export const useMessageContextRef = () => {
  const ref = useRef({}).current as MessageContextRef
  useEffect(() => {
    if (!ref.current) {
      throw new Error(
        'Missing ref value, please pass it to Player, eg. `<Player messageContextRef={messageContextRef} />`'
      )
    }
    Object.assign(ref, ref.current)
  }, [ref])
  return ref as MessageContextRef & MessageContextValue
}

export class MessageProvider extends React.PureComponent<MessageProviderProps> {
  static defaultProps = {
    targetOrigin: '*',
  }

  emitter: EventEmitter
  crossWindowMessager: MessageHelper

  constructor(props: MessageProviderProps) {
    super(props)
    this.emitter = new EventEmitter()
    const {id, targetOrigin} = this.props
    this.crossWindowMessager = createMessageHelper(id, targetOrigin)

    if (this.props.dispatchRef) {
      this.props.dispatchRef.current = this.externalContextValue.dispatchAction
    }
    if (this.props.messageContextRef) {
      this.props.messageContextRef.current = this.externalContextValue
    }
    void Promise.resolve().then(() => {
      this.emitEvent(EVENTS.SUBSCRIPTION_READY)
    })
  }

  componentDidMount() {
    if (this.props.enableCrossWindow) {
      this.crossWindowMessager.subscribeMessage((name, data) => {
        // TODO: `createMessageHelper` 应当在 API 上区分内部使用（event/action 与相反）与外部使用，这会导致签名不匹配
        this.dispatchAction(name as any, data as any)
      })
    }
  }

  componentWillUnmount() {
    if (this.props.dispatchRef) {
      this.props.dispatchRef.current = undefined
    }
    if (this.props.messageContextRef) {
      this.props.messageContextRef.current = undefined
    }
    this.crossWindowMessager.dispose()
    this.emitter.removeAllListeners()
  }

  emitEvent: InternalContextValue['emitEvent'] = (eventName, data?) => {
    this.emitter.emit(eventName, {__type__: EVENT_TYPE, data})
    this.props.onEvent?.(eventName, data)
    if (this.props.enableCrossWindow) {
      this.crossWindowMessager.dispatchMessage(
        window.parent,
        eventName as any,
        data as any
      )
    }
  }

  subscribeEvent: MessageContextValue['subscribeEvent'] = (
    eventName,
    listener
  ) => {
    const realListener = ({__type__, data}: any = {}) => {
      if (__type__ === EVENT_TYPE) {
        // @ts-expect-error Argument of type 'any' is not assignable to parameter of type 'never'
        listener(data)
      }
    }
    this.emitter.on(eventName, realListener)

    return {
      unsubscribe: () => this.emitter.off(eventName, realListener),
    }
  }

  dispatchAction: MessageContextValue['dispatchAction'] = (
    actionName,
    data?
  ) => {
    this.emitter.emit(actionName, {__type__: ACTION_TYPE, data})
  }

  subscribeAction: InternalContextValue['subscribeAction'] = (
    actionName,
    listener
  ) => {
    const realListener = ({__type__, data}: any) => {
      if (__type__ === ACTION_TYPE) {
        listener(data)
      }
    }
    this.emitter.on(actionName, realListener)

    return {
      unsubscribe: () => this.emitter.off(actionName, realListener),
    }
  }

  internalContextValue = {
    emitEvent: this.emitEvent,
    subscribeAction: this.subscribeAction,
  }

  externalContextValue = {
    dispatchAction: this.dispatchAction,
    subscribeEvent: this.subscribeEvent,
  }

  render() {
    return (
      <InternalContext.Provider value={this.internalContextValue}>
        <ExternalContext.Provider value={this.externalContextValue}>
          {this.props.children}
        </ExternalContext.Provider>
      </InternalContext.Provider>
    )
  }
}
