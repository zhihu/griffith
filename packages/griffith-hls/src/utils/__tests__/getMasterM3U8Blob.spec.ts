/**
 * @jest-environment jsdom
 */

import getMasterM3U8Blob from '../getMasterM3U8Blob'

const source = [
  {
    bitrate: 2005,
    size: 46723282,
    format: 'mp4',
    width: 1280,
    height: 720,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
]

test('getMasterM3U8Blob', () => {
  expect(getMasterM3U8Blob(source)).toBeInstanceOf(Blob)
})
