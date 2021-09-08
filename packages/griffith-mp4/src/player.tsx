import React, {Component} from 'react'
import {ua} from 'griffith-utils'
import MSE from './mse'

const {isSafari} = ua

export default class Player extends Component {
  mse: any
  video: any
  useMSE = true

  componentDidMount() {
    this.mse = new MSE(this.video, (this.props as any).src)
    this.mse.init().then(() => {
      // don't use MSE If the video don't have a video track
      if (!this.mse.mp4Probe.mp4Data.videoDuration) {
        this.useMSE = false
        this.video.src = (this.props as any).src
      }
    })
  }

  componentDidUpdate(prevProps: any) {
    if ((this.props as any).src !== prevProps.src && this.useMSE) {
      this.mse.changeQuality((this.props as any).src)
    }
  }

  componentWillUnmount() {
    if (this.useMSE) {
      this.mse.destroy()
    }
  }

  handleTimeUpdate = (e: any) => {
    if (this.useMSE) {
      this.mse.handleTimeUpdate()
    }
    (this.props as any).onTimeUpdate(e)
  }

  handleVideoSeeking = (e: any) => {
    const currentTime = this.video.currentTime
    const buffered = this.video.buffered

    if (isSafari && buffered && buffered.length > 0) {
      if (currentTime - 0.1 > buffered.start(0)) {
        if (this.useMSE) {
          this.mse.seek(this.video.currentTime)
        }
      } else if (currentTime < buffered.start(0)) {
        this.handleSafariBug()
        return
      }
    } else {
      if (this.useMSE) {
        this.mse.seek(this.video.currentTime)
      }
    }
    (this.props as any).onSeeking(e)
  }

  handlePlay = (e: any) => {
    const {currentTime} = this.video
    if (currentTime === 0 && this.useMSE) {
      this.mse.seek(0)
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onPlay' does not exist on type 'Readonly... Remove this comment to see the full error message
    const {onPlay} = this.props
    if (onPlay) {
      onPlay(e)
    }
  }

  handleVideoProgress = (e: any) => {
    const buffered = this.video.buffered
    const currentTime = this.video.currentTime
    if (
      isSafari &&
      buffered &&
      buffered.length > 0 &&
      currentTime < buffered.start(0)
    ) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      this.handleVideoSeeking()
    }
    (this.props as any).onProgress(e)
  }

  // 如果当前时间为 0，safari 浏览器需要把 currentTime 设置成 buffered.start(0) 右边一点点的位置
  // 否则 MSE 无法正常播放，会卡在 loading 状态。
  handleSafariBug = () => {
    let start = 0

    if (this.video.buffered.length > 0) {
      start = this.video.buffered.start(0)
    }
    this.video.currentTime = start + 0.1
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
      src,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onRef' does not exist on type 'Readonly<... Remove this comment to see the full error message
      onRef,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentQuality' does not exist on type '... Remove this comment to see the full error message
      currentQuality,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useAutoQuality' does not exist on type '... Remove this comment to see the full error message
      useAutoQuality,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSeeking' does not exist on type 'Reado... Remove this comment to see the full error message
      onSeeking,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onPlay' does not exist on type 'Readonly... Remove this comment to see the full error message
      onPlay,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'paused' does not exist on type 'Readonly... Remove this comment to see the full error message
      paused,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onTimeUpdate' does not exist on type 'Re... Remove this comment to see the full error message
      onTimeUpdate,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onProgress' does not exist on type 'Read... Remove this comment to see the full error message
      onProgress,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props
    return (
      <video
        ref={(el) => {
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
