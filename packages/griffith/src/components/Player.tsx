import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import BigScreen from 'isomorphic-bigscreen'
import {EVENTS, ACTIONS} from 'griffith-message'
import {ua} from 'griffith-utils'
import {ProgressDot, PlaybackRate, PlaySourceMap, RealQuality} from '../types'
import {
  defaultLocale,
  LocaleCode,
  PartialLocaleConfigMap,
} from '../constants/locales'
import VideoSourceProvider from '../contexts/VideoSourceProvider'
import {
  MessageProvider,
  MessageContextValue,
  InternalMessageContext,
  InternalMessageContextValue,
  Subscription,
} from '../contexts/MessageContext'
import VideoSourceContext from '../contexts/VideoSourceContext'
import ObjectFitContext, {ObjectFit} from '../contexts/ObjectFitContext'
import PositionProvider from '../contexts/PositionProvider'
import ObjectFitProvider from '../contexts/ObjectFitProvider'
import LocaleProvider from '../contexts/LocaleProvider'
import TranslatedText from './TranslatedText'
import Icon from './Icon'
import * as icons from './icons/display/index'
import Loader from './Loader'
import Video from './Video'
import Controller, {ToggleType} from './Controller'
import VolumeItem from './items/VolumeItem'
import MinimalTimeline from './MinimalTimeline'
import getBufferedTime from '../utils/getBufferedTime'
import formatDuration from '../utils/formatDuration'
import storage from '../utils/storage'
import Pip from '../utils/pip'

import styles, {hiddenOrShownStyle} from './Player.styles'

const CONTROLLER_HIDE_DELAY = 3000
const {isMobile} = ua

// 临时属性，由 Provider 注入（TODO：替换成 hooks 后可以删除）
type ProviderOnlyProps = {
  // TODO：这个应该改名成 emitEvent
  onEvent: (name: EVENTS, data?: unknown) => void
  subscribeAction: InternalMessageContextValue['subscribeAction']
}

// 被 Provider 包装后的属性
type InnerPlayerProps = ProviderOnlyProps & {
  standalone?: boolean
  error?: {
    message?: string
  }
  title?: string
  cover?: string
  duration?: number
  progressDots?: ProgressDot[]
  onBeforePlay?: (currentSrc: string) => Promise<void>
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  useMSE?: boolean
  useAutoQuality?: boolean
  alwaysShowVolumeButton?: boolean
  disablePictureInPicture?: boolean
  hiddenPlayButton?: boolean
  hiddenTimeline?: boolean
  hiddenTime?: boolean
  hiddenQualityMenu?: boolean
  hiddenVolume?: boolean
  hiddenFullScreenButton?: boolean
  hiddenPlaybackRateItem?: boolean
}

// 仅供 Provider 使用的属性
type OuterPlayerProps = {
  id: string
  sources: PlaySourceMap
  /** It's recommended to use `useMessageContextRef()` for better type annotation */
  dispatchRef?: React.MutableRefObject<
    MessageContextValue['dispatchAction'] | void
  >
  /** It's recommended to use `useMessageContextRef()` for better type annotation */
  onEvent?: (name: EVENTS, data?: unknown) => void
  messageContextRef?: React.MutableRefObject<MessageContextValue | void>
  initialObjectFit?: ObjectFit
  defaultQuality?: RealQuality
  playbackRates?: PlaybackRate[]
  defaultPlaybackRate?: PlaybackRate
  shouldObserveResize?: boolean
  locale?: LocaleCode
  localeConfig?: PartialLocaleConfigMap
}

// export 给外部用的
export type PlayerProps = Omit<InnerPlayerProps, keyof ProviderOnlyProps> &
  OuterPlayerProps

type State = {
  isPlaybackStarted: boolean
  isNeverPlayed: boolean
  lastAction?: 'play' | 'pause' | null
  isDataLoaded: boolean
  isPlaying: boolean
  isLoading: boolean
  duration: number
  currentTime: number
  volume: number
  buffered: {start: number; end: number}[][]
  isControllerShown: boolean
  isControllerHovered: boolean
  isControllerDragging: boolean
  type: ToggleType
  hovered: boolean
  pressed: boolean
  isEnterPageFullScreen: boolean
}

