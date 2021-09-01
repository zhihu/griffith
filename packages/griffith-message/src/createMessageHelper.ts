const LIB_ID = 'griffith'

/**
 * 创建一个消息管理器
 * @param id 唯一 id，传出消息会带着这个 id
 * @param targetOrigin 对应窗口的域名，不传或者传 * 表示不限制
 * @param validateId 是否验证传入消息的 id 和自身 id 相同
 */
function createMessageHelper(id, targetOrigin = '*', validateId) {
  function subscribeMessage(handler) {
    function realHandler(event) {
      // 限制消息来源 @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#The_dispatched_event
      const origin = event.origin || event.originalEvent.origin
      const originIsValidated = targetOrigin === '*' || targetOrigin === origin
      const {from, id: incomingId, payload} = event.data || {}
      const idIsValidated = !validateId || id === incomingId
      if (originIsValidated && from === LIB_ID && idIsValidated && payload) {
        const {messageName, data} = payload
        if (messageName) {
          handler(messageName, data, event.source)
        }
      }
    }

    window.addEventListener('message', realHandler)

    return {
      unsubscribe: () => window.removeEventListener('message', realHandler),
    }
  }

  function dispatchMessage(targetWindow, messageName, data) {
    if (targetWindow && targetWindow.postMessage) {
      targetWindow.postMessage(
        {from: LIB_ID, id, payload: {messageName, data}},
        targetOrigin || '*'
      )
    }
  }

  return {
    subscribeMessage,
    dispatchMessage,
  }
}

export default createMessageHelper
