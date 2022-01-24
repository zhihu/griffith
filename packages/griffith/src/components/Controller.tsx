import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import debounce from 'lodash/debounce'
import clamp from 'lodash/clamp'
import {ProgressDot} from '../types'
import PlayButtonItem from './items/PlayButtonItem'
import TimelineItem from './items/TimelineItem'
import CombinedTimeItem from './items/CombinedTimeItem'
import QualityMenuItem from './items/QualityMenuItem'
import VolumeItem from './items/VolumeItem'
import FullScreenButtonItem from './items/FullScreenButtonItem'
import PipButtonItem from './items/PipButtonItem'
import styles from './Controller.styles'
import PlaybackRateMenuItem from './items/PlaybackRateMenuItem'
import PageFullScreenButtonItem from './items/PageFullScreenButtonItem'

export type ToggleType = 'button' | 'keyCode' | 'video' | null

type ControllerProps = {
  standalone?: boolean
  isPlaying?: boolean
  duration: number
  currentTime: number
  volume: number
  buffered?: number
  isFullScreen?: boolean
  isPageFullScreen: boolean
  isPip: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
  onPlay?: (type: ToggleType) => void
  onPause?: (type: ToggleType) => void
  onSeek?: (currentTime: number) => void
  onQualityChange?: (...args: any[]) => any
  onVolumeChange?: (volume: number) => void
  onToggleFullScreen?: () => void
  onTogglePageFullScreen?: () => void
  onTogglePip?: (...args: any[]) => void
  onProgressDotHover?: (...args: any[]) => any
  onProgressDotLeave?: (...args: any[]) => any
  show?: boolean
  showPip?: boolean
  progressDots?: ProgressDot[]
  hiddenPlayButton?: boolean
  hiddenTimeline?: boolean
  hiddenTime?: boolean
  hiddenQualityMenu?: boolean
  hiddenVolumeItem?: boolean
  hiddenFullScreenButton?: boolean
  hiddenPlaybackRateItem?: boolean
  shouldShowPageFullScreenButton?: boolean
}

type State = {
  slideTime?: number | null
  isVolumeHovered: boolean
  isVolumeDragging: boolean
  isVolumeKeyboard: boolean
}

class Controller extends Component<ControllerProps, State> {
  static defaultProps = {
    show: false,
    standalone: false,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 0.5,
    buffered: 0,
    isFullScreen: false,
    isPageFullScreen: false,
    showPip: false,
    hiddenPlayButton: false,
    hiddenTimeline: false,
    hiddenTime: false,
    hiddenQualityMenu: false,
    hiddenPlaybackRateItem: false,
    hiddenVolumeItem: false,
    hiddenFullScreenButton: false,
    progressDots: [] as ProgressDot[],
  }

  state = {
    slideTime: undefined,
    isVolumeHovered: false,
    isVolumeDragging: false,
    isVolumeKeyboard: false,
  }
  prevVolume = 1
  slideTime = null

  componentDidMount() {
    if (this.props.standalone) {
      document.addEventListener('keydown', this.handleKeyDown)
      document.addEventListener('keyup', this.handleKeyUp)
    }
  }

  shouldComponentUpdate(nextProps: ControllerProps) {
    return this.props.show! || nextProps.show!
  }

