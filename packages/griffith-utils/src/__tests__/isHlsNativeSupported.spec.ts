/**
 * @jest-environment jsdom
 */

import isHlsNativeSupported from '../isHlsNativeSupported'

test('isHlsNativeSupported', () => {
  expect(typeof isHlsNativeSupported() === 'boolean').toBe(true)
})
