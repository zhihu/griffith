import React from 'react'
import EventEmitter from 'eventemitter3'
import {
  EVENTS,
  ACTIONS,
  ActionParamsMap,
  createMessageHelper,
} from 'griffith-message'

const EVENT_TYPE = 'event'
const ACTION_TYPE = 'action'

interface Subscription {
  unsubscribe: () => void
}

export interface MessageContextValue {
  subscribeEvent: (
    eventName: EVENTS,
    eventHandler: (data: any) => void
  ) => Subscription
  dispatchAction: <T extends keyof ActionParamsMap>(
    actionName: T,
    ...data: Parameters<ActionParamsMap[T]>
  ) => void
}

export interface InternalContextValue {
  emitEvent(eventName: EVENTS, data?: any): void
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

type MessageProviderProps = {
  id: string
  targetOrigin: string
  enableCrossWindow?: boolean
  onEvent?: (name: string, data?: any) => any
  dispatchRef?: React.MutableRefObject<
    MessageContextValue['dispatchAction'] | void
  >
}

type MessageHelper = ReturnType<typeof createMessageHelper>
type AnyFunction = (...args: any[]) => void

export class MessageProvider extends React.PureComponent<MessageProviderProps> {
  static defaultProps = {
    targetOrigin: '*',
  }

  crossWindowMessageSubscription?: ReturnType<MessageHelper['subscribeMessage']>
  emitter: EventEmitter
  crossWindowMessager: MessageHelper
  subscribeCrossWindowMessage: any

  constructor(props: MessageProviderProps) {
    super(props)
    this.emitter = new EventEmitter()
    const {id, targetOrigin} = this.props
    this.crossWindowMessager = createMessageHelper(id, targetOrigin)

    if (this.props.dispatchRef) {
      this.props.dispatchRef.current = this.externalContextValue.dispatchAction
    }

    void Promise.resolve().then(() =>
      this.emitEvent(EVENTS.PLAYER.SUBSCRIPTION_READY)
    )
  }

  componentDidMount() {
    if (this.props.enableCrossWindow) {
      this.crossWindowMessageSubscription =
        this.crossWindowMessager.subscribeMessage((name, data) => {
          this.dispatchAction(name as unknown as ACTIONS, data)
        })
    }
  }

  componentWillUnmount() {
    if (this.crossWindowMessageSubscription) {
      this.crossWindowMessageSubscription.unsubscribe()
    }
  }

  emitEvent = (eventName: EVENTS, data?: any) => {
    this.emitter.emit(eventName, {__type__: EVENT_TYPE, data})
    this.props.onEvent?.(eventName, data)
    if (this.props.enableCrossWindow) {
      this.crossWindowMessager.dispatchMessage(
        window.parent,
        eventName as unknown as ACTIONS,
        data
      )
    }
  }

  subscribeEvent = (eventName: EVENTS, listener: AnyFunction) => {
    const realListener = ({__type__, data}: any = {}) => {
      if (__type__ === EVENT_TYPE) {
        listener(data)
      }
    }
    this.emitter.on(eventName, realListener)

    return {
      unsubscribe: () => this.emitter.off(eventName, realListener),
    }
  }

  dispatchAction = (actionName: ACTIONS, data?: any) => {
    this.emitter.emit(actionName, {__type__: ACTION_TYPE, data})
  }

  subscribeAction = (actionName: ACTIONS, listener: AnyFunction) => {
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
