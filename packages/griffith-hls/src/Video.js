import React, {Component} from 'react'
import Hls from 'hls.js/dist/hls.light.min'
import {getMasterM3U8Blob} from './utils'

export default class Video extends Component {
  hasLoadStarted = false

  componentDidMount() {
    this.hls = new Hls({autoStartLoad: false})
    this.hls.attachMedia(this.video)
    const {sources} = this.props
    const master = getMasterM3U8Blob(sources)
    this.src = URL.createObjectURL(master)
    this.hls.loadSource(this.src)
  }

  componentDidUpdate(prevProps) {
    const {currentQuality, sources, paused} = this.props
    if (currentQuality !== prevProps.currentQuality) {
      const source = sources.find(source => source.quality === currentQuality)
      if (source) {
        const levels = this.hls.levels
        const level = levels.findIndex(item => item.url.includes(source.source))
        this.hls.nextLevel = level
      } else {
        this.hls.nextLevel = -1
      }
    }

    if (!paused && prevProps.paused && !this.hasLoadStarted) {
      this.hls.startLoad()
      this.hasLoadStarted = true
    }
  }

  componentWillUnmount() {
    this.hls.destroy()
    URL.revokeObjectURL(this.src)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {onRef, currentQuality, src, sources, paused, ...props} = this.props
    return (
      <video
        ref={el => {
          if (onRef) {
            onRef(el)
          }
          this.video = el
        }}
        {...props}
      />
    )
  }
}
