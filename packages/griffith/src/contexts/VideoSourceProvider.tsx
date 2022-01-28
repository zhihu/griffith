import React, {useContext, useEffect, useMemo, useState} from 'react'
import {PlaySourceMap, PlaybackRate, RealQuality, Quality} from '../types'
import VideoSourceContext from './VideoSourceContext'
import {getQualities, getSources} from './parsePlaylist'
import {EVENTS} from 'griffith-message'
import {ua} from 'griffith-utils'
import useHandler from '../hooks/useHandler'
import useChanged from '../hooks/useChanged'
import {InternalMessageContext} from './MessageContext'
import usePrevious from '../hooks/usePrevious'

const {isMobile} = ua

type VideoSourceProviderProps = {
  sources: PlaySourceMap
  defaultQuality?: RealQuality
  useAutoQuality?: boolean
  playbackRates: PlaybackRate[]
  defaultPlaybackRate?: PlaybackRate
}

const VideoSourceProvider: React.FC<VideoSourceProviderProps> = ({
  sources: sourceMap,
  useAutoQuality,
  playbackRates,
  defaultPlaybackRate,
  defaultQuality,
  children,
}) => {
  const {emitEvent} = useContext(InternalMessageContext)
  const lastSourceMap = useChanged(sourceMap)
  const {qualities, sources, format} = useMemo(() => {
    // 其实视频源应当是必需参数
    if (!lastSourceMap) {
      return {qualities: [], sources: []}
    }
    const {format} = Object.values(lastSourceMap)[0]!
    const qualities = getQualities(lastSourceMap, isMobile)
    const sources = getSources(qualities, lastSourceMap)

    // 目前只有直播流实现了手动拼接 auto 清晰度的功能
    if (
      useAutoQuality &&
      !isMobile &&
      format === 'm3u8' &&
      !qualities.includes('auto')
    ) {
      qualities.unshift('auto')
    }

    return {qualities, sources, format}
  }, [useAutoQuality, lastSourceMap])

  const [currentQuality, setCurrentQualityRaw] = useState(
    defaultQuality || qualities[0]
  )
  const [playbackRate, setPlaybackRate] = useState(defaultPlaybackRate)

  const setCurrentQuality = useHandler((quality: Quality) => {
    if (currentQuality !== quality) {
      setCurrentQualityRaw(quality)
      emitEvent(EVENTS.QUALITY_CHANGE, {
        prevQuality: currentQuality,
        quality,
      })
    }
  })

  // 当 sources 改变重置 `currentQuality`
  const prevQualities = usePrevious(qualities)
  useEffect(() => {
    if (prevQualities && prevQualities !== qualities) {
      setCurrentQuality(defaultQuality || qualities[0])
    }
  }, [prevQualities, qualities, defaultQuality, setCurrentQuality])

  const setCurrentPlaybackRate = useHandler((rate: PlaybackRate) => {
    if (playbackRate !== rate) {
      setPlaybackRate(rate)
      emitEvent(EVENTS.PLAYBACK_RATE_CHANGE, {
        prevRate: playbackRate!,
        rate,
      })
    }
  })

  // 根据当前清晰度返回对应的 src
  const currentSrc = useMemo(() => {
    if (sources.length === 0) {
      return
    }

    const source =
      sources.find((item) => item.quality === currentQuality) || sources[0]
    return source.source
  }, [currentQuality, sources])

  const contextValue = useMemo(
    () => ({
      qualities,
      playbackRates,
      format: format!,
      sources,
      currentQuality,
      currentPlaybackRate: playbackRate!,
      currentSrc: currentSrc!,
      setCurrentQuality,
      setCurrentPlaybackRate,
    }),
    [
      playbackRate,
      currentQuality,
      currentSrc,
      format,
      playbackRates,
      qualities,
      setCurrentPlaybackRate,
      setCurrentQuality,
      sources,
    ]
  )

  return (
    <VideoSourceContext.Provider value={contextValue}>
      {children}
    </VideoSourceContext.Provider>
  )
}

export default VideoSourceProvider
