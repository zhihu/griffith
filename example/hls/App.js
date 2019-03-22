import React from 'react'
import {hot} from 'react-hot-loader'
import PlayerContainer from 'griffith'

const duration = 89

const sources = {
  hd: {
    bitrate: 905,
    size: 10105235,
    duration,
    format: 'm3u8',
    width: 640,
    height: 480,
    play_url:
      'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/hd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
  sd: {
    bitrate: 580,
    size: 6531802,
    duration,
    format: 'm3u8',
    width: 320,
    height: 240,
    play_url:
      'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/sd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
  ld: {
    bitrate: 261,
    size: 2984172,
    duration,
    format: 'm3u8',
    width: 160,
    height: 120,
    play_url:
      'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/ld-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
  },
}

const props = {
  id: 'zhihu2018',
  title: '2018 我们如何与世界相处？',
  standalone: true,
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/player.png',
  duration,
  sources,
  shouldObserveResize: true,
}

const App = () => <PlayerContainer {...props} />

export default hot(module)(App)
