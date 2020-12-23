import React from 'react'
import {hot} from 'react-hot-loader'
import PlayerContainer from 'griffith'

const sources = {
  // 注意，这里手动提供了 auto 品质的 source，因此会无视 useAutoQuality 的配置
  auto: {
    format: 'm3u8',
    play_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  sd: {
    format: 'm3u8',
    play_url:
      'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
  },
}

const props = {
  id: 'test-hls-video',
  title: 'Test HLS Video',
  standalone: true,
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/player.png',
  sources,
  shouldObserveResize: true,
  autoplay: true,
  hiddenTimeline: true,
  hiddenTime: true,
}

const App = () => <PlayerContainer {...props} />

export default hot(module)(App)
