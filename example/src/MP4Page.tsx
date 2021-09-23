import React, {useState, useEffect} from 'react'
import Player, {useMessageContextRef, ACTIONS, EVENTS} from 'griffith'
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

const App = () => {
  const query = useQuery()
  const messageContextRef = useMessageContextRef()
  const [isLogoVisible, setIsLogoVisible] = useState(false)

  messageContextRef.useEvent(EVENTS.PLAY_COUNT, () => {
    setIsLogoVisible(true)
  })
  messageContextRef.useEvent(EVENTS.ENDED, () => {
    if ('loop' in query) {
      messageContextRef.dispatchAction(ACTIONS.PLAY)
    }
  })

  return (
    <>
      <Player
        {...props}
        localeConfig={{
          'zh-Hans': {
            'quality-ld': {
              text: '流畅 360P',
              narrow: '流畅',
            },
            'quality-sd': {
              text: '清晰 480P',
              narrow: '清晰',
            },
            'quality-hd': {
              text: '高清 720P',
              narrow: '高清',
            },
            'quality-fhd': {
              text: '超清 1080P',
              narrow: '超清',
            },
          },
        }}
        locale={'zh-Hans'}
        messageContextRef={messageContextRef}
        onEvent={logEvent}
      >
        {'logo' in query && isLogoVisible && <Logo />}
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
