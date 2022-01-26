import React, {useEffect, useRef, useState} from 'react'
import {css} from 'aphrodite/no-important'
import clamp from 'lodash/clamp'
import * as displayIcons from './icons/display/index'
import * as controllerIcons from './icons/controller/index'
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
import {useActionToastDispatch} from './ActionToast'

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
  onPlay?: () => void
  onPause?: () => void
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
  const actionToastDispatch = useActionToastDispatch()
  const [isVolumeHovered, isVolumeHoveredSwitch] = useBoolean()
  const [slideTime, setSlideTime] = useState<number>()
  const prevVolumeRef = useRef(1)

  const handleDragMove = useHandler((slideTime: number) => {
    setSlideTime(clamp(slideTime, 0, duration))
  })

  const handleTogglePlay = () => {
    if (isPlaying) {
      onPause?.()
    } else {
      onPlay?.()
    }
  }

  const handleSeek = useHandler((currentTime: number) => {
    currentTime = clamp(currentTime, 0, duration)
    if (onSeek) {
      onSeek(currentTime)
      setSlideTime(void 0)
    }
  })

  const handleVolumeChange = useHandler((value: number, showToast = false) => {
    value = clamp(value, 0, 1)
    if (showToast) {
      actionToastDispatch({
        icon: value ? controllerIcons.volume : controllerIcons.muted,
        label: `${(value * 100).toFixed(0)}%`,
      })
    }
    onVolumeChange?.(value)
  })

  const handleToggleMuted = useHandler((showToast = false) => {
    if (volume) {
      prevVolumeRef.current = volume
    }
    handleVolumeChange(volume ? 0 : prevVolumeRef.current, showToast)
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
      case 'K':
        actionToastDispatch({
          icon: isPlaying ? displayIcons.pause : displayIcons.play,
        })
        handleTogglePlay()
        break

      case 'Enter':
      case 'f':
      case 'F':
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
      case 'J':
        handleSeek(currentTime - 10)
        break

      case 'l':
      case 'L':
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
        handleSeek((duration / 10) * Number(event.key))
        break

      case 'm':
      case 'M':
        handleToggleMuted(true)
        break

      case 'ArrowUp':
        // 静音状态下调整可能不切换为非静音更好（设置一成临时的，切换后再应用临时状态）
        handleVolumeChange(volume + 0.05, true)
        break

      case 'ArrowDown':
        handleVolumeChange(volume - 0.05, true)
        break

      default:
        handled = false
        break
    }
    if (handled) {
      event.preventDefault()
    }
  })

  useEffect(() => {
    if (standalone) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown, standalone])

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
              onClick={() => handleTogglePlay()}
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
              menuShown={isVolumeHovered}
              onMouseEnter={isVolumeHoveredSwitch.on}
              onMouseLeave={isVolumeHoveredSwitch.off}
              onToggleMuted={handleToggleMuted}
              onChange={handleVolumeChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Controller)
