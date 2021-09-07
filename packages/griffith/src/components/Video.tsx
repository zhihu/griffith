import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import {EVENTS} from 'griffith-message'
import {logger, ua} from 'griffith-utils'
import {PlaybackRate, Quality, PlaySource} from '../types'
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
  src: string
  format: string
  controls?: boolean
  loop?: boolean
  paused?: boolean
  useMSE?: boolean
  volume?: number
  currentQuality?: Quality
  sources?: PlaySource[]
  onPlay?: (...args: any[]) => any
  onPause?: (...args: any[]) => any
  onEnded?: (...args: any[]) => any
  onLoadedData?: (...args: any[]) => any
  onDurationChange?: (...args: any[]) => any
  onTimeUpdate?: (...args: any[]) => any
  onWaiting: (...args: any[]) => any
  onPlaying: (...args: any[]) => any
  onSeeking?: (...args: any[]) => any
  onSeeked?: (...args: any[]) => any
  onProgress?: (...args: any[]) => any
  onError: (...args: any[]) => any
  onEvent: (...args: any[]) => any
  currentPlaybackRate: PlaybackRate
}

type VideoProps = OwnVideoProps & typeof Video.defaultProps

class Video extends Component<VideoProps> {
  static defaultProps = {
    paused: true,
    volume: 0.5,
  }

  _playTimer: any
  handleClick: any
  playPromise: any

  isMetadataLoaded = false
  pendingAction: {paused: boolean; currentTime: number} | null = null
  loading = false
  isSwitchDefinition = false
  // refs
  root: HTMLVideoElement | null = null

  componentDidMount() {
    this.root!.volume = this.props.volume ** 2
  }

  getSnapshotBeforeUpdate() {
    return {
      paused: this.root!.paused,
      currentTime: this.root!.currentTime,
    }
  }

  componentDidUpdate(prevProps: VideoProps, prevState: any, snapshot: any) {
    const {
      src,
      paused,
      volume,
      format,
      useMSE,
      currentPlaybackRate,
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

    if (
      paused !== prevProps.paused &&
      this.root &&
      paused !== this.root.paused
    ) {
      if (paused) {
        this.pause()
      } else {
        this.play()
      }
    }

    if (this.root && this.root.volume !== volume ** 2 && !isMobile) {
      this.root.volume = volume ** 2
    }

    if (prevProps.currentPlaybackRate.value !== currentPlaybackRate.value) {
      this.setRate(currentPlaybackRate)
    }
  }

  pending(action: any) {
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

    if (
      action.paused !== undefined &&
      this.root &&
      action.paused !== this.root.paused
    ) {
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

    this.safeExecute(() => (this.root!.playbackRate = Number(rate.value)))
  }

  play() {
    if (!isMobile && !this.isMetadataLoaded) {
      this.pending({paused: false})

      if (this.root?.load) {
        this.safeExecute(() => this.root!.load())
      }

      return
    }

    this.playPromise = Promise.resolve(this.root!.play()) // 保证是 promise
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

    this.safeExecute(() => this.root!.pause())
  }

  seek(currentTime: any) {
    if (!Number.isFinite(currentTime)) return

    if (!this.isMetadataLoaded) {
      this.pending({currentTime})
      return
    }

    // see https://stackoverflow.com/a/23353005
    if (this.root?.duration) {
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
      onDurationChange(this.root!.duration)
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
    this.props.onWaiting()
  }

  handlePlaying = () => {
    if (this.loading) {
      this.loading = false
    }
    this.props.onPlaying()
  }

  handleTimeUpdate = (arg: any) => {
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
    const buffered = this.root!.buffered
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
    const {code, message} = error

    logger.debug('Error: %o', {code, message, name: (error as any).name})

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
      format,
      useMSE,
      sources,
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

export default React.forwardRef<any, VideoProps>((props, ref) => (
  <VideoSourceContext.Consumer>
    {({currentSrc, sources, currentQuality, format, currentPlaybackRate}) => (
      <Video
        ref={ref}
        {...props}
        src={currentSrc!}
        format={format}
        sources={sources}
        currentQuality={currentQuality}
        currentPlaybackRate={currentPlaybackRate}
      />
    )}
  </VideoSourceContext.Consumer>
))
