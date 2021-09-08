import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'isom... Remove this comment to see the full error message
import BigScreen from 'isomorphic-bigscreen'
import {EVENTS, ACTIONS} from 'griffith-message'
import {ua} from 'griffith-utils'

import Time from './Time'
import Icon from './Icon'
import * as icons from './icons/display'
import Loader from './Loader'
import Video from './Video'
import Controller from './Controller'
import VolumeItem from './items/VolumeItem'
import MinimalTimeline from './MinimalTimeline'
import getBufferedTime from '../utils/getBufferedTime'
import storage from '../utils/storage'
import Pip from '../utils/pip'
import ObjectFitContext from '../contexts/ObjectFitContext'

import styles, {hiddenOrShownStyle} from './Player.styles'

const CONTROLLER_HIDE_DELAY = 3000
const {isMobile} = ua

type OwnProps = {
  standalone?: boolean
  error?: {
    message?: string
  }
  title?: string
  cover?: string
  duration?: number
  progressDots?: {
    startTime: number
  }[]
  onEvent: (...args: any[]) => any
  onBeforePlay: (...args: any[]) => any
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  disablePictureInPicture?: boolean
  hiddenPlayButton?: boolean
  hiddenTimeline?: boolean
  hiddenTime?: boolean
  hiddenQualityMenu?: boolean
  hiddenVolume?: boolean
  hiddenFullScreenButton?: boolean
  hiddenPlaybackRateItem?: boolean
}

type State = any

type Props = OwnProps & typeof Player.defaultProps

class Player extends Component<Props, State> {
  static defaultProps = {
    standalone: false,
    duration: 0,
    autoplay: false,
    muted: false,
    disablePictureInPicture: false,
  }

  state = {
    isPlaybackStarted: false, // 开始播放的时候设置为 true，播放中途暂停仍然为 true，直到播放到最后停止的时候才会变成 false，
    isNeverPlayed: true, // 用户第一次播放之后设置为 false，并且之后永远为 false
    lastAction: null,
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
  showLoaderTimeout = null
  hideControllerTimeout = null

  // refs
  playerRef = React.createRef()
  videoRef = React.createRef()

  static getDerivedStateFromProps = (props: any, state: any) => {
    const {duration} = props

    const shouldUpdateDuration = duration && !state.duration
    const newDurationState = shouldUpdateDuration ? {duration} : null

    return {...newDurationState}
  }

  actionSubscriptions_: any

  componentDidMount() {
    this.setDocumentTitle()
    this.initPip()

    if (this.getShowController(this.state)) {
      this.props.onEvent(EVENTS.PLAYER.SHOW_CONTROLLER)
    }

    const historyVolume = storage.get('@griffith/history-volume')
    if (historyVolume) {
      this.setState({volume: historyVolume})
    }

    this.actionSubscriptions_ = [
      (this.props as any).subscribeAction(ACTIONS.PLAYER.PLAY, this.handlePlay),
      (this.props as any).subscribeAction(
        ACTIONS.PLAYER.PAUSE,
        this.handlePauseAction
      ),
      (this.props as any).subscribeAction(
        ACTIONS.PLAYER.TIME_UPDATE,
        ({currentTime}: any) => this.handleSeek(currentTime)
      ),
      (this.props as any).subscribeAction(
        ACTIONS.PLAYER.SHOW_CONTROLLER,
        this.handleShowController
      ),
      (this.props as any).subscribeAction(
        ACTIONS.PLAYER.SET_VOLUME,
        ({volume}: any) => this.handleVideoVolumeChange(volume)
      ),
    ]

    if ((this as any).videoRef.current.root) {
      if (this.props.muted) {
        this.handleVideoVolumeChange(0)
      }
      if (this.props.autoplay) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"video"' is not assignable to pa... Remove this comment to see the full error message
        this.handlePlay('video')
      }
    }
  }

  componentDidUpdate(preProps: Props, preState: State) {
    this.setDocumentTitle()
    this.initPip()

    const preShowController = this.getShowController(preState)
    const showController = this.getShowController(this.state)

    if (preShowController !== showController) {
      if (showController) {
        this.props.onEvent(EVENTS.PLAYER.SHOW_CONTROLLER)
      } else {
        this.props.onEvent(EVENTS.PLAYER.HIDE_CONTROLLER)
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
  }: any) => {
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
      (this as any).videoRef.current.root &&
      !Pip.inited
    ) {
      Pip.init(
        (this as any).videoRef.current.root,
        () => this.props.onEvent(EVENTS.PLAYER.ENTER_PIP),
        () => this.props.onEvent(EVENTS.PLAYER.EXIT_PIP)
      )
    }
  }

  componentWillUnmount() {
    this.actionSubscriptions_.forEach((s: any) => s.unsubscribe())
  }

  handlePauseAction = ({dontApplyOnFullScreen}: any = {}) => {
    if (!this.state.isPlaying) return

    if (dontApplyOnFullScreen && Boolean(BigScreen.element)) return

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"button"' is not assignable to p... Remove this comment to see the full error message
    this.handlePause('button') // 通过这种方式暂停不会显示中间的图标
  }

