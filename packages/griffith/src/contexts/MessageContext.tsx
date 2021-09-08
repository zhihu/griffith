import React from 'react'
import PropTypes from 'prop-types'
import EventEmitter from 'eventemitter3'
import {EVENTS, createMessageHelper} from 'griffith-message'

const EVENT_TYPE = 'event'
const ACTION_TYPE = 'action'

/**
 * 用于播放器内部，只能接收外界传入的 Action，向外界发出 Event
 */
export const InternalContext = React.createContext({})
InternalContext.displayName = 'InternalMessageContext'

/**
 * 用于播放器外部，只能接收播放器发出的 Event, 或者向播放器发送 Action
 */
export const ExternalContext = React.createContext({})
ExternalContext.displayName = 'ExternalMessageContext'

export class MessageProvider extends React.PureComponent {
  static propsTypes = {
    id: PropTypes.string.isRequired,
    enableCrossWindow: PropTypes.bool,
    targetOrigin: PropTypes.string.isRequired,
    onEvent: PropTypes.func,
    dispatchRef: PropTypes.shape({
      current: PropTypes.func,
    }),
  }

  static defaultProps = {
    targetOrigin: '*',
  }

  crossWindowEventSubscription: any
  crossWindowMessageSubscription: any
  dispatchCrossWindowMessage: any
  emitter: any
  subscribeCrossWindowMessage: any

  constructor(props: any) {
    super(props)
    this.emitter = new EventEmitter()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Readonly<{}>... Remove this comment to see the full error message
    const {id, targetOrigin} = this.props
    const {subscribeMessage, dispatchMessage} = createMessageHelper(
      id,
      targetOrigin
    )

    this.subscribeCrossWindowMessage = subscribeMessage
    this.dispatchCrossWindowMessage = dispatchMessage
    if ((this.props as any).dispatchRef) {
      ;(this.props as any).dispatchRef.current =
        this.externalContextValue.dispatchAction
    }

    Promise.resolve().then(() =>
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      this.emitEvent(EVENTS.PLAYER.SUBSCRIPTION_READY)
    )
  }

  componentDidMount() {
    if ((this.props as any).enableCrossWindow) {
      this.crossWindowMessageSubscription = this.subscribeCrossWindowMessage(
        this.dispatchAction
      )
    }
  }

  componentWillUnmount() {
    if (this.crossWindowEventSubscription) {
      this.crossWindowEventSubscription.unsubscribe()
    }
  }

  emitEvent = (eventName: any, data: any) => {
    this.emitter.emit(eventName, {__type__: EVENT_TYPE, data})
    ;(this.props as any).onEvent?.(eventName, data)
    if ((this.props as any).enableCrossWindow) {
      this.dispatchCrossWindowMessage(window.parent, eventName, data)
    }
  }

  subscribeEvent = (eventName: any, listener: any) => {
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

  dispatchAction = (actionName: any, data: any) => {
    this.emitter.emit(actionName, {__type__: ACTION_TYPE, data})
  }

  subscribeAction = (eventName: any, listener: any) => {
    const realListener = ({__type__, data}: any) => {
      if (__type__ === ACTION_TYPE) {
        listener(data)
      }
    }
    this.emitter.on(eventName, realListener)

    return {
      unsubscribe: () => this.emitter.off(eventName, realListener),
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
