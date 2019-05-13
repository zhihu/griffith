import React from 'react'
import {hot} from 'react-hot-loader'
import PlayerContainer, {MessageContext} from 'griffith'
import LayerTest from './LayerTest'

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

const props = {
  id: 'zhihu2018',
  standalone: true,
  title: '2018 我们如何与世界相处？',
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg',
  duration,
  sources,
  autoplay: true,
  shouldObserveResize: true,
  src: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
}

const App = () => (
  <PlayerContainer {...props}>
    <MessageContext.Consumer>
      {({subscribeEvent}) => <LayerTest subscribeEvent={subscribeEvent} />}
    </MessageContext.Consumer>
  </PlayerContainer>
)

export default hot(module)(App)
