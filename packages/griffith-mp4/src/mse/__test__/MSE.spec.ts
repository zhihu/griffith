/**
 * @jest-environment jsdom
 */

import mp4BoxTree from '../../mp4/__tests__/__mocks__/mp4BoxTree'
import MSE from '../MSE'

if (!window.MediaSource) {
  Object.assign(window, {MediaSource: class MediaSource extends EventTarget {}})
}

if (!URL.createObjectURL) {
  URL.createObjectURL = (url: string) => url
}

test('MSE', () => {
  expect(
    () => new MSE(document.createElement('video'), mp4BoxTree)
  ).not.toThrow()
})