class InnerPlayer extends Component<InnerPlayerProps, State> {
  static contextType = VideoSourceContext
  static defaultProps: Partial<InnerPlayerProps> = {
    standalone: false,
    duration: 0,
    autoplay: false,
    muted: false,
    disablePictureInPicture: false,
    progressDots: [],
  }

  state = {
    isPlaybackStarted: false, // 开始播放的时候设置为 true，播放中途暂停仍然为 true，直到播放到最后停止的时候才会变成 false，
    isNeverPlayed: true, // 用户第一次播放之后设置为 false，并且之后永远为 false
    lastAction: undefined,
    isDataLoaded: false,
    isPlaying: false,
    isLoading: false,
    duration: 0,
    currentTime: 0,
    volume: 0.5,
    buffered: [],
    isControllerShown: false,
    isControllerHovered: false,
    isControllerDragging: false,
    type: null,
    hovered: false,
    pressed: false,
    isEnterPageFullScreen: false,
  }

  isSeeking = false
  showLoaderTimeout: ReturnType<typeof setTimeout> | null = null
  hideControllerTimeout: ReturnType<typeof setTimeout> | null = null

  // refs
  playerRef = React.createRef<HTMLDivElement>()
  videoRef = React.createRef<{
    root: HTMLVideoElement
    seek(currentTime: number): void
  }>()

  static getDerivedStateFromProps = (props: InnerPlayerProps, state: any) => {
    const {duration} = props

    const shouldUpdateDuration = duration && !state.duration
    const newDurationState = shouldUpdateDuration ? {duration} : null

    return {...newDurationState}
  }

  actionSubscriptions_: Subscription[] = []

  componentDidMount() {
    this.setDocumentTitle()
    this.initPip()

    if (this.getShowController(this.state)) {
      this.props.onEvent(EVENTS.SHOW_CONTROLLER)
    }

    const historyVolume = storage.get('@griffith/history-volume')
    if (historyVolume) {
      this.setState({volume: historyVolume as number})
    }

    this.actionSubscriptions_ = [
      this.props.subscribeAction(ACTIONS.PLAY, () => this.handlePlay()),
      this.props.subscribeAction(ACTIONS.PAUSE, this.handlePauseAction),
      this.props.subscribeAction(ACTIONS.TIME_UPDATE, ({currentTime}) =>
        this.handleSeek(currentTime)
      ),
      this.props.subscribeAction(
        ACTIONS.SHOW_CONTROLLER,
        this.handleShowController
      ),
      this.props.subscribeAction(ACTIONS.SET_VOLUME, ({volume}) =>
        this.handleVideoVolumeChange(volume)
      ),
    ]

    if (this.videoRef.current!.root) {
      if (this.props.muted) {
        this.handleVideoVolumeChange(0)
      }
      if (this.props.autoplay) {
        this.handlePlay('video')
      }
    }
  }

  componentDidUpdate(preProps: InnerPlayerProps, preState: State) {
    this.setDocumentTitle()
    this.initPip()

    const preShowController = this.getShowController(preState)
    const showController = this.getShowController(this.state)

    if (preShowController !== showController) {
      if (showController) {
        this.props.onEvent(EVENTS.SHOW_CONTROLLER)
      } else {
        this.props.onEvent(EVENTS.HIDE_CONTROLLER)
      }
    }
  }

  getShowController = ({
    isPlaybackStarted,
    isPlaying,
    isControllerShown,
    isControllerHovered,
    isControllerDragging,
    currentTime,
  }: Partial<State>) => {
    // 播放中：暂停 或 Controller shown/hovered/dragging 时展示 Controller
    if (isPlaybackStarted) {
      return (
        !isPlaying ||
        isControllerShown ||
        isControllerHovered ||
        isControllerDragging
      )
    }
    // 非播放中：播放结束时展示 Controller（未播放时不展示）
    return currentTime !== 0
  }

  setDocumentTitle = () => {
    const {title, standalone} = this.props

    if (standalone && typeof title === 'string' && title !== document.title) {
      document.title = title
    }
  }

  initPip = () => {
    if (
      !this.props.disablePictureInPicture &&
      this.videoRef.current!.root &&
      !Pip.inited
    ) {
      Pip.init(
        this.videoRef.current!.root,
        () => this.props.onEvent(EVENTS.ENTER_PIP),
        () => this.props.onEvent(EVENTS.EXIT_PIP)
      )
    }
  }

