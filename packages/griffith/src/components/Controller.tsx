import React, {useState} from 'react'
import {css} from 'aphrodite/no-important'
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
  onTogglePlay?: () => void
  onSeek?: (currentTime: number) => void
  onQualityChange?: (...args: any[]) => any
  onVolumeChange?: (volume: number) => void
  onToggleMuted?: () => void
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
    onTogglePlay,
    onSeek,
    onToggleMuted,
    onVolumeChange,
  } = props

  const [isVolumeHovered, isVolumeHoveredSwitch] = useBoolean()
  const [slideTime, setSlideTime] = useState<number>()

  const handleDragMove = useHandler((slideTime: number) => {
    setSlideTime(clamp(slideTime, 0, duration))
  })

  const handleSeek = useHandler((currentTime: number) => {
    onSeek?.(clamp(currentTime, 0, duration))
    setSlideTime(void 0)
  })

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
              onClick={() => onTogglePlay?.()}
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
              onToggleMuted={onToggleMuted}
              onChange={onVolumeChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Controller)
