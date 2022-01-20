import Player, {PlayerProps} from 'griffith'
import React from 'react'
import {logEvent} from './utils'
import useQuery from './utils/useQuery'

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

const props: PlayerProps = {
  id: 'test-hls-video',
  title: 'Test HLS Video',
  standalone: true,
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/player.png',
  sources,
  shouldObserveResize: true,
  hiddenTimeline: true,
  hiddenTime: true,
  onEvent: logEvent,
}

const App = () => {
  const query = useQuery()
  const autoplay = 'autoplay' in query

  return (
    <Player
      {...props}
      // FIXME: 无 autoplay 播放中正常，https://github.com/zhihu/griffith/issues/231
      autoplay={autoplay}
      // Player 没有响应 autoplay
      key={String(autoplay)}
    />
  )
}

export default App
