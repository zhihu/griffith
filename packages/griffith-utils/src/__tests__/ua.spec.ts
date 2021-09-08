/**
 * @jest-environment jsdom
 */

test('ua', () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value:
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Mobile Safari/537.36',
  })
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {isMobile, isAndroid, isSafari} = require('../ua')
  expect(isMobile).toBe(true)
  expect(isAndroid).toBe(true)
  expect(isSafari).toBe(false)
})
