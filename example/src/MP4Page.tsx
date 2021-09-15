import React, {useState, useLayoutEffect, useContext, useEffect} from 'react'
import Player, {
  MessageContext,
  useMessageContextRef,
  ACTIONS,
  EVENTS,
} from 'griffith'
import {useLocation} from 'react-router-dom'
import Logo from './Logo'
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

const parseQuery = (search: string) =>
  Object.fromEntries(
    new URLSearchParams(search) as unknown as Iterable<[string, string]>
  )

const useQuery = () => {
  const location = useLocation<null>()
  const [query, setQuery] = useState(() => parseQuery(location.search))
  useEffect(() => {
    setQuery(parseQuery(location.search))
  }, [location.search])
  return query
}

/** 常规通讯方式，建议直接使用 `onEvent` 替代 */
const LogoListener: React.FC<{shouldShowLogo: boolean}> = ({
  shouldShowLogo,
}) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false)
  const {subscribeEvent} = useContext(MessageContext)
  useLayoutEffect(() => {
    return subscribeEvent(EVENTS.PLAY_COUNT, () => {
      setIsLogoVisible(true)
    }).unsubscribe
  }, [subscribeEvent])
  return shouldShowLogo && isLogoVisible ? <Logo /> : null
}

const App = () => {
  const messageContextRef = useMessageContextRef()
  const query = useQuery()
  const loop = 'loop' in query

  useEffect(() => {
    return messageContextRef.subscribeEvent(EVENTS.ENDED, () => {
      if (loop) {
        messageContextRef.dispatchAction(ACTIONS.PLAY)
      }
    }).unsubscribe
  }, [messageContextRef, loop])

  return (
    <>
      <Player
        {...props}
        localeConfig={{
          'zh-Hans': {
            'quality-ld': '流畅 360P',
            'quality-sd': '清晰 480P',
            'quality-hd': '高清 720P',
            'quality-fhd': '超清 1080P',
          },
        }}
        locale={'ja'}
        messageContextRef={messageContextRef}
        onEvent={logEvent}
      >
        <LogoListener shouldShowLogo={'logo' in query} />
      </Player>
      <button
        onClick={() => {
          messageContextRef.dispatchAction(ACTIONS.PLAY)
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          messageContextRef.dispatchAction(ACTIONS.PAUSE)
        }}
      >
        Pause
      </button>
    </>
  )
}

export default App
