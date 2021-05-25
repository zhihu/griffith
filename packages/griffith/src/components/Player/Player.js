import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'
import BigScreen from 'isomorphic-bigscreen'
import {EVENTS, ACTIONS} from 'griffith-message'
import {ua} from 'griffith-utils'

import Time from '../Time'
import Icon from '../Icon'
import * as icons from '../Icon/icons/display'
import Loader from '../Loader'
import Video from '../Video'
import Controller from '../Controller'
import {MinimalTimeline} from '../Timeline'
import getBufferedTime from '../../utils/getBufferedTime'
import storage from '../../utils/storage'
import Pip from '../../utils/pip'
import {ObjectFitContext} from '../../contexts/ObjectFit'

import styles, {hiddenOrShownStyle} from './styles'

const CONTROLLER_HIDE_DELAY = 3000
const {isMobile} = ua

class Player extends Component {
  static propTypes = {
    standalone: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    title: PropTypes.string,
    cover: PropTypes.string,
    duration: PropTypes.number,
    progressDots: PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
      })
    ),
    onEvent: PropTypes.func.isRequired,
    onBeforePlay: PropTypes.func.isRequired,
    onFullScreenChange: PropTypes.func.isRequired,
    autoplay: PropTypes.bool,
    muted: PropTypes.bool,
    disablePictureInPicture: PropTypes.bool,
    hiddenPlayButton: PropTypes.bool,
    hiddenTimeline: PropTypes.bool,
    hiddenTime: PropTypes.bool,
    hiddenQualityMenu: PropTypes.bool,
    hiddenVolume: PropTypes.bool,
    hiddenFullScreenButton: PropTypes.bool,
  }

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
  }

  isSeeking = false
  showLoaderTimeout = null
  hideControllerTimeout = null

  // refs
  playerRef = React.createRef()
  videoRef = React.createRef()

  static getDerivedStateFromProps = (props, state) => {
    const {duration} = props

    const shouldUpdateDuration = duration && !state.duration
    const newDurationState = shouldUpdateDuration ? {duration} : null

    return {...newDurationState}
  }

  componentDidMount() {
    this.setDocumentTitle()
    this.initPip()

    const historyVolume = storage.get('@griffith/history-volume')
    if (historyVolume) {
      this.setState({volume: historyVolume})
    }

    this.pauseActionSubscription = this.props.subscribeAction(
      ACTIONS.PLAYER.PAUSE,
      this.handlePauseAction
    )

    this.timeUpdateActionSubscription = this.props.subscribeAction(
      ACTIONS.PLAYER.TIME_UPDATE,
      ({currentTime}) => this.handleSeek(currentTime)
    )

    if (this.videoRef.current.root) {
      if (this.props.muted) {
        this.handleVideoVolumeChange(0)
      }
      if (this.props.autoplay) {
        this.handlePlay('video')
      }
    }
  }

  componentDidUpdate() {
    this.setDocumentTitle()
    this.initPip()
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
      this.videoRef.current.root &&
      !Pip.inited
    ) {
      Pip.init(
        this.videoRef.current.root,
        () => this.props.onEvent(EVENTS.PLAYER.ENTER_PIP),
        () => this.props.onEvent(EVENTS.PLAYER.EXIT_PIP)
      )
    }
  }

  componentWillUnmount() {
    this.pauseActionSubscription.unsubscribe()
  }

  handlePauseAction = ({dontApplyOnFullScreen} = {}) => {
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

  handleVideoDurationChange = duration => {
    this.setState({duration})
  }

  handleVideoTimeUpdate = currentTime => {
    const {isLoading} = this.state
    if (isLoading || this.isSeeking) return
    if (this.isSeeking) return
    this.setState({currentTime})
  }

  handleVideoVolumeChange = volume => {
    volume = Math.round(volume * 100) / 100
    this.setState({volume})
    storage.set('@griffith/history-volume', volume)
  }

  handleSeek = currentTime => {
    const {
      isPlaybackStarted,
      isNeverPlayed,
      currentTime: stateCurrentTime,
    } = this.state
    const isPlayEnded =
      !isPlaybackStarted && !isNeverPlayed && stateCurrentTime !== 0 // 播放结束，显示「重新播放」状态
    this.setState({currentTime})
    // TODO 想办法去掉这个实例方法调用
    this.videoRef.current.seek(currentTime)
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

  handleVideoProgress = buffered => {
    this.setState({buffered})
  }

  handleToggleFullScreen = () => {
    if (BigScreen.enabled) {
      const {onEvent, onFullScreenChange} = this.props
      const onEnter = () => {
        onFullScreenChange(true)
        return onEvent(EVENTS.PLAYER.ENTER_FULLSCREEN)
      }
      const onExit = () => {
        onFullScreenChange(false)
        return onEvent(EVENTS.PLAYER.EXIT_FULLSCREEN)
      }
      BigScreen.toggle(this.playerRef.current, onEnter, onExit)
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

  render() {
    const {
      error,
      title,
      cover,
      standalone,
      onEvent,
      useMSE,
      useAutoQuality,
      disablePictureInPicture,
      progressDots,
      hiddenPlayButton,
      hiddenTimeline,
      hiddenTime,
      hiddenQualityMenu,
      hiddenVolume,
      hiddenFullScreenButton,
    } = this.props

    const {
      isPlaybackStarted,
      lastAction,
      isPlaying,
      isLoading,
      duration,
      isControllerShown,
      isControllerHovered,
      isControllerDragging,
      currentTime,
      isNeverPlayed,
      volume,
      buffered,
      type,
      hovered,
      pressed,
    } = this.state

    const isPip = Boolean(Pip.pictureInPictureElement)
    // Safari 会将 pip 状态视为全屏
    const isFullScreen = Boolean(BigScreen.element) && !isPip

    // 未播放时不展示 Controller
    // 播放中暂停时展示 Controller
    // 播放中 Controller shown/hovered/dragging 时展示 Controller
    // 播放结束展示 Controller
    const showController =
      (isPlaybackStarted &&
        (!isPlaying ||
          isControllerShown ||
          isControllerHovered ||
          isControllerDragging)) ||
      (!isPlaybackStarted && currentTime !== 0)

    const bufferedTime = getBufferedTime(currentTime, buffered)

    return (
      <div
        className={css(styles.root, isFullScreen && styles.fullScreened)}
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
              <Time value={duration} />
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
              onTouchStart={event => {
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
            {!hiddenTimeline && isPlaying && (!isLoading || currentTime !== 0) && (
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
            {/*首帧已加载完成时展示 Controller 组件*/}
            {isPlaybackStarted && (!isLoading || currentTime !== 0) && (
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
                  isPip={isPip}
                  onDragStart={this.handleControllerDragStart}
                  onDragEnd={this.handleControllerDragEnd}
                  onPlay={this.handlePlay}
                  onPause={this.handlePause}
                  onSeek={this.handleSeek}
                  onVolumeChange={this.handleVideoVolumeChange}
                  onToggleFullScreen={this.handleToggleFullScreen}
                  onTogglePip={this.handleTogglePip}
                  show={showController}
                  showPip={Pip.supported && !disablePictureInPicture}
                  hiddenPlayButton={hiddenPlayButton}
                  hiddenTimeline={hiddenTimeline}
                  hiddenTime={hiddenTime}
                  hiddenQualityMenu={hiddenQualityMenu}
                  hiddenVolumeItem={hiddenVolume}
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
      </div>
    )
  }
}

export default Player