  componentWillUnmount() {
    if (this.props.standalone) {
      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  onDragMove = (slideTime: number) => {
    const {duration} = this.props
    slideTime = clamp(slideTime, 0, duration)
    this.setState({slideTime})
  }

  handleToggle = (type: ToggleType) => {
    const {isPlaying, onPlay, onPause} = this.props
    if (!isPlaying && onPlay) {
      onPlay(type)
    }
    if (isPlaying && onPause) {
      onPause(type)
    }
  }

  handleSeek = (currentTime: number) => {
    const {duration, onSeek} = this.props
    currentTime = clamp(currentTime, 0, duration)
    if (onSeek) {
      onSeek(currentTime)
      this.setState({slideTime: null})
    }
  }

  handleVolumeChange = (volume: number) => {
    volume = clamp(volume, 0, 1)
    const {onVolumeChange} = this.props
    if (onVolumeChange) {
      onVolumeChange(volume)
    }
  }

  handleToggleMuted = () => {
    const {volume} = this.props
    if (volume) {
      this.prevVolume = volume
    }
    this.handleVolumeChange(volume ? 0 : this.prevVolume)
  }

  handleVolumePointerEnter = () => {
    this.setState({isVolumeHovered: true})
  }

  handleVolumePointerLeave = () => {
    this.setState({isVolumeHovered: false})
  }

  handleVolumeDragStart = () => {
    const {volume} = this.props
    if (volume) {
      this.prevVolume = volume
    }

    this.setState({isVolumeDragging: true})

    const {onDragStart} = this.props
    if (onDragStart) {
      onDragStart()
    }
  }

  handleVolumeDragEnd = () => {
    this.setState({isVolumeDragging: false})

    const {onDragEnd} = this.props
    if (onDragEnd) {
      onDragEnd()
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const {
      duration,
      currentTime,
      volume,
      show,
      onToggleFullScreen,
      onTogglePageFullScreen,
      isPageFullScreen,
    } = this.props
    // 防止冲突，有修饰键按下时不触发自定义热键
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }
    let handled = true

    switch (event.key) {
      case ' ':
      case 'k':
        this.handleToggle('keyCode')
        break

      case 'Enter':
      case 'f':
        onToggleFullScreen?.()
        break
      case 'Escape':
        if (isPageFullScreen) {
          onTogglePageFullScreen?.()
        }
        break
      case 'ArrowLeft':
        this.handleSeek(currentTime - 5)
        break

      case 'ArrowRight':
        this.handleSeek(currentTime + 5)
        break

      case 'j':
        this.handleSeek(currentTime - 10)
        break

      case 'l':
        this.handleSeek(currentTime + 10)
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (show) {
          const nextTime = (duration / 10) * Number(event.key)
          this.handleSeek(nextTime)
        }
        break

      case 'm':
        this.handleToggleMuted()
        break
      case 'ArrowUp':
        if (volume) {
          this.prevVolume = volume
        }
        this.setState({
          isVolumeKeyboard: true,
        })
        this.handleVolumeChange(volume + 0.05)
        break

      case 'ArrowDown':
        if (volume) {
          this.prevVolume = volume
        }
        this.handleVolumeChange(volume - 0.05)
        break

      default:
        handled = false
        break
    }
    if (handled) {
      event.preventDefault()
    }
  }

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.handleVolumeKeyboard()
        break
    }
  }

  handleVolumeKeyboard = debounce(() => {
    this.setState({
      isVolumeKeyboard: false,
    })
  }, 1000)

  render() {
    const {
      isPlaying,
      buffered,
      duration,
      currentTime,
      volume,
      isFullScreen,
      isPageFullScreen,
      isPip,
      onDragStart,
      onDragEnd,
      onToggleFullScreen,
      onTogglePageFullScreen,
      onTogglePip,
      showPip,
      progressDots,
      hiddenPlayButton,
      hiddenTimeline,
      hiddenTime,
      hiddenQualityMenu,
      hiddenVolumeItem,
      hiddenPlaybackRateItem,
      hiddenFullScreenButton,
      shouldShowPageFullScreenButton,
      onProgressDotHover,
      onProgressDotLeave,
    } = this.props
    const {isVolumeHovered, isVolumeDragging, isVolumeKeyboard, slideTime} =
      this.state

    const displayedCurrentTime = slideTime || currentTime

    return (
      <div
        className={css(
          styles.root,
          isFullScreen && (styles as any).fullScreened
        )}
      >
        {!hiddenTimeline && (
          <TimelineItem
            value={currentTime}
            total={duration}
            buffered={buffered}
            progressDots={progressDots}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onChange={this.onDragMove}
            onSeek={this.handleSeek}
            onProgressDotHover={onProgressDotHover}
            onProgressDotLeave={onProgressDotLeave}
          />
        )}
        <div className={css(styles.rootBottom)}>
          <div className={css(styles.rootBottomLeft)}>
            {!hiddenPlayButton && (
              <PlayButtonItem
                isPlaying={isPlaying!}
                onClick={() => this.handleToggle('button')}
              />
            )}
            {hiddenTimeline && <div className={css(styles.timelineHolder)} />}
            {!hiddenTime && (
              <CombinedTimeItem
                isFullScreen={isFullScreen!}
                currentTime={displayedCurrentTime}
                duration={duration}
              />
            )}
          </div>
          <div className={css(styles.rootBottomRight)}>
            {!hiddenPlaybackRateItem && <PlaybackRateMenuItem />}
            {!hiddenQualityMenu && <QualityMenuItem />}
            {showPip && <PipButtonItem isPip={isPip} onClick={onTogglePip} />}
            {shouldShowPageFullScreenButton && (
              <PageFullScreenButtonItem
                isFullScreen={isPageFullScreen}
                onClick={onTogglePageFullScreen}
              />
            )}
            {!hiddenFullScreenButton && (
              <FullScreenButtonItem
                isFullScreen={isFullScreen!}
                onClick={onToggleFullScreen}
              />
            )}
            {!hiddenVolumeItem && (
              <VolumeItem
                volume={volume}
                menuShown={
                  isVolumeHovered || isVolumeDragging || isVolumeKeyboard
                }
                onMouseEnter={this.handleVolumePointerEnter}
                onMouseLeave={this.handleVolumePointerLeave}
                onToggleMuted={this.handleToggleMuted}
                onDragStart={this.handleVolumeDragStart}
                onDragEnd={this.handleVolumeDragEnd}
                onChange={this.handleVolumeChange}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Controller
