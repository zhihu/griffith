import React, {useRef, useEffect, useState, useContext, useMemo} from 'react'
import {css} from 'aphrodite/no-important'
import BigScreen from 'isomorphic-bigscreen'
import {EVENTS, ACTIONS} from 'griffith-message'
import {ua} from 'griffith-utils'
import {
  ProgressDot,
  ProgressValue,
  PlaybackRate,
  PlaySourceMap,
  RealQuality,
} from '../types'
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
} from '../contexts/MessageContext'
import VideoSourceContext from '../contexts/VideoSourceContext'
import ObjectFitContext, {ObjectFit} from '../contexts/ObjectFitContext'
import PositionProvider from '../contexts/PositionProvider'
import ObjectFitProvider from '../contexts/ObjectFitProvider'
import LocaleProvider from '../contexts/LocaleProvider'
import TranslatedText from './TranslatedText'
import Icon from './Icon'
import * as displayIcons from './icons/display/index'
import Loader from './Loader'
import Video from './Video'
import Controller from './Controller'
import VolumeItem from './items/VolumeItem'
import MinimalTimeline from './MinimalTimeline'
import Layer from './Layer'
import getBufferedTime from '../utils/getBufferedTime'
import formatDuration from '../utils/formatDuration'
import storage from '../utils/storage'
import Pip from '../utils/pip'
import {
  ActionToastOutlet,
  ActionToastProvider,
  useActionToastDispatch,
} from './ActionToast'
import styles, {hiddenOrShownStyle} from './Player.styles'
import useBoolean from '../hooks/useBoolean'
import useMount from '../hooks/useMount'
import useHandler from '../hooks/useHandler'
import usePlayerShortcuts from './usePlayerShortcuts'

const CONTROLLER_HIDE_DELAY = 3000

