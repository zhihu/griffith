import Player, {PlayerProps} from 'griffith'
import React from 'react'
import {logEvent} from './utils'

const duration = 182

const sources = {
  hd: {
    bitrate: 2005,
    size: 46723282,
    duration,
    format: 'mp4',
    width: 1280,
    height: 720,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    bitrate: 900.49,
    size: 20633151,
    duration,
    format: 'mp4',
    width: 320,
    height: 240,
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
}

const props: PlayerProps = {
  id: 'zhihu2018',
  standalone: true,
  title: '2018 我们如何与世界相处？',
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg',
  duration,
  sources,
  shouldObserveResize: true,
  useMSE: true,
  // FIXME: 有无 autoplay 都有 bug
  autoplay: true,
  onEvent: logEvent,
}

const App = () => <Player {...props} />
export default App
