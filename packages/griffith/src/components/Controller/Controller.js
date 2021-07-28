import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'
import debounce from 'lodash/debounce'
import clamp from 'lodash/clamp'

import KeyCode from '../../constants/KeyCode'
import PlayButtonItem from './items/PlayButtonItem'
import TimelineItem from './items/TimelineItem'
import CombinedTimeItem from './items/CombinedTimeItem'
import QualityMenuItem from './items/QualityMenuItem'
import VolumeItem from './items/VolumeItem'
import FullScreenButtonItem from './items/FullScreenButtonItem'
import PipButtonItem from './items/PipButtonItem'
import SpeedButtonItem from './items/SpeedButtonItem'

import styles from './styles'

class Controller extends Component {
  static propTypes = {
    standalone: PropTypes.bool,
    isPlaying: PropTypes.bool,
    duration: PropTypes.number,
    currentTime: PropTypes.number,
    volume: PropTypes.number,
    buffered: PropTypes.number,
    isFullScreen: PropTypes.bool,
    speed: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onSeek: PropTypes.func,
    onQualityChange: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onToggleFullScreen: PropTypes.func,
    onProgressDotHover: PropTypes.func,
    onProgressDotLeave: PropTypes.func,
    onSpeedChange: PropTypes.func,
    show: PropTypes.bool,
    showPip: PropTypes.bool,
    progressDots: PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
      })
    ),
    hiddenPlayButton: PropTypes.bool,
    hiddenTimeline: PropTypes.bool,
    hiddenTime: PropTypes.bool,
    hiddenQualityMenu: PropTypes.bool,
    hiddenVolumeItem: PropTypes.bool,
    hiddenFullScreenButton: PropTypes.bool,
  }

  static defaultProps = {
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
    hiddenVolumeItem: false,
    hiddenFullScreenButton: false,
    progressDots: [],
  }

  state = {
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

  shouldComponentUpdate(nextProps) {
    return this.props.show || nextProps.show
  }

  componentWillUnmount() {
    if (this.props.standalone) {
      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  onDragMove = slideTime => {
    const {duration} = this.props
    slideTime = clamp(slideTime, 0, duration)
    this.setState({slideTime})
  }

  handleToggle = type => {
    const {isPlaying, onPlay, onPause} = this.props
    if (!isPlaying && onPlay) {
      onPlay(type)
    }
    if (isPlaying && onPause) {
      onPause(type)
    }
  }

  handleSeek = currentTime => {
    const {duration, onSeek} = this.props
    currentTime = clamp(currentTime, 0, duration)
    if (onSeek) {
      onSeek(currentTime)
      this.setState({slideTime: null})
    }
  }

  handleVolumeChange = volume => {
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

  handleKeyDown = event => {
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
          onToggleFullScreen()
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

  handleKeyUp = event => {
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
      isPip,
      speed,
      onDragStart,
      onDragEnd,
      onToggleFullScreen,
      onTogglePip,
      showPip,
      progressDots,
      hiddenPlayButton,
      hiddenTimeline,
      hiddenTime,
      hiddenQualityMenu,
      hiddenVolumeItem,
      hiddenFullScreenButton,
      onProgressDotHover,
      onProgressDotLeave,
      onSpeedChange,
    } = this.props
    const {
      isVolumeHovered,
      isVolumeDragging,
      isVolumeKeyboard,
      slideTime,
    } = this.state

    const displayedCurrentTime = slideTime || currentTime

    return (
      <div className={css(styles.root, isFullScreen && styles.fullScreened)}>
        {!hiddenPlayButton && (
          <PlayButtonItem
            isPlaying={isPlaying}
            onClick={() => this.handleToggle('button')}
          />
        )}
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
        {hiddenTimeline && <div className={css(styles.timelineHolder)} />}
        {!hiddenTime && (
          <CombinedTimeItem
            isFullScreen={isFullScreen}
            currentTime={displayedCurrentTime}
            duration={duration}
          />
        )}
        {!hiddenQualityMenu && <QualityMenuItem />}
        <SpeedButtonItem speed={speed} onChange={onSpeedChange} />
        {!hiddenVolumeItem && (
          <VolumeItem
            volume={volume}
            menuShown={isVolumeHovered || isVolumeDragging || isVolumeKeyboard}
            onMouseEnter={this.handleVolumePointerEnter}
            onMouseLeave={this.handleVolumePointerLeave}
            onToggleMuted={this.handleToggleMuted}
            onDragStart={this.handleVolumeDragStart}
            onDragEnd={this.handleVolumeDragEnd}
            onChange={this.handleVolumeChange}
          />
        )}
        {showPip && <PipButtonItem isPip={isPip} onClick={onTogglePip} />}
        {!hiddenFullScreenButton && (
          <FullScreenButtonItem
            isFullScreen={isFullScreen}
            onClick={onToggleFullScreen}
          />
        )}
      </div>
    )
  }
}

export default Controller