  handleToggle = () => {
    if (this.state.isPlaying) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"video"' is not assignable to pa... Remove this comment to see the full error message
      this.handlePause('video')
    } else {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"video"' is not assignable to pa... Remove this comment to see the full error message
      this.handlePlay('video')
    }
  }

  handlePlay = (type = null) => {
    const {onEvent, onBeforePlay} = this.props
    onEvent(EVENTS.PLAYER.REQUEST_PLAY)
    onBeforePlay()
      .then(() => {
        if (!this.state.isPlaybackStarted) {
          onEvent(EVENTS.PLAYER.PLAY_COUNT)
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
        onEvent(EVENTS.PLAYER.PLAY_REJECTED)
        // 播放被取消
      })
  }

  handlePause = (type = null) => {
    this.props.onEvent(EVENTS.PLAYER.REQUEST_PAUSE)
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

  handleSeek = (currentTime: any) => {
    const {
      isPlaybackStarted,
      isNeverPlayed,
      currentTime: stateCurrentTime,
    } = this.state
    const isPlayEnded =
      !isPlaybackStarted && !isNeverPlayed && stateCurrentTime !== 0 // 播放结束，显示「重新播放」状态
    this.setState({currentTime})
    // TODO 想办法去掉这个实例方法调用
    ;(this as any).videoRef.current.seek(currentTime)
    if (isPlayEnded) {
      this.handlePlay()
    }
  }

  handleVideoWaiting = () => {
    if (this.showLoaderTimeout !== null) return
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timeout' is not assignable to type 'null'.
    this.showLoaderTimeout = setTimeout(() => {
      this.setState({isLoading: true})
    }, 1000)
  }

  handleVideoPlaying = () => {
    if (this.showLoaderTimeout !== null) {
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
        return onEvent(EVENTS.PLAYER.ENTER_FULLSCREEN)
      }
      const onExit = () => {
        return onEvent(EVENTS.PLAYER.EXIT_FULLSCREEN)
      }
      BigScreen.toggle(this.playerRef.current, onEnter, onExit)
    }
  }

  handleTogglePageFullScreen = () => {
    const {onEvent} = this.props
    if (this.state.isEnterPageFullScreen) {
      this.setState({isEnterPageFullScreen: false})
      onEvent(EVENTS.PLAYER.EXIT_PAGE_FULLSCREEN)
    } else {
      this.setState({isEnterPageFullScreen: true})
      onEvent(EVENTS.PLAYER.ENTER_PAGE_FULLSCREEN)
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
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      clearTimeout(this.hideControllerTimeout)
    }
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timeout' is not assignable to type 'null'.
    this.hideControllerTimeout = setTimeout(() => {
      this.hideControllerTimeout = null
      this.setState({isControllerShown: false})
    }, CONTROLLER_HIDE_DELAY)
  }

  handleHideController = () => {
    if (this.hideControllerTimeout !== null) {
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
    this.props.onEvent(EVENTS.PLAYER.HOVER_PROGRESS_DOT, info)
  }

  handleProgressDotLeave = () => {
    this.props.onEvent(EVENTS.PLAYER.LEAVE_PROGRESS_DOT)
  }

  render() {
    const {
      error,
      title,
      cover,
      standalone,
      loop,
      onEvent,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useMSE' does not exist on type 'Readonly... Remove this comment to see the full error message
      useMSE,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useAutoQuality' does not exist on type '... Remove this comment to see the full error message
      useAutoQuality,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'alwaysShowVolumeButton' does not exist o... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
        ref={this.playerRef}
      >
        <div className={css(styles.video)}>
          <Video
            ref={this.videoRef}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ ref: RefObject<unknown>; controls: boolean... Remove this comment to see the full error message
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
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'objectFit' does not exist on type '{}'. */}
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
              <Time value={duration} />
            </div>
          )}
          {/* 只有在第一次未播放时展示播放按钮，播放结束全部展示重播按钮 */}
          {isNeverPlayed && (
            <div className={css(styles.coverAction)}>
              <div className={css(styles.actionButton)}>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ icon: Element; styles: object; }' is not a... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ icon: Element; styles: object; }' is not a... Remove this comment to see the full error message */}
                <Icon icon={icons.replay} styles={styles.replayIcon} />
                重新播放
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
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'Key | undef... Remove this comment to see the full error message
              <div className={css(styles.action)} key={lastAction}>
                <div
                  className={css(
                    styles.actionButton,
                    styles.actionButtonAnimated
                  )}
                >
                  <Icon
                    icon={lastAction === 'play' ? icons.play : icons.pause}
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ icon: Element; styles: object; }' is not a... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(2786) FIXME: 'MinimalTimeline' cannot be used as a JSX componen... Remove this comment to see the full error message */}
                <MinimalTimeline
                  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
                {/* @ts-expect-error ts-migrate(2786) FIXME: 'Controller' cannot be used as a JSX component. */}
                <Controller
                  standalone={standalone}
                  isPlaying={isPlaying}
                  duration={duration}
                  currentTime={currentTime}
                  volume={volume}
                  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ icon: Element; styles: object; }' is not a... Remove this comment to see the full error message */}
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

export default Player
