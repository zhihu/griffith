import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'
import {EVENTS} from 'griffith-message'
import {logger, ua} from 'griffith-utils'

import {VideoSourceContext} from '../../contexts/VideoSource'
import VideoWithMessage from './VideoWithMessage'
import selectVideo from './selectVideo'
import styles from './styles'

const {isMobile} = ua

const isAbortError = error =>
  (error && error.name === 'AbortError') ||
  (error instanceof MediaError && error.code === MediaError.MEDIA_ERR_ABORTED)

const isNotAllowedError = error => error && error.name === 'NotAllowedError'

class Video extends Component {
  static propTypes = {
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    paused: PropTypes.bool,
    volume: PropTypes.number,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onLoadedData: PropTypes.func,
    onDurationChange: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onWaiting: PropTypes.func,
    onPlaying: PropTypes.func,
    onSeeking: PropTypes.func,
    onSeeked: PropTypes.func,
    onProgress: PropTypes.func,
    onError: PropTypes.func.isRequired,
    onEvent: PropTypes.func.isRequired,
  }

  static defaultProps = {
    src: null,
    paused: true,
    volume: 0.5,
  }

  isMetadataLoaded = false
  pendingAction = null
  loading = false

  // refs
  root = null

  componentDidMount() {
    this.root.volume = this.props.volume ** 2
  }

  getSnapshotBeforeUpdate() {
    return {
      paused: this.root.paused,
      currentTime: this.root.currentTime,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {src, paused, volume, format, useMSE} = this.props

    /**
     * 切换清晰度，如果是非 mse 视频（src 是 blob 类型）
     * data 变化的时候会 remount，所以 componentDidUpdate 中 src 变化一定是清晰度变了
     */
    if (prevProps.src && src !== prevProps.src) {
      const {willHandleSrcChange} = selectVideo(format, useMSE)

      // TODO 这一块逻辑需要 Video 自己处理
      if (!willHandleSrcChange) {
        this.safeExecute(() => {
          this.isMetadataLoaded = false
          this.seek(snapshot.currentTime)
          if (!snapshot.paused) {
            this.play()
          }
        })
      }
    }

    if (paused !== prevProps.paused && paused !== this.root.paused) {
      if (paused) {
        this.pause()
      } else {
        this.play()
      }
    }

    if (this.root.volume !== volume ** 2 && !isMobile) {
      this.root.volume = volume ** 2
    }
  }

  pending(action) {
    this.pendingAction = {
      ...this.pendingAction,
      ...action,
    }
  }

  applyPendingAction() {
    if (!this.pendingAction) {
      return
    }

    const action = this.pendingAction
    this.pendingAction = null

    if (action.currentTime !== undefined) {
      this.seek(action.currentTime)
    }

    if (action.paused !== undefined && action.paused !== this.root.paused) {
      if (action.paused) {
        this.pause()
      } else {
        this.play()
      }
    }
  }

  /**
   * @see https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
   */
  safeExecute = fn => {
    if (this.playPromise !== undefined) {
      this.playPromise.then(() => {
        fn()
      })
    } else {
      fn()
    }
  }

  play() {
    if (!isMobile && !this.isMetadataLoaded) {
      this.pending({paused: false})

      if (this.root.load) {
        // workaround for some devices that not support preload="metadata"
        this.safeExecute(() => this.root.load())
      }

      return
    }

    this.playPromise = Promise.resolve(this.root.play()) // 保证是 promise
      .catch(error => {
        const {onError} = this.props
        if (onError) {
          onError(error)
        }
      })
  }

  pause() {
    if (!isMobile && !this.isMetadataLoaded) {
      this.pending({paused: true})
      return
    }

    this.safeExecute(() => this.root.pause())
  }

  seek(currentTime) {
    if (!Number.isFinite(currentTime)) return

    if (!this.isMetadataLoaded) {
      this.pending({currentTime})
      return
    }

    // see https://stackoverflow.com/a/23353005
    if (this.root.duration) {
      this.root.currentTime = currentTime
    }
  }

  handleMetadataLoaded = () => {
    this.isMetadataLoaded = true
    this.applyPendingAction()
  }

  handleError = () => {
    const {onError} = this.props
    if (onError) {
      onError(this.root.error)
    }
  }

  handleDurationChange = () => {
    const {onDurationChange} = this.props
    if (onDurationChange) {
      onDurationChange(this.root.duration)
    }
  }

  handleWaiting = () => {
    if (!this.loading) {
      this.loading = true
    }
    this.props.onWaiting()
  }

  handlePlaying = () => {
    if (this.loading) {
      this.loading = false
    }
    this.props.onPlaying()
  }

  handleTimeUpdate = arg => {
    const {onTimeUpdate, paused} = this.props

    this.disposeTimer()
    if (paused || this.loading) {
      return
    }
    const {currentTime} = this.root || {}

    if (onTimeUpdate && currentTime) {
      const isRaf = typeof arg === 'number' // raf 调用 arg 是 时间戳，事件监听调用 arg 是 event
      onTimeUpdate(currentTime, isRaf)
      if (!isMobile) {
        // 移动端使用原生进度条，不需要频繁更新，减少性能压力
        this._playTimer = window.requestAnimationFrame(this.handleTimeUpdate)
      }
    }
  }

  handleProgress = () => {
    const {onProgress} = this.props
    const buffered = this.root.buffered
    const result = []
    for (let i = 0; i < buffered.length; i++) {
      result.push({
        start: buffered.start(i),
        end: buffered.end(i),
      })
    }
    if (onProgress) {
      onProgress(result)
    }
  }

  disposeTimer() {
    window.cancelAnimationFrame(this._playTimer)
  }

  handleError = () => {
    const {error, currentTime} = this.root || {}
    if (!error) {
      return
    }
    const {code, message, name} = error

    logger.debug('Error: %o', {code, message, name})

    const dontReportPlayFailed = isNotAllowedError(error) || isAbortError(error) // 这两种错误不认为是播放失败

    if (!dontReportPlayFailed) {
      this.props.onEvent(EVENTS.PLAYER.PLAY_FAILED, {currentTime})
    }
    this.props.onError(error)
  }

  render() {
    const {
      src,
      controls,
      loop,
      paused,
      volume,
      onPlay,
      onPause,
      onEnded,
      onLoadedData,
      onSeeking,
      onSeeked,
      format,
      useMSE,
      sources,
      currentQuality,
    } = this.props

    const {VideoComponent} = selectVideo(format, useMSE)

    return (
      <VideoWithMessage
        onRef={node => {
          this.root = node
        }}
        className={css(styles.root)}
        preload="metadata"
        playsInline
        webkit-playsinline=""
        x-webkit-airplay="deny"
        muted={!volume}
        controls={controls}
        loop={loop}
        src={src}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onLoadedData={onLoadedData}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onClick={this.handleClick}
        onLoadedMetadata={this.handleMetadataLoaded}
        onError={this.handleError}
        onDurationChange={this.handleDurationChange}
        onTimeUpdate={this.handleTimeUpdate}
        onProgress={this.handleProgress}
        onWaiting={this.handleWaiting}
        onPlaying={this.handlePlaying}
        paused={paused}
        sources={sources}
        currentQuality={currentQuality}
        Video={VideoComponent}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (
  <VideoSourceContext.Consumer>
    {({currentSrc, sources, currentQuality, format}) => (
      <Video
        ref={ref}
        {...props}
        src={currentSrc}
        format={format}
        sources={sources}
        currentQuality={currentQuality}
      />
    )}
  </VideoSourceContext.Consumer>
))