  componentWillUnmount() {
    this.actionSubscriptions_.forEach((s) => s.unsubscribe())
  }

  handlePauseAction = ({dontApplyOnFullScreen}: any = {}) => {
    if (!this.state.isPlaying) return

    if (dontApplyOnFullScreen && Boolean(BigScreen.element)) return

    this.handlePause('button') // 通过这种方式暂停不会显示中间的图标
  }

  handleToggle = () => {
    if (this.state.isPlaying) {
      this.handlePause('video')
    } else {
      this.handlePlay('video')
    }
  }

  handlePlay = (type: ToggleType = null) => {
    const {onEvent, onBeforePlay} = this.props
    const {currentSrc} = this.context
    onEvent(EVENTS.REQUEST_PLAY)
    Promise.resolve(onBeforePlay?.(currentSrc))
      .then(() => {
        if (!this.state.isPlaybackStarted) {
          onEvent(EVENTS.PLAY_COUNT)
          this.setState({isPlaybackStarted: true})
          if (!this.state.isDataLoaded) {
            this.setState({isLoading: true})
          }
          // workaround a bug in IE about replaying a video.
          if (this.state.currentTime !== 0) {
            this.handleSeek(0)
          }
        } else {
          this.setState({lastAction: 'play'})
        }
        this.setState({isPlaying: true, type, isNeverPlayed: false})
      })
      .catch(() => {
        onEvent(EVENTS.PLAY_REJECTED)
        // 播放被取消
      })
  }

  handlePause = (type: ToggleType = null) => {
    this.props.onEvent(EVENTS.REQUEST_PAUSE)
    const {isLoading} = this.state

    if (!isLoading) {
      this.setState({
        lastAction: 'pause',
        isPlaying: false,
        type,
      })
    }
  }

  handleVideoPlay = () => {
    if (!this.state.isPlaying) {
      this.setState({isPlaying: true})
    }
  }

  handleVideoPause = () => {
    if (this.state.isPlaying) {
      this.setState({isPlaying: false})
    }
  }

  handleVideoEnded = () => {
    this.setState({
      isPlaybackStarted: false,
      lastAction: null,
      isPlaying: false,
      isLoading: false,
    })
  }

  handleVideoLoadedData = () => {
    this.setState({
      isDataLoaded: true,
      isLoading: false,
    })
  }

  handleVideoError = () => {
    this.setState({
      isPlaying: false,
      isLoading: false,
    })
  }

  handleVideoDurationChange = (duration: any) => {
    this.setState({duration})
  }

  handleVideoTimeUpdate = (currentTime: any) => {
    const {isLoading} = this.state
    if (isLoading || this.isSeeking) return
    if (this.isSeeking) return
    this.setState({currentTime})
  }

  handleVideoVolumeChange = (volume: any) => {
    volume = Math.round(volume * 100) / 100
    this.setState({volume})
    storage.set('@griffith/history-volume', volume)
  }

  handleSeek = (currentTime: number) => {
    const {
      isPlaybackStarted,
      isNeverPlayed,
      currentTime: stateCurrentTime,
    } = this.state
    const isPlayEnded =
      !isPlaybackStarted && !isNeverPlayed && stateCurrentTime !== 0 // 播放结束，显示「重新播放」状态
    this.setState({currentTime})
    // TODO 想办法去掉这个实例方法调用
    this.videoRef.current?.seek(currentTime)
    if (isPlayEnded) {
      this.handlePlay()
    }
  }

  handleVideoWaiting = () => {
    if (this.showLoaderTimeout !== null) return
    this.showLoaderTimeout = setTimeout(() => {
      this.setState({isLoading: true})
    }, 1000)
  }

  handleVideoPlaying = () => {
    if (this.showLoaderTimeout !== null) {
      clearTimeout(this.showLoaderTimeout)
      this.showLoaderTimeout = null
    }
    this.setState({isLoading: false})
  }

  handleVideoSeeking = () => {
    this.isSeeking = true
  }

  handleVideoSeeked = () => {
    this.isSeeking = false
  }

  handleVideoProgress = (buffered: any) => {
    this.setState({buffered})
  }

