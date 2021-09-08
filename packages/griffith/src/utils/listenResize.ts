import debounce from 'lodash/debounce'

const listenResizePolyfill = (target: any, callback: any) => {
  const MutationObserver =
    window.MutationObserver || (window as any).WebKitMutationObserver
  let lastRect: any
  const handler = () => {
    const rect = target.getBoundingClientRect()
    const isChanged = !(
      lastRect &&
      ['left', 'top', 'width', 'height'].every((k) => lastRect[k] === rect[k])
    )
    if (isChanged) {
      lastRect = rect
      callback(rect)
    }
  }
  const debounceHandler = debounce(handler, 100)
  const observer = new MutationObserver(debounceHandler)
  observer.observe(target, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  })
  handler()
  window.addEventListener('resize', handler)
  return () => {
    observer.disconnect()
    window.removeEventListener('resize', handler)
  }
}

const listenResizeNative = (target: any, callback: any) => {
  const observer = new ResizeObserver((changes) =>
    callback(changes[0].contentRect)
  )
  observer.observe(target)
  return () => {
    observer.disconnect()
  }
}

/** 监听元素大小改改 @see https://caniuse.com/#search=ResizeObserver */
const listenResize =
  typeof ResizeObserver === 'function'
    ? listenResizeNative
    : listenResizePolyfill

export default listenResize
