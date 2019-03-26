import React from 'react'
import PropTypes from 'prop-types'
import {parse} from 'query-string'
import VideoSourceContext from './VideoSourceContext'
import {getQualities, getSources} from './parsePlaylist'
import {EVENTS} from 'griffith-message'
import {ua} from 'griffith-utils'

const {isMobile} = ua

export default class VideoSourceProvider extends React.Component {
  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    sources: PropTypes.object,
    id: PropTypes.string.isRequired,
  }

  state = {
    qualities: [],
    currentQuality: null,
    format: null,
    sources: [],
    expiration: 0,
    dataKey: null,
  }

  static getDerivedStateFromProps = ({sources: videoSources, id}, state) => {
    if (!videoSources) return null
    const {format, play_url} = Object.values(videoSources)[0]
    const {expiration} = parse(play_url)
    const dataKey = `${id}-${expiration}` // expiration 和 id 组合可以唯一标识一次请求的数据

    if (dataKey == state.dataKey) return null

    const qualities = getQualities(videoSources, isMobile)

    const sources = getSources(qualities, videoSources)

    if (!isMobile && format === 'm3u8') {
      qualities.unshift('auto')
    }
    const currentQuality = state.currentQuality || qualities[0]

    return {
      currentQuality,
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
    const {qualities, currentQuality, format, dataKey, sources} = this.state

    return (
      <VideoSourceContext.Provider
        value={{
          dataKey,
          qualities,
          format,
          sources,
          currentQuality,
          currentSrc: this.getCurrentSrc(),
          setCurrentQuality: this.setCurrentQuality,
        }}
      >
        {this.props.children}
      </VideoSourceContext.Provider>
    )
  }
}
