import React from 'react'
import {PlaySourceMap, PlaybackRate, RealQuality} from '../types'
import VideoSourceContext, {VideoSourceContextValue} from './VideoSourceContext'
import {getQualities, getSources} from './parsePlaylist'
import {EVENTS} from 'griffith-message'
import {ua} from 'griffith-utils'

const {isMobile} = ua

const getQuery = (url: any, key: any) => {
  const [, value] = url.match(new RegExp(`\\b${key}=([^&]+)`)) || []
  return value
}

type VideoSourceProviderProps = {
  onEvent: (...args: any[]) => any
  sources: PlaySourceMap
  id: string
  defaultQuality?: RealQuality
  useAutoQuality?: boolean
  playbackRates: PlaybackRate[]
  defaultPlaybackRate?: PlaybackRate
}

type VideoSourceProviderState = Partial<VideoSourceContextValue>

export default class VideoSourceProvider extends React.Component<
  VideoSourceProviderProps,
  VideoSourceProviderState
> {
  state = {
    qualities: [],
    currentQuality: undefined,
    format: undefined,
    sources: [],
    expiration: 0,
    dataKey: undefined,
    currentPlaybackRate: undefined,
  }

  static getDerivedStateFromProps = (
    {
      sources: videoSources,
      id,
      defaultQuality,
      useAutoQuality,
      defaultPlaybackRate,
    }: VideoSourceProviderProps,
    state: VideoSourceProviderState
  ) => {
    if (!videoSources) return null
    const {format, play_url} = Object.values(videoSources)[0]!
    const expiration = getQuery(play_url, 'expiration')
    const dataKey = `${id}-${expiration}` // expiration 和 id 组合可以唯一标识一次请求的数据

    if (dataKey == state.dataKey) return null

    const qualities = getQualities(videoSources, isMobile)

    const sources = getSources(qualities, videoSources)

    // 目前只有直播流实现了手动拼接 auto 清晰度的功能
    if (
      useAutoQuality &&
      !isMobile &&
      format === 'm3u8' &&
      !qualities.includes('auto')
    ) {
      qualities.unshift('auto')
    }

    const defaultCurrentQuality = defaultQuality || qualities[0]
    const currentQuality = state.currentQuality || defaultCurrentQuality
    const currentPlaybackRate = state.currentPlaybackRate || defaultPlaybackRate
    return {
      currentQuality,
      currentPlaybackRate,
      qualities,
      sources,
      format,
      expiration: Number(expiration),
      dataKey,
    }
  }

  setCurrentQuality = (quality: any) => {
    const prevQuality = this.state.currentQuality
    if (prevQuality !== quality) {
      this.setState({currentQuality: quality})
      this.props.onEvent(EVENTS.QUALITY_CHANGE, {
        prevQuality,
        quality,
      })
    }
  }

  setCurrentPlaybackRate = (rate: any) => {
    const prevRate = this.state.currentPlaybackRate
    if (prevRate !== rate) {
      this.setState({currentPlaybackRate: rate})
      this.props.onEvent(EVENTS.PLAYBACK_RATE_CHANGE, {
        prevRate,
        rate,
      })
    }
  }

  /**
   * 获得当前 src, 根据当前清晰度返回对应的 src
   */
  getCurrentSrc = () => {
    const {currentQuality, sources} = this.state
    if (sources.length === 0) {
      return
    }

    const source =
      sources.find((item) => (item as any).quality === currentQuality) ||
      sources[0]
    return (source as any).source
  }

  render() {
    const {
      qualities,
      currentQuality,
      format,
      dataKey,
      sources,
      currentPlaybackRate,
    } = this.state
    const {playbackRates} = this.props
    return (
      <VideoSourceContext.Provider
        value={{
          dataKey,
          qualities,
          playbackRates,
          format: format!,
          sources,
          currentQuality: currentQuality!,
          currentPlaybackRate: currentPlaybackRate!,
          currentSrc: this.getCurrentSrc(),
          setCurrentQuality: this.setCurrentQuality,
          setCurrentPlaybackRate: this.setCurrentPlaybackRate,
        }}
      >
        {this.props.children}
      </VideoSourceContext.Provider>
    )
  }
}