  handleToggleFullScreen = () => {
    if (BigScreen.enabled) {
      const {onEvent} = this.props
      const onEnter = () => {
        return onEvent(EVENTS.ENTER_FULLSCREEN)
      }
      const onExit = () => {
        return onEvent(EVENTS.EXIT_FULLSCREEN)
      }
      BigScreen.toggle(this.playerRef.current!, onEnter, onExit)
    }
  }

  handleTogglePageFullScreen = () => {
    const {onEvent} = this.props
    if (this.state.isEnterPageFullScreen) {
      this.setState({isEnterPageFullScreen: false})
      onEvent(EVENTS.EXIT_PAGE_FULLSCREEN)
    } else {
      this.setState({isEnterPageFullScreen: true})
      onEvent(EVENTS.ENTER_PAGE_FULLSCREEN)
    }
  }

  handleTogglePip = () => {
    Pip.toggle()
  }

  handleShowController = () => {
    if (!this.state.isControllerShown) {
      this.setState({isControllerShown: true})
    }
    if (this.hideControllerTimeout !== null) {
      clearTimeout(this.hideControllerTimeout)
    }
    this.hideControllerTimeout = setTimeout(() => {
      this.hideControllerTimeout = null
      this.setState({isControllerShown: false})
    }, CONTROLLER_HIDE_DELAY)
  }

  handleHideController = () => {
    if (this.hideControllerTimeout !== null) {
      clearTimeout(this.hideControllerTimeout)
      this.hideControllerTimeout = null
    }
    this.setState({isControllerShown: false})
  }

  handleControllerPointerEnter = () => {
    this.setState({isControllerHovered: true})
  }

  handleControllerPointerLeave = () => {
    this.setState({isControllerHovered: false})
  }

  handleControllerDragStart = () => {
    this.setState({isControllerDragging: true})
  }

  handleControllerDragEnd = () => {
    this.setState({isControllerDragging: false})
  }

  handleMouseEnter = () => {
    this.setState({hovered: true})
    this.handleShowController()
  }

  handleMouseLeave = () => {
    this.setState({hovered: false})
    this.handleHideController()
  }

  handleMouseDown = () => {
    this.setState({pressed: true})
    this.handleShowController()
  }

  handleMouseUp = () => {
    this.setState({pressed: false})
    this.handleShowController()
  }

  handleMouseMove = () => {
    if (!this.state.hovered) {
      this.setState({hovered: true})
    }
    this.handleShowController()
  }

  handleProgressDotHover = (info: any) => {
    this.props.onEvent(EVENTS.HOVER_PROGRESS_DOT, info)
  }

  handleProgressDotLeave = () => {
    this.props.onEvent(EVENTS.LEAVE_PROGRESS_DOT)
  }

