/**
 * @jest-environment jsdom
 */

import isMSESupported from '../isMSESupported'

test('isMSESupported', () => {
  expect(typeof isMSESupported() === 'boolean').toBe(true)
})
