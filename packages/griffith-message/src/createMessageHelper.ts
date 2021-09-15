import {ACTIONS, ActionParamsMap} from './constants/actions'
import {EVENTS, EventParamsMap} from './constants/events'

const LIB_ID = 'griffith'

// 消息载体，真实传递给播放器
type MessagePayload = {
  name: ACTIONS & EVENTS
  data?: unknown
}

// 消息，MessageHelper 在 postMessage 事件中处理
type Message = {
  from: string
  id: string
  payload: MessagePayload
}

type Unsubscribe = {unsubscribe: () => void}

/**
 * 创建一个消息管理器
 *
 * @example
 *
 * ```ts
 * import {createMessageHelper, EVENTS, ACTIONS} from 'griffith-message'
 *
 * const helper = createMessageHelper()
 * helper.subscribeMessage(EVENTS.PLAY, r => { r.currentTime })
 * helper.subscribeMessage(EVENTS.QUALITY_CHANGE, r => { r.quality })
 * helper.dispatchMessage(window, ACTIONS.SET_VOLUME, {volume: .5})
 * helper.dispose()
 * ```
 *
 * @param id 唯一 id，传出消息会带着这个 id
 * @param targetOrigin 对应窗口的域名，不传或者传 * 表示不限制
 * @param shouldValidateId 是否验证传入消息的 id 和自身 id 相同
 */
function createMessageHelper(
  id?: string,
  targetOrigin = '*',
  shouldValidateId = false
) {
  let disposers: Unsubscribe[] = []

  /**
   * Subscribe event from player
   */
  function subscribeMessage<E extends keyof EventParamsMap>(
    name: E,
    handler: (
      data: EventParamsMap[E],
      source: MessageEventSource | null
    ) => void
  ): void
  /**
   * Subscribe event from player
   * @deprecated Please use `subscribeMessage(name, handler)` for better type annotation
   */
  function subscribeMessage(
    handler: (
      name: EVENTS,
      data: unknown,
      source: MessageEventSource | null
    ) => void
  ): void
  function subscribeMessage(arg1: any, arg2?: any) {
    const isLegacy = typeof arg1 === 'function'
    const handler = isLegacy ? arg1 : arg2
    const eventName = isLegacy ? undefined : arg1
    function realHandler(event: MessageEvent<Message>) {
      // 限制消息来源 @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#The_dispatched_event
      const origin = event.origin
      const originIsValidated = targetOrigin === '*' || targetOrigin === origin
      const {from, id: incomingId, payload} = event.data || {}
      const idIsValidated = !shouldValidateId || id === incomingId
      if (originIsValidated && from === LIB_ID && idIsValidated && payload) {
        const {name, data} = payload
        if (!name) {
          return
        }
        if (isLegacy) {
          handler(name, data as any, event.source)
        } else if (eventName === name) {
          handler(data as any, event.source)
        }
      }
    }

    window.addEventListener('message', realHandler)
    const disposer = {
      unsubscribe: () => {
        window.removeEventListener('message', realHandler)
        disposers = disposers.filter((x) => x !== disposer)
      },
    }
    disposers.push(disposer)
    return disposer
  }

  /**
   * Dispose all registered event listeners.
   */
  const dispose = () => {
    disposers.forEach((x) => x.unsubscribe())
  }

  /**
   * Dispatch action to player
   */
  const dispatchMessage = <T extends keyof ActionParamsMap>(
    target: Window,
    name: T,
    ...data: Parameters<ActionParamsMap[T]>
  ) => {
    target?.postMessage?.(
      {from: LIB_ID, id, payload: {name, data}},
      targetOrigin || '*'
    )
  }

  return {
    subscribeMessage,
    dispatchMessage,
    dispose,
  }
}

export default createMessageHelper
