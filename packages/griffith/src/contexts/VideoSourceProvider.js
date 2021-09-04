import React from 'react'
import PropTypes from 'prop-types'
import VideoSourceContext from './VideoSourceContext'
import {getQualities, getSources} from './parsePlaylist'
import {EVENTS} from 'griffith-message'
import {ua} from 'griffith-utils'

const {isMobile} = ua

const getQuery = (url, key) => {
  const [, value] = url.match(new RegExp(`\\b${key}=([^&]+)`)) || []
  return value
}

export default class VideoSourceProvider extends React.Component {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    sources: PropTypes.object,
    id: PropTypes.string.isRequired,
    useAutoQuality: PropTypes.bool,
    playbackRates: PropTypes.arrayOf(PropTypes.object),
    defaultPlaybackRate: PropTypes.object,
  }

  state = {
    qualities: [],
    currentQuality: null,
    format: null,
    sources: [],
    expiration: 0,
    dataKey: null,
    currentPlaybackRate: null,
  }

  static getDerivedStateFromProps = (
    {
      sources: videoSources,
      id,
      defaultQuality,
      useAutoQuality,
      defaultPlaybackRate,
    },
    state
  ) => {
    if (!videoSources) return null
    const {format, play_url} = Object.values(videoSources)[0]
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

  setCurrentQuality = quality => {
    const prevQuality = this.state.currentQuality
    if (prevQuality !== quality) {
      this.setState({currentQuality: quality})
      this.props.onEvent(EVENTS.PLAYER.QUALITY_CHANGE, {
        prevQuality,
        quality,
      })
    }
  }

  setCurrentPlaybackRate = rate => {
    const prevRate = this.state.currentPlaybackRate
    if (prevRate !== rate) {
      this.setState({currentPlaybackRate: rate})
      this.props.onEvent(EVENTS.PLAYER.PLAYBACK_RATE_CHANGE, {
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
      sources.find(item => item.quality === currentQuality) || sources[0]
    return source.source
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
          format,
          sources,
          currentQuality,
          currentPlaybackRate,
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
