import React, {useEffect, useMemo, useRef, useState} from 'react'
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
import useHandler from '../hooks/useHandler'
import useBoolean from '../hooks/useBoolean'

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

Controller.defaultProps = {
  show: false,
  standalone: false,
  duration: 0,
  currentTime: 0,
  volume: 0.5,
  buffered: 0,
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

function Controller(props: ControllerProps) {
  const {
    show,
    isPlaying = false,
    buffered,
    duration,
    currentTime,
    volume,
    isFullScreen = false,
    isPageFullScreen,
    isPip,
    onDragStart,
    onDragEnd,
    onToggleFullScreen,
    onTogglePageFullScreen,
    onTogglePip,
    showPip,
    standalone,
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
    onPause,
    onPlay,
    onSeek,
    onVolumeChange,
  } = props
  const [isVolumeHovered, isVolumeHoveredSwitch] = useBoolean()
  const [isVolumeDragging, isVolumeDraggingSwitch] = useBoolean()
  const [isVolumeKeyboard, isVolumeKeyboardSwitch] = useBoolean()
  const [slideTime, setSlideTime] = useState<number>()
  const prevVolumeRef = useRef(1)

  const handleDragMove = useHandler((slideTime: number) => {
    setSlideTime(clamp(slideTime, 0, duration))
  })

  const handleTogglePlay = (type: ToggleType) => {
    if (isPlaying) {
      onPause?.(type)
    } else {
      onPlay?.(type)
    }
  }

  const handleSeek = useHandler((currentTime: number) => {
    currentTime = clamp(currentTime, 0, duration)
    if (onSeek) {
      onSeek(currentTime)
      setSlideTime(void 0)
    }
  })

  const handleVolumeChange = useHandler((volume: number) => {
    volume = clamp(volume, 0, 1)
    onVolumeChange?.(volume)
  })

  const handleToggleMuted = useHandler(() => {
    if (volume) {
      prevVolumeRef.current = volume
    }
    handleVolumeChange(volume ? 0 : prevVolumeRef.current)
  })

  const handleVolumeDragStart = useHandler(() => {
    if (volume) {
      prevVolumeRef.current = volume
    }

    isVolumeDraggingSwitch.on()
    onDragStart?.()
  })

  const handleVolumeDragEnd = useHandler(() => {
    isVolumeDraggingSwitch.off()
    onDragEnd?.()
  })

  const handleKeyDown = useHandler((event: KeyboardEvent) => {
    // 防止冲突，有修饰键按下时不触发自定义热键
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }
    let handled = true

    switch (event.key) {
      case ' ':
      case 'k':
        handleTogglePlay('keyCode')
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
        handleSeek(currentTime - 5)
        break

      case 'ArrowRight':
        handleSeek(currentTime + 5)
        break

      case 'j':
        handleSeek(currentTime - 10)
        break

      case 'l':
        handleSeek(currentTime + 10)
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
          handleSeek(nextTime)
        }
        break

      case 'm':
        handleToggleMuted()
        break
      case 'ArrowUp':
        if (volume) {
          prevVolumeRef.current = volume
        }
        isVolumeKeyboardSwitch.on()
        handleVolumeChange(volume + 0.05)
        break

      case 'ArrowDown':
        if (volume) {
          prevVolumeRef.current = volume
        }
        handleVolumeChange(volume - 0.05)
        break

      default:
        handled = false
        break
    }
    if (handled) {
      event.preventDefault()
    }
  })

  const handleKeyUp = useHandler((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        handleVolumeKeyboard()
        break
    }
  })

  const handleVolumeKeyboard = useMemo(
    () =>
      debounce(() => {
        isVolumeKeyboardSwitch.off()
      }, 1000),
    [isVolumeKeyboardSwitch]
  )

  useEffect(() => {
    if (standalone) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [handleKeyDown, handleKeyUp, standalone])

  const displayedCurrentTime = slideTime || currentTime

  return (
    <div className={css(styles.root)}>
      {!hiddenTimeline && (
        <TimelineItem
          value={currentTime}
          total={duration}
          buffered={buffered}
          progressDots={progressDots}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onChange={handleDragMove}
          onSeek={handleSeek}
          onProgressDotHover={onProgressDotHover}
          onProgressDotLeave={onProgressDotLeave}
        />
      )}
      <div className={css(styles.rootBottom)}>
        <div className={css(styles.rootBottomLeft)}>
          {!hiddenPlayButton && (
            <PlayButtonItem
              isPlaying={isPlaying}
              onClick={() => handleTogglePlay('button')}
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
          {shouldShowPageFullScreenButton && (
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
              onMouseEnter={isVolumeHoveredSwitch.on}
              onMouseLeave={isVolumeHoveredSwitch.off}
              onToggleMuted={handleToggleMuted}
              onDragStart={handleVolumeDragStart}
              onDragEnd={handleVolumeDragEnd}
              onChange={handleVolumeChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Controller)
