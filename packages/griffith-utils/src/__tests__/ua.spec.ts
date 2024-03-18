/**
 * @jest-environment jsdom
 */

import ua, {parseUA} from '../ua'

test('ua', () => {
  expect(ua).toMatchSnapshot()
})

test('parse', () => {
  expect(
    parseUA(
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Mobile Safari/537.36'
    )
  ).toMatchSnapshot()
})
