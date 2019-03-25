import React, {Component} from 'react'
import {ua} from 'griffith-utils'
import MSE from './mse'

const {isSafari} = ua

export default class Player extends Component {
  componentDidMount() {
    this.mse = new MSE(this.video, this.props.src)
    this.mse.init()
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.mse = new MSE(this.video, this.props.src)
    }
  }

  componentWillUnmount() {
    this.mse.destroy()
  }

  handleTimeUpdate = e => {
    this.mse.handleTimeUpdate()
    this.props.onTimeUpdate(e)
  }

  handleVideoSeeking = e => {
    const currentTime = this.video.currentTime
    const buffered = this.video.buffered

    if (isSafari) {
      if (currentTime - 0.1 > buffered.start(0)) {
        this.mse.seek(this.video.currentTime)
      } else if (currentTime < buffered.start(0)) {
        this.handleSafariBug()
        return
      }
    } else {
      this.mse.seek(this.video.currentTime)
    }
    this.props.onSeeking(e)
  }

  handlePlay = e => {
    const {currentTime, buffered = []} = this.video
    if (currentTime === 0 && !buffered.length) {
      this.mse.seek(0)
    }

    const {onPlay} = this.props
    if (onPlay) {
      onPlay(e)
    }
  }

  handleVideoProgress = e => {
    const buffered = this.video.buffered
    const currentTime = this.video.currentTime
    if (isSafari && buffered.length > 0 && currentTime < buffered.start(0)) {
      this.handleVideoSeeking()
    }
    this.props.onProgress(e)
  }

  // 如果当前时间为 0，safari 浏览器需要把 currentTime 设置成 buffered.start(0) 右边一点点的位置
  // 否则 MSE 无法正常播放，会卡在 loading 状态。
  handleSafariBug = () => {
    const start = this.video.buffered.start(0)
    this.video.currentTime = start + 0.1
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      src,
      onRef,
      currentQuality,
      onSeeking,
      onPlay,
      paused,
      onTimeUpdate,
      onProgress,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars */
    return (
      <video
        ref={el => {
          this.video = el
          onRef(el)
        }}
        {...props}
        onSeeking={this.handleVideoSeeking}
        onTimeUpdate={this.handleTimeUpdate}
        onPlay={this.handlePlay}
        onProgress={this.handleVideoProgress}
      />
    )
  }
}