  render() {
    const {
      error,
      title,
      cover,
      standalone,
      loop,
      onEvent,
      useMSE,
      useAutoQuality,
      alwaysShowVolumeButton,
      disablePictureInPicture,
      progressDots,
      hiddenPlayButton,
      hiddenTimeline,
      hiddenTime,
      hiddenQualityMenu,
      hiddenVolume,
      hiddenFullScreenButton,
      children,
      hiddenPlaybackRateItem,
    } = this.props

    const {
      isPlaybackStarted,
      lastAction,
      isPlaying,
      isLoading,
      duration,
      currentTime,
      isNeverPlayed,
      volume,
      buffered,
      type,
      hovered,
      pressed,
      isEnterPageFullScreen,
    } = this.state

    const isPip = Boolean(Pip.pictureInPictureElement)
    // Safari 会将 pip 状态视为全屏
    const isFullScreen = Boolean(BigScreen.element) && !isPip
    const showController = this.getShowController(this.state)
    const bufferedTime = getBufferedTime(currentTime, buffered)
    const videoDataLoaded = !isLoading || currentTime !== 0
    const renderController = videoDataLoaded && isPlaybackStarted

    return (
      <div
        className={css(
          styles.root,
          isFullScreen && styles.fullScreened,
          isEnterPageFullScreen && styles.pageFullScreen
        )}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleShowController}
        ref={this.playerRef}
      >
        <div className={css(styles.video)}>
          <Video
            ref={this.videoRef}
            controls={isMobile && isPlaybackStarted}
            paused={!isPlaying}
            volume={volume}
            loop={loop}
            onPlay={this.handleVideoPlay}
            onPause={this.handleVideoPause}
            onEnded={this.handleVideoEnded}
            onLoadedData={this.handleVideoLoadedData}
            onError={this.handleVideoError}
            onDurationChange={this.handleVideoDurationChange}
            onTimeUpdate={this.handleVideoTimeUpdate}
            onWaiting={this.handleVideoWaiting}
            onPlaying={this.handleVideoPlaying}
            onSeeking={this.handleVideoSeeking}
            onSeeked={this.handleVideoSeeked}
            onProgress={this.handleVideoProgress}
            onEvent={onEvent}
            useMSE={useMSE}
            useAutoQuality={useAutoQuality}
          />
        </div>
        <div
          className={css(styles.cover, !isPlaybackStarted && styles.coverShown)}
          onClick={() => this.handlePlay()}
        >
          {cover && (
            <ObjectFitContext.Consumer>
              {({objectFit}) => (
                <img
                  className={css(styles.coverImage)}
                  src={cover}
                  style={{objectFit}}
                />
              )}
            </ObjectFitContext.Consumer>
          )}
          {duration && currentTime === 0 && (
            <div
              className={css(
                styles.coverTime,
                isMobile && styles.coverTimeMobile
              )}
            >
              {formatDuration(duration)}
            </div>
          )}
          {/* 只有在第一次未播放时展示播放按钮，播放结束全部展示重播按钮 */}
          {isNeverPlayed && (
            <div className={css(styles.coverAction)}>
              <div className={css(styles.actionButton)}>
                <Icon icon={icons.play} styles={styles.actionIcon} />
              </div>
            </div>
          )}
          {/* 重播按钮 */}
          {!isNeverPlayed && currentTime !== 0 && (
            <div className={css(styles.coverReplayAction)}>
              <div
                className={css(
                  styles.coverReplayButton,
                  hovered && styles.coverReplayButtonHovered,
                  pressed && styles.coverReplayButtonPressed
                )}
              >
                <Icon icon={icons.replay} styles={styles.replayIcon} />
                <TranslatedText name="replay" />
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <div
            className={css(styles.overlay, isNeverPlayed && styles.overlayMask)}
          >
            {isPlaybackStarted && isLoading && (
              <div className={css(styles.loader)}>
                <Loader />
              </div>
            )}
            {/*直接点击底部播放/暂停按钮时不展示动画*/}
            {lastAction && type !== 'button' && (
              <div className={css(styles.action)} key={lastAction}>
                <div
                  className={css(
                    styles.actionButton,
                    styles.actionButtonAnimated
                  )}
                >
                  <Icon
                    icon={lastAction === 'play' ? icons.play : icons.pause}
                    styles={styles.actionIcon}
                  />
                </div>
              </div>
            )}
            <div
              className={css(styles.backdrop)}
              onTouchStart={(event) => {
                // prevent touch to toggle
                event.preventDefault()
              }}
              onClick={this.handleToggle}
            />
            {title && isFullScreen && (
              <div
                className={css(
                  styles.title,
                  showController && styles.titleShown
                )}
              >
                {title}
              </div>
            )}
            {/*首帧已加载完成时展示 MinimalTimeline 组件*/}
            {!hiddenTimeline && isPlaying && videoDataLoaded && (
              <div
                className={css(
                  hiddenOrShownStyle.base,
                  showController
                    ? hiddenOrShownStyle.hidden
                    : hiddenOrShownStyle.shown
                )}
              >
                <MinimalTimeline
                  progressDots={progressDots}
                  buffered={bufferedTime}
                  duration={duration}
                  currentTime={currentTime}
                  show={!showController}
                />
              </div>
            )}
            {/* 右下角外显常驻音量按钮控件，与 Controller 互斥展示 */}
            {alwaysShowVolumeButton && renderController && (
              <div
                className={css(
                  styles.volumeButton,
                  hiddenOrShownStyle.base,
                  showController
                    ? hiddenOrShownStyle.hidden
                    : hiddenOrShownStyle.shown
                )}
              >
                <VolumeItem volume={volume} />
              </div>
            )}
            {/*首帧已加载完成时展示 Controller 组件*/}
            {renderController && (
              <div
                className={css(
                  styles.controller,
                  hiddenOrShownStyle.base,
                  showController
                    ? hiddenOrShownStyle.shown
                    : hiddenOrShownStyle.hidden
                )}
                onMouseEnter={this.handleControllerPointerEnter}
                onMouseLeave={this.handleControllerPointerLeave}
              >
                <Controller
                  standalone={standalone}
                  isPlaying={isPlaying}
                  duration={duration}
                  currentTime={currentTime}
                  volume={volume}
                  progressDots={progressDots}
                  buffered={bufferedTime}
                  isFullScreen={isFullScreen}
                  isPageFullScreen={isEnterPageFullScreen}
                  isPip={isPip}
                  onDragStart={this.handleControllerDragStart}
                  onDragEnd={this.handleControllerDragEnd}
                  onPlay={this.handlePlay}
                  onPause={this.handlePause}
                  onSeek={this.handleSeek}
                  onVolumeChange={this.handleVideoVolumeChange}
                  onToggleFullScreen={this.handleToggleFullScreen}
                  onTogglePageFullScreen={this.handleTogglePageFullScreen}
                  onTogglePip={this.handleTogglePip}
                  onProgressDotHover={this.handleProgressDotHover}
                  onProgressDotLeave={this.handleProgressDotLeave}
                  show={showController}
                  showPip={Pip.supported && !disablePictureInPicture}
                  hiddenPlayButton={hiddenPlayButton}
                  hiddenTimeline={hiddenTimeline}
                  hiddenTime={hiddenTime}
                  hiddenQualityMenu={hiddenQualityMenu}
                  hiddenVolumeItem={hiddenVolume}
                  hiddenPlaybackRateItem={hiddenPlaybackRateItem}
                  hiddenFullScreenButton={hiddenFullScreenButton}
                />
              </div>
            )}
          </div>
        )}
        {error && (
          <div className={css(styles.error)}>
            <Icon icon={icons.alert} styles={styles.errorIcon} />
            {error.message && (
              <div className={css(styles.errorMessage)}>{error.message}</div>
            )}
          </div>
        )}
        {children}
      </div>
    )
  }
}

