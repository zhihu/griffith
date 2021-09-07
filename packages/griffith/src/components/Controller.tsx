import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import debounce from 'lodash/debounce'
import clamp from 'lodash/clamp'
import {ProgressDot} from '../types'
import KeyCode from '../constants/KeyCode'
import PlayButtonItem from './items/PlayButtonItem'
import TimelineItem from './items/TimelineItem'
import CombinedTimeItem from './items/CombinedTimeItem'
import QualityMenuItem from './items/QualityMenuItem'
import VolumeItem from './items/VolumeItem'
import FullScreenButtonItem from './items/FullScreenButtonItem'
import PageFullScreenButtonItem from './items/PageFullScreenButtonItem'
import PipButtonItem from './items/PipButtonItem'
import styles from './Controller.styles'
import PlaybackRateMenuItem from './items/PlaybackRateMenuItem'

type OwnProps = {
  standalone?: boolean
  isPlaying?: boolean
  duration?: number
  currentTime?: number
  volume?: number
  buffered?: number
  isFullScreen?: boolean
  isPageFullScreen: boolean
  isPip: boolean
  onDragStart?: (...args: any[]) => any
  onDragEnd?: (...args: any[]) => any
  onPlay?: (...args: any[]) => any
  onPause?: (...args: any[]) => any
  onSeek?: (...args: any[]) => any
  onQualityChange?: (...args: any[]) => any
  onVolumeChange?: (...args: any[]) => any
  onToggleFullScreen?: (...args: void[]) => void
  onTogglePageFullScreen: (...args: void[]) => void
  onTogglePip?: (...args: void[]) => void
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
}

type State = any

type Props = OwnProps & typeof Controller.defaultProps

class Controller extends Component<Props, State> {
  static defaultProps = {
    show: false,
    standalone: false,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 0.5,
    buffered: 0,
    isFullScreen: false,
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
  firstKey = true
  slideTime = null

  componentDidMount() {
    if (this.props.standalone) {
      document.addEventListener('keydown', this.handleKeyDown)
      document.addEventListener('keyup', this.handleKeyUp)
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.show || nextProps.show
  }

  componentWillUnmount() {
    if (this.props.standalone) {
      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  onDragMove = (slideTime: any) => {
    const {duration} = this.props
    slideTime = clamp(slideTime, 0, duration)
    this.setState({slideTime})
  }

  handleToggle = (type: any) => {
    const {isPlaying, onPlay, onPause} = this.props
    if (!isPlaying && onPlay) {
      onPlay(type)
    }
    if (isPlaying && onPause) {
      onPause(type)
    }
  }

  handleSeek = (currentTime: any) => {
    const {duration, onSeek} = this.props
    currentTime = clamp(currentTime, 0, duration)
    if (onSeek) {
      onSeek(currentTime)
      this.setState({slideTime: null})
    }
  }

  handleVolumeChange = (volume: any) => {
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

  handleKeyDown = (event: any) => {
    const {duration, currentTime, volume, show, onToggleFullScreen} = this.props
    let handled = true
    switch (event.keyCode) {
      case KeyCode.SPACE:
      case KeyCode.K:
        if (this.firstKey) {
          this.handleToggle('keyCode')
        }
        break

      case KeyCode.ENTER:
      case KeyCode.F:
        if (this.firstKey) {
          onToggleFullScreen?.()
        }
        break

      case KeyCode.LEFT:
        this.handleSeek(currentTime - 5)
        break

      case KeyCode.RIGHT:
        this.handleSeek(currentTime + 5)
        break

      case KeyCode.J:
        if (this.firstKey) {
          this.handleSeek(currentTime - 10)
        }
        break

      case KeyCode.L:
        if (this.firstKey) {
          this.handleSeek(currentTime + 10)
        }
        break
      case KeyCode.ZERO:
      case KeyCode.ONE:
      case KeyCode.TWO:
      case KeyCode.THREE:
      case KeyCode.FOUR:
      case KeyCode.FIVE:
      case KeyCode.SIX:
      case KeyCode.SEVEN:
      case KeyCode.EIGHT:
      case KeyCode.NINE:
        if (show && this.firstKey) {
          const nextTime = (duration / 10) * (event.keyCode - KeyCode.ZERO)
          this.handleSeek(nextTime)
        }
        break

      case KeyCode.M:
        if (this.firstKey) {
          this.handleToggleMuted()
        }
        break
      case KeyCode.UP:
        if (this.firstKey && volume) {
          this.prevVolume = volume
        }
        this.setState({
          isVolumeKeyboard: true,
        })
        this.handleVolumeChange(volume + 0.05)
        break

      case KeyCode.DOWN:
        if (this.firstKey && volume) {
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
    this.firstKey = false
  }

  handleKeyUp = (event: any) => {
    this.firstKey = true

    switch (event.keyCode) {
      case KeyCode.UP:
      case KeyCode.DOWN:
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
                isPlaying={isPlaying}
                onClick={() => this.handleToggle('button')}
              />
            )}
            {hiddenTimeline && <div className={css(styles.timelineHolder)} />}
            {!hiddenTime && (
              <CombinedTimeItem
                isFullScreen={isFullScreen}
                currentTime={displayedCurrentTime}
                duration={duration}
              />
            )}
          </div>
          <div className={css(styles.rootBottomRight)}>
            {!hiddenPlaybackRateItem && <PlaybackRateMenuItem />}
            {!hiddenQualityMenu && <QualityMenuItem />}
            {showPip && <PipButtonItem isPip={isPip} onClick={onTogglePip} />}
            {!hiddenFullScreenButton && (
              <PageFullScreenButtonItem
                isFullScreen={isPageFullScreen}
                onClick={onTogglePageFullScreen}
              />
            )}
            {!hiddenFullScreenButton && (
              <FullScreenButtonItem
                isFullScreen={isFullScreen}
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
