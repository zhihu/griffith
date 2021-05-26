import React, {useState, useLayoutEffect, useContext} from 'react'
import PlayerContainer, {MessageContext, EVENTS} from 'griffith'
import Logo from './Logo'

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
  // eslint-disable-next-line no-console
  onEvent: console.log.bind(null, 'onEvent:'),
}

const canShowLogo = new URLSearchParams(location.search).has('logo')
/** 常规通讯方式，建议直接使用 `onEvent` 替代 */
const LogoListener = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false)
  const {subscribeEvent} = useContext(MessageContext)
  useLayoutEffect(() => {
    return subscribeEvent(EVENTS.PLAYER.PLAY_COUNT, () => {
      setIsLogoVisible(true)
    }).unsubscribe
  }, [])
  return canShowLogo && isLogoVisible ? <Logo /> : null
}

const App = () => (
  <PlayerContainer {...props}>
    <LogoListener />
  </PlayerContainer>
)

export default App
