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
  id: string | number
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
 * // register event listener
 * helper.subscribeMessage(EVENTS.PLAY, r => { r.currentTime })
 * helper.subscribeMessage(EVENTS.QUALITY_CHANGE, r => { r.quality })
 * // dispatch action to player
 * helper.dispatchMessage(window, ACTIONS.SET_VOLUME, {volume: .5})
 * // dispose all event listeners
 * helper.dispose()
 * ```
 *
 * @param id 唯一 id，传出消息会带着这个 id
 * @param targetOrigin 对应窗口的域名，不传或者传 * 表示不限制
 * @param shouldValidateId 是否验证传入消息的 id 和自身 id 相同
 */
function createMessageHelper(
  id?: Message['id'],
  targetOrigin = '*',
  shouldValidateId = false
) {
  const disposers = new Set<Unsubscribe>()

  /**
   * Subscribe event from player
   */
  function subscribeMessage<E extends keyof EventParamsMap>(
    name: E,
    handler: (
      data: Parameters<EventParamsMap[E]>[0],
      source: MessageEventSource | null
    ) => void
  ): Unsubscribe
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
  ): Unsubscribe
  function subscribeMessage(arg1: unknown, arg2?: unknown) {
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
        if (!name || typeof handler !== 'function') {
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
        disposers.delete(disposer)
      },
    }
    disposers.add(disposer)
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
      {from: LIB_ID, id, payload: {name, data: data[0]}},
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