const DEFAULT_PLAYBACK_RATE: PlaybackRate = {value: 1.0, text: '1.0x'}
const DEFAULT_PLAYBACK_RATES: PlaybackRate[] = [
  {value: 0.5, text: '0.5x'},
  {value: 0.75, text: '0.75x'},
  {value: 1.0, text: '1.0x'},
  {value: 1.25, text: '1.25x'},
  {value: 1.5, text: '1.5x'},
  {value: 2.0, text: '2.0x'},
]

const Player: React.FC<PlayerProps> = ({
  standalone,
  id,
  sources,
  onEvent,
  dispatchRef,
  messageContextRef,
  shouldObserveResize,
  initialObjectFit,
  locale = defaultLocale,
  localeConfig,
  defaultQuality,
  defaultPlaybackRate = DEFAULT_PLAYBACK_RATE,
  playbackRates = DEFAULT_PLAYBACK_RATES,
  useAutoQuality = false,
  ...restProps
}) => {
  return (
    <ObjectFitProvider initialObjectFit={initialObjectFit}>
      <PositionProvider shouldObserveResize={shouldObserveResize}>
        <MessageProvider
          id={id}
          enableCrossWindow={standalone}
          onEvent={onEvent}
          dispatchRef={dispatchRef}
          messageContextRef={messageContextRef}
        >
          <InternalMessageContext.Consumer>
            {({emitEvent, subscribeAction}) => (
              <VideoSourceProvider
                // TODO：改名 emitEvent
                onEvent={emitEvent as any}
                sources={sources}
                id={id}
                defaultQuality={defaultQuality}
                useAutoQuality={useAutoQuality}
                defaultPlaybackRate={defaultPlaybackRate}
                playbackRates={playbackRates}
              >
                <LocaleProvider locale={locale} localeConfig={localeConfig}>
                  <InnerPlayer
                    {...restProps}
                    useAutoQuality={useAutoQuality}
                    standalone={standalone}
                    onEvent={emitEvent as PlayerProps['onEvent']}
                    subscribeAction={subscribeAction}
                  />
                </LocaleProvider>
              </VideoSourceProvider>
            )}
          </InternalMessageContext.Consumer>
        </MessageProvider>
      </PositionProvider>
    </ObjectFitProvider>
  )
}

export default Player
