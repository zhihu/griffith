import Player, {
  ACTIONS,
  EVENTS,
  PlayerProps,
  useMessageContextRef,
} from 'griffith'
import React, {useState, useMemo} from 'react'
import Logo from './Logo'
import {logEvent} from './utils'
import {sources as hlsSources} from './HLSPage'
import {useSearchParams} from 'react-router-dom'

const duration = 182

const _sources = {
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

const props: Omit<PlayerProps, 'sources'> = {
  id: 'zhihu2018',
  standalone: true,
  title: '2018 我们如何与世界相处？',
  cover: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg',
  duration,
  shouldObserveResize: true,
  defaultQuality: 'hd',
}

const App = () => {
  const [searchParams] = useSearchParams()
  const loop = searchParams.has('loop')
  const hasLogo = searchParams.has('logo')
  const messageContextRef = useMessageContextRef()
  const [isLogoVisible, setIsLogoVisible] = useState(false)

  messageContextRef.useEvent(EVENTS.PLAY_COUNT, () => {
    setIsLogoVisible(true)
  })
  messageContextRef.useEvent(EVENTS.ENDED, () => {
    if (loop) {
      messageContextRef.dispatchAction(ACTIONS.PLAY)
    }
  })
  const children = useMemo(
    () => hasLogo && isLogoVisible && <Logo />,
    [isLogoVisible, hasLogo]
  )
  const sources = searchParams.has('sd') ? {sd: _sources.sd} : _sources

  return (
    <>
      <Player
        {...props}
        // trigger re-mount
        key={searchParams.get('key')}
        autoplay={searchParams.get('autoplay') !== '0'}
        sources={searchParams.has('hls') ? hlsSources : sources}
        crossOrigin="anonymous"
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
        {children}
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