// 被 Provider 包装后的属性
type InnerPlayerProps = {
  children?: React.ReactNode
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
  shouldShowPageFullScreenButton?: boolean
  hideMobileControls?: boolean
  hideCover?: boolean
  noWriteDocTitle?: boolean
  layerContent?: React.ReactNode
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
export type PlayerProps = InnerPlayerProps & OuterPlayerProps

// 非基本类型默认值（对象或数组），防止引用变化
const defaultProgressDots: ProgressDot[] = []

const InnerPlayer: React.FC<InnerPlayerProps> = ({
  autoplay,
  muted,
  error,
  title,
  cover,
  standalone,
  loop,
  duration: durationProp = 0,
  onBeforePlay,
  useMSE,
  useAutoQuality,
  alwaysShowVolumeButton,
  disablePictureInPicture,
  progressDots = defaultProgressDots,
  hiddenPlayButton,
  hiddenTimeline,
  hiddenTime,
  hiddenQualityMenu,
  hiddenVolume,
  hiddenFullScreenButton,
  shouldShowPageFullScreenButton,
  children,
  hiddenPlaybackRateItem,
  hideMobileControls,
  hideCover,
  noWriteDocTitle,
  layerContent,
}) => {
  const {emitEvent, subscribeAction} = useContext(InternalMessageContext)
  const {currentSrc} = useContext(VideoSourceContext)
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const videoRef = useRef<{
    root: HTMLVideoElement
    seek(currentTime: number): void
  }>()
  const actionToastDispatch = useActionToastDispatch()
  const [buffered, setBuffered] = useState<ProgressValue[]>([])
  const [volume, setVolume] = useState(0.5)
  const [duration, setDuration] = useState(durationProp)
  const [currentTime, setCurrentTime] = useState(0)
  const [isDataLoaded, isDataLoadedSwitch] = useBoolean()
  const [isPlaying, isPlayingSwitch] = useBoolean()
  // 开始播放的时候设置为 true，播放中途暂停仍然为 true，直到播放到最后停止的时候才会变成 false
  const [isPlaybackStarted, isPlaybackStartedSwitch] = useBoolean()
  // 用户第一次播放之后设置为 false，并且之后永远为 false
  const [isNeverPlayed, isNeverPlayedSwitch] = useBoolean(true)
  const [isControllerShown, isControllerShownSwitch] = useBoolean()
  const [isControllerHovered, isControllerHoveredSwitch] = useBoolean()
  const [isControllerDragging, isControllerDraggingSwitch] = useBoolean()
  const [hovered, hoveredSwitch] = useBoolean()
  const [pressed, pressedSwitch] = useBoolean()
  const [isPageFullScreen, isPageFullScreenSwitch] = useBoolean()
  const [isLoading, isLoadingSwitch] = useBoolean()

  useEffect(() => {
    if (durationProp && !duration) {
      setDuration(durationProp)
    }
  }, [duration, durationProp])

  useMount(() => {
    const historyVolume = storage.get('@griffith/history-volume')
    if (historyVolume) {
      setVolume(historyVolume as number)
    }

    const actionSubscriptions_ = [
      subscribeAction(ACTIONS.PLAY, () => handlePlay()),
      subscribeAction(ACTIONS.PAUSE, handlePauseAction),
      subscribeAction(ACTIONS.TIME_UPDATE, ({currentTime}) =>
        handleSeek(currentTime)
      ),
      subscribeAction(ACTIONS.SHOW_CONTROLLER, handleShowController),
      subscribeAction(ACTIONS.SET_VOLUME, ({volume}) =>
        handleVideoVolumeChange(volume)
      ),
    ]

    if (videoRef.current!.root) {
      if (muted) {
        handleVideoVolumeChange(0)
      }
      if (autoplay) {
        handlePlay()
      }
    }

    return () => {
      actionSubscriptions_.forEach((s) => s.unsubscribe())
    }
  })

  const showController = (() => {
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
  })()

  useEffect(() => {
    if (showController) {
      emitEvent(EVENTS.SHOW_CONTROLLER)
    } else {
      emitEvent(EVENTS.HIDE_CONTROLLER)
    }
  }, [emitEvent, showController])

  // sync document title
  useEffect(() => {
    if (
      standalone &&
      typeof title === 'string' &&
      title !== document.title &&
      !noWriteDocTitle
    ) {
      document.title = title
    }
  }, [noWriteDocTitle, standalone, title])

  // setup pip
  useEffect(() => {
    if (!disablePictureInPicture && videoRef.current!.root && !Pip.inited) {
      Pip.init(
        videoRef.current!.root,
        () => emitEvent(EVENTS.ENTER_PIP),
        () => emitEvent(EVENTS.EXIT_PIP)
      )
    }
  }, [disablePictureInPicture, emitEvent])

  const handlePauseAction = ({dontApplyOnFullScreen}: any = {}) => {
    if (!isPlaying) return

    if (dontApplyOnFullScreen && Boolean(BigScreen.element)) return

    handlePause()
  }

  const handleClickToTogglePlay = () => {
    // 仅点击覆盖层触发提示（控制条上的按钮点击不需要）
    actionToastDispatch({
      icon: isPlaying ? displayIcons.pause : displayIcons.play,
    })
    handleTogglePlay()
  }

  const handlePlay = () => {
    emitEvent(EVENTS.REQUEST_PLAY)
    Promise.resolve(onBeforePlay?.(currentSrc))
      .then(() => {
        if (!isPlaybackStarted) {
          emitEvent(EVENTS.PLAY_COUNT)
          isPlaybackStartedSwitch.on()
          if (!isDataLoaded) {
            isLoadingSwitch.on()
          }
          // workaround a bug in IE about replaying a video.
          if (ua.isIE && currentTime !== 0) {
            handleSeek(0)
          }
        }
        isPlayingSwitch.on()
        isNeverPlayedSwitch.off()
      })
      .catch(() => {
        emitEvent(EVENTS.PLAY_REJECTED)
        // 播放被取消
      })
  }

  const handlePause = () => {
    emitEvent(EVENTS.REQUEST_PAUSE)

    if (!isLoading || hideMobileControls) {
      isPlayingSwitch.off()
    }
  }

  const handleVideoPlay = () => {
    if (!isPlaying) {
      isPlayingSwitch.on()
    }
  }

  const handleVideoPause = () => {
    if (isPlaying) {
      isPlayingSwitch.off()
    }
  }

  const handleVideoEnded = () => {
    isPlaybackStartedSwitch.off()
    isPlayingSwitch.off()
    isLoadingSwitch.off()
  }

  const handleVideoLoadedData = () => {
    isDataLoadedSwitch.on()
    isLoadingSwitch.off()
  }

  const handleVideoError = () => {
    isPlayingSwitch.off()
  }

  const handleVideoDurationChange = (duration: number) => {
    setDuration(duration)
  }

  const handleVideoTimeUpdate = (currentTime: number) => {
    if (isLoading || isSeekingRef.current) {
      return
    }
    setCurrentTime(currentTime)
  }

  const handleVideoVolumeChange = useHandler((volume: number) => {
    volume = Math.round(volume * 100) / 100
    setVolume(volume)
    storage.set('@griffith/history-volume', volume)
  })

  const handleSeek = useHandler((value: number) => {
    setCurrentTime(value)
    // TODO 想办法去掉这个实例方法调用
    videoRef.current?.seek(value)
  })

  const handleLoadingChange = (value: boolean) => {
    value ? isLoadingSwitch.on() : isLoadingSwitch.off()
  }

  const isSeekingRef = useRef(false)
  const handleVideoSeeking = () => {
    isSeekingRef.current = true
  }

  const handleVideoSeeked = () => {
    isSeekingRef.current = false
  }

  const handleVideoProgress = (value: ProgressValue[]) => {
    setBuffered(value)
  }

  const handleToggleFullScreen = useHandler(() => {
    if (BigScreen.enabled) {
      const onEnter = () => {
        return emitEvent(EVENTS.ENTER_FULLSCREEN)
      }
      const onExit = () => {
        return emitEvent(EVENTS.EXIT_FULLSCREEN)
      }
      BigScreen?.toggle(root!, onEnter, onExit)
    }
  })

  const handleTogglePageFullScreen = useHandler(() => {
    // 如果当前正在全屏就先关闭全屏
    if (Boolean(BigScreen.element) && !Pip.pictureInPictureElement) {
      handleToggleFullScreen()
    }
    if (isPageFullScreen) {
      isPageFullScreenSwitch.off()
      emitEvent(EVENTS.EXIT_PAGE_FULLSCREEN)
    } else {
      isPageFullScreenSwitch.on()
      emitEvent(EVENTS.ENTER_PAGE_FULLSCREEN)
    }
  })

  const handleTogglePip = useHandler(() => {
    if (isPageFullScreen) {
      isPageFullScreenSwitch.off()
      emitEvent(EVENTS.EXIT_PAGE_FULLSCREEN)
    }
    Pip.toggle()
  })

  const hideControllerTimerRef = useRef(
    null
  ) as React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  const handleShowController = () => {
    if (!isControllerShown) {
      isControllerShownSwitch.on()
    }
    if (hideControllerTimerRef.current !== null) {
      clearTimeout(hideControllerTimerRef.current)
    }
    hideControllerTimerRef.current = setTimeout(() => {
      hideControllerTimerRef.current = null
      isControllerShownSwitch.off()
    }, CONTROLLER_HIDE_DELAY)
  }

  const handleHideController = () => {
    if (hideControllerTimerRef.current !== null) {
      clearTimeout(hideControllerTimerRef.current)
      hideControllerTimerRef.current = null
    }
    isControllerShownSwitch.off()
  }

  const handleMouseEnter = () => {
    hoveredSwitch.on()
    handleShowController()
  }

  const handleMouseLeave = () => {
    hoveredSwitch.off()
    handleHideController()
  }

  const handleMouseDown = () => {
    pressedSwitch.on()
    handleShowController()
  }

  const handleMouseUp = () => {
    pressedSwitch.off()
    handleShowController()
  }

  const handleProgressDotHover = (info: any) => {
    emitEvent(EVENTS.HOVER_PROGRESS_DOT, info)
  }

  const handleProgressDotLeave = () => {
    emitEvent(EVENTS.LEAVE_PROGRESS_DOT)
  }

  const handleTogglePlay = useHandler(() => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  })

  const prevVolumeRef = useRef(volume)
  const handleToggleMuted = useHandler(() => {
    if (volume) {
      prevVolumeRef.current = volume
    }
    handleVideoVolumeChange(volume ? 0 : prevVolumeRef.current)
  })

  usePlayerShortcuts({
    root,
    prevVolumeRef,
    isPlaying,
    volume,
    currentTime,
    duration,
    standalone,
    isPageFullScreen,
    onTogglePlay: handleTogglePlay,
    onToggleFullScreen: handleToggleFullScreen,
    onTogglePageFullScreen: handleTogglePageFullScreen,
    onVolumeChange: handleVideoVolumeChange,
    onSeek: handleSeek,
  })

  const isPip = Boolean(Pip.pictureInPictureElement)
  // Safari 会将 pip 状态视为全屏
  const isFullScreen = Boolean(BigScreen.element) && !isPip
  const bufferedTime = useMemo(
    () => getBufferedTime(currentTime, buffered),
    [buffered, currentTime]
  )
  const videoDataLoaded = !isLoading || currentTime !== 0
  const renderController = videoDataLoaded && isPlaybackStarted

  const controlsOverlay = !ua.isMobile && (
    <div className={css(styles.overlay, isNeverPlayed && styles.overlayMask)}>
      {isPlaybackStarted && isLoading && (
        <div className={css(styles.loader)}>
          <Loader />
        </div>
      )}
      <div
        className={css(styles.backdrop)}
        onTouchStart={(event) => {
          // prevent touch to toggle
          event.preventDefault()
        }}
        onClick={handleClickToTogglePlay}
      />
      {title && isFullScreen && (
        <div className={css(styles.title, showController && styles.titleShown)}>
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
          onMouseEnter={isControllerHoveredSwitch.on}
          onMouseLeave={isControllerHoveredSwitch.off}
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
            isPageFullScreen={isPageFullScreen}
            isPip={isPip}
            onDragStart={isControllerDraggingSwitch.on}
            onDragEnd={isControllerDraggingSwitch.off}
            onTogglePlay={handleTogglePlay}
            onToggleMuted={handleToggleMuted}
            onSeek={handleSeek}
            onVolumeChange={handleVideoVolumeChange}
            onToggleFullScreen={handleToggleFullScreen}
            onTogglePageFullScreen={handleTogglePageFullScreen}
            onTogglePip={handleTogglePip}
            onProgressDotHover={handleProgressDotHover}
            onProgressDotLeave={handleProgressDotLeave}
            show={showController}
            showPip={Pip.supported && !disablePictureInPicture}
            hiddenPlayButton={hiddenPlayButton}
            hiddenTimeline={hiddenTimeline}
            hiddenTime={hiddenTime}
            hiddenQualityMenu={hiddenQualityMenu}
            hiddenVolumeItem={hiddenVolume}
            hiddenPlaybackRateItem={hiddenPlaybackRateItem}
            hiddenFullScreenButton={hiddenFullScreenButton}
            shouldShowPageFullScreenButton={shouldShowPageFullScreenButton}
          />
        </div>
      )}
    </div>
  )

  return (
    <div
      className={css(
        styles.root,
        isFullScreen && styles.fullScreened,
        isPageFullScreen && styles.pageFullScreen
      )}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleShowController}
      ref={setRoot}
      tabIndex={-1}
      aria-label={title}
    >
      <div className={css(styles.video)}>
        <Video
          ref={videoRef}
          controls={ua.isMobile && isPlaybackStarted && !hideMobileControls}
          paused={!isPlaying}
          volume={volume}
          loop={loop}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoEnded}
          onLoadedData={handleVideoLoadedData}
          onError={handleVideoError}
          onLoadingChange={handleLoadingChange}
          onDurationUpdate={handleVideoDurationChange}
          onCurrentTimeUpdate={handleVideoTimeUpdate}
          onSeeking={handleVideoSeeking}
          onSeeked={handleVideoSeeked}
          onProgressUpdate={handleVideoProgress}
          // TODO: 变更 prop 名称
          onEvent={emitEvent as any}
          useMSE={useMSE}
          useAutoQuality={useAutoQuality}
        />
      </div>
      {hideMobileControls && isPlaybackStarted && isLoading && (
        <div className={css(styles.loader)}>
          <Loader />
        </div>
      )}
      {!hideCover && (
        <div
          className={css(styles.cover, !isPlaybackStarted && styles.coverShown)}
          onClick={() => handlePlay()}
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
                ua.isMobile && styles.coverTimeMobile
              )}
            >
              {formatDuration(duration)}
            </div>
          )}
          {/* 只有在第一次未播放时展示播放按钮，播放结束全部展示重播按钮 */}
          {isNeverPlayed && (
            <div className={css(styles.coverAction)}>
              <div className={css(styles.actionButton)}>
                <Icon icon={displayIcons.play} styles={styles.actionIcon} />
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
                <Icon icon={displayIcons.replay} styles={styles.replayIcon} />
                <TranslatedText name="replay" />
              </div>
            </div>
          )}
        </div>
      )}
      {controlsOverlay}
      <ActionToastOutlet />
      {layerContent && <Layer>{layerContent}</Layer>}
      {error && (
        <div className={css(styles.error)}>
          <Icon icon={displayIcons.alert} styles={styles.errorIcon} />
          {error.message && (
            <div className={css(styles.errorMessage)}>{error.message}</div>
          )}
        </div>
      )}
      {children}
    </div>
  )
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
  // 仅解构 provider 需要的 props，其余都透传
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
          <VideoSourceProvider
            sources={sources}
            defaultQuality={defaultQuality}
            useAutoQuality={useAutoQuality}
            defaultPlaybackRate={defaultPlaybackRate}
            playbackRates={playbackRates}
          >
            <LocaleProvider locale={locale} localeConfig={localeConfig}>
              <ActionToastProvider>
                <InnerPlayer
                  {...restProps}
                  useAutoQuality={useAutoQuality}
                  standalone={standalone}
                />
              </ActionToastProvider>
            </LocaleProvider>
          </VideoSourceProvider>
        </MessageProvider>
      </PositionProvider>
    </ObjectFitProvider>
  )
}

export default React.memo(Player)
