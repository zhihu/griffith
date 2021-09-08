import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import {EVENTS} from 'griffith-message'
import {logger, ua} from 'griffith-utils'

import VideoSourceContext from '../contexts/VideoSourceContext'
import VideoWithMessage from './VideoWithMessage'
import selectVideo from './selectVideo'
import styles from './Video.styles'

const {isMobile} = ua

const isAbortError = (error: any) =>
  (error && error.name === 'AbortError') ||
  (error instanceof MediaError && error.code === MediaError.MEDIA_ERR_ABORTED)

const isNotAllowedError = (error: any) =>
  error && error.name === 'NotAllowedError'

type OwnVideoProps = {
  controls?: boolean
  loop?: boolean
  paused?: boolean
  volume?: number
  onPlay?: (...args: any[]) => any
  onPause?: (...args: any[]) => any
  onEnded?: (...args: any[]) => any
  onLoadedData?: (...args: any[]) => any
  onDurationChange?: (...args: any[]) => any
  onTimeUpdate?: (...args: any[]) => any
  onWaiting?: (...args: any[]) => any
  onPlaying?: (...args: any[]) => any
  onSeeking?: (...args: any[]) => any
  onSeeked?: (...args: any[]) => any
  onProgress?: (...args: any[]) => any
  onError: (...args: any[]) => any
  onEvent: (...args: any[]) => any
  currentPlaybackRate?: {
    text?: string
    value?: number
  }
}

type VideoProps = OwnVideoProps & typeof Video.defaultProps

class Video extends Component<VideoProps> {
  static defaultProps = {
    src: null,
    paused: true,
    volume: 0.5,
  }

  _playTimer: any
  handleClick: any
  playPromise: any

  isMetadataLoaded = false
  pendingAction = null
  loading = false
  isSwitchDefinition = false
  // refs
  root = null

  componentDidMount() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this.root.volume = this.props.volume ** 2
  }

  getSnapshotBeforeUpdate() {
    return {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      paused: this.root.paused,
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      currentTime: this.root.currentTime,
    }
  }

  componentDidUpdate(prevProps: VideoProps, prevState: any, snapshot: any) {
    const {
      src,
      paused,
      volume,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'format' does not exist on type 'Readonly... Remove this comment to see the full error message
      format,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useMSE' does not exist on type 'Readonly... Remove this comment to see the full error message
      useMSE,
      currentPlaybackRate,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentQuality' does not exist on type '... Remove this comment to see the full error message
      currentQuality,
      onEvent,
    } = this.props

    /**
     * 切换清晰度，如果是非 mse 视频（src 是 blob 类型）
     * data 变化的时候会 remount，所以 componentDidUpdate 中 src 变化一定是清晰度变了
     */
    if (prevProps.src && src !== prevProps.src) {
      this.isSwitchDefinition = true
      onEvent(EVENTS.PLAYER.CHANGE_QUALITY_START, currentQuality)
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

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (paused !== prevProps.paused && paused !== this.root.paused) {
      if (paused) {
        this.pause()
      } else {
        this.play()
      }
    }

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (this.root.volume !== volume ** 2 && !isMobile) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.root.volume = volume ** 2
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (prevProps.currentPlaybackRate.value !== currentPlaybackRate.value) {
      this.setRate(currentPlaybackRate)
    }
  }

  pending(action: any) {
    this.pendingAction = {
      // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (action.currentTime !== undefined) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.seek(action.currentTime)
    }

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (action.paused !== undefined && action.paused !== this.root.paused) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
  safeExecute = (fn: any) => {
    if (this.playPromise !== undefined) {
      this.playPromise.then(() => {
        fn()
      })
    } else {
      fn()
    }
  }

  setRate(rate: any) {
    if (!isMobile && !this.isMetadataLoaded) {
      this.pending({paused: true})
      return
    }

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this.safeExecute(() => (this.root.playbackRate = Number(rate.value)))
  }

  play() {
    if (!isMobile && !this.isMetadataLoaded) {
      this.pending({paused: false})

      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (this.root.load) {
        // workaround for some devices that not support preload="metadata"
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this.safeExecute(() => this.root.load())
      }

      return
    }

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this.playPromise = Promise.resolve(this.root.play()) // 保证是 promise
      .catch((error) => {
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

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this.safeExecute(() => this.root.pause())
  }

  seek(currentTime: any) {
    if (!Number.isFinite(currentTime)) return

    if (!this.isMetadataLoaded) {
      this.pending({currentTime})
      return
    }

    // see https://stackoverflow.com/a/23353005
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (this.root.duration) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.root.currentTime = currentTime
    }
  }

  handleMetadataLoaded = () => {
    this.isMetadataLoaded = true
    this.applyPendingAction()
    if (this.isSwitchDefinition) {
      this.isSwitchDefinition = false
      this.props.onEvent(
        EVENTS.PLAYER.CHANGE_QUALITY_SUCCESS,
        (this.props as any).currentQuality
      )
    }
  }

  handleDurationChange = () => {
    const {onDurationChange} = this.props
    if (onDurationChange) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      onDurationChange(this.root.duration)
    }
  }

  handleLoadedData = () => {
    const {onLoadedData} = this.props
    onLoadedData && onLoadedData()
  }

  handleWaiting = () => {
    if (!this.loading) {
      this.loading = true
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onWaiting()
  }

  handlePlaying = () => {
    if (this.loading) {
      this.loading = false
    }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onPlaying()
  }

  handleTimeUpdate = (arg: any) => {
    const {onTimeUpdate, paused} = this.props

    this.disposeTimer()
    if (paused || this.loading) {
      return
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTime' does not exist on type '{}'... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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

  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'handleError'.
  handleError = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type '{}'.
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

    if (this.isSwitchDefinition) {
      this.isSwitchDefinition = false
      this.props.onEvent(
        EVENTS.PLAYER.CHANGE_QUALITY_FAIL,
        this.props.currentQuality
      )
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'format' does not exist on type 'Readonly... Remove this comment to see the full error message
      format,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useMSE' does not exist on type 'Readonly... Remove this comment to see the full error message
      useMSE,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sources' does not exist on type 'Readonl... Remove this comment to see the full error message
      sources,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentQuality' does not exist on type '... Remove this comment to see the full error message
      currentQuality,
    } = this.props

    const {VideoComponent} = selectVideo(format, useMSE)

    return (
      <VideoWithMessage
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onRef: (node: any) => void; className: str... Remove this comment to see the full error message
        onRef={(node: any) => {
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
    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'currentSrc' does not exist on type '{}'. */}
    {({currentSrc, sources, currentQuality, format, currentPlaybackRate}) => (
      <Video
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        ref={ref}
        {...props}
        src={currentSrc}
        format={format}
        sources={sources}
        currentQuality={currentQuality}
        currentPlaybackRate={currentPlaybackRate}
      />
    )}
  </VideoSourceContext.Consumer>
))
