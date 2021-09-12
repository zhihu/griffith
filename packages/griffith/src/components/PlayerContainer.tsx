import React from 'react'
import {PlaybackRate, PlaySourceMap, RealQuality} from '../types'
import {
  defaultLocale,
  LocaleCode,
  PartialLocaleConfigMap,
} from '../constants/locales'
import Player, {PlayerProps as InternalPlayerProps} from './Player'
import VideoSourceProvider from '../contexts/VideoSourceProvider'
import VideoSourceContext from '../contexts/VideoSourceContext'
import {
  MessageProvider,
  InternalContext,
  MessageContextValue,
} from '../contexts/MessageContext'
import PositionProvider from '../contexts/PositionProvider'
import ObjectFitProvider, {ObjectFit} from '../contexts/ObjectFitProvider'
import LocaleProvider from '../contexts/LocaleProvider'

export type PlayerProps = {
  id: string
  sources: PlaySourceMap
  onBeforePlay?: (...args: any[]) => any
  onEvent?: (...args: any[]) => any
  dispatchRef?: React.MutableRefObject<MessageContextValue['dispatchAction']>
  initialObjectFit?: ObjectFit
  useMSE?: boolean
  defaultQuality?: RealQuality
  useAutoQuality?: boolean
  alwaysShowVolumeButton?: boolean
  playbackRates?: PlaybackRate[]
  defaultPlaybackRate?: PlaybackRate
  shouldObserveResize?: boolean
  locale?: LocaleCode
  localeConfig?: PartialLocaleConfigMap
} & Omit<InternalPlayerProps, 'onEvent' | 'onBeforePlay'>

const DEFAULT_PLAYBACK_RATE: PlaybackRate = {value: 1.0, text: '1.0x'}
const DEFAULT_PLAYBACK_RATES: PlaybackRate[] = [
  {value: 0.5, text: '0.5x'},
  {value: 0.75, text: '0.75x'},
  {value: 1.0, text: '1.0x'},
  {value: 1.25, text: '1.25x'},
  {value: 1.5, text: '1.5x'},
  {value: 2.0, text: '2.0x'},
]

const PlayerContainer: React.FC<PlayerProps> = ({
  standalone,
  id,
  title,
  cover,
  duration,
  sources,
  error,
  onBeforePlay = () => Promise.resolve(),
  onEvent,
  dispatchRef,
  shouldObserveResize,
  children,
  initialObjectFit = 'contain',
  useMSE,
  locale = defaultLocale,
  localeConfig = {},
  autoplay,
  loop,
  muted,
  disablePictureInPicture,
  hiddenPlayButton,
  hiddenTimeline,
  hiddenTime,
  hiddenQualityMenu,
  hiddenVolume,
  hiddenPlaybackRateItem,
  hiddenFullScreenButton,
  defaultQuality,
  defaultPlaybackRate = DEFAULT_PLAYBACK_RATE,
  playbackRates = DEFAULT_PLAYBACK_RATES,
  useAutoQuality = false,
  progressDots = [],
  alwaysShowVolumeButton,
}) => (
  <ObjectFitProvider initialObjectFit={initialObjectFit}>
    <PositionProvider shouldObserveResize={shouldObserveResize}>
      <MessageProvider
        id={id}
        enableCrossWindow={standalone}
        onEvent={onEvent}
        dispatchRef={dispatchRef}
      >
        <InternalContext.Consumer>
          {({emitEvent, subscribeAction}) => (
            <VideoSourceProvider
              onEvent={emitEvent}
              sources={sources}
              id={id}
              defaultQuality={defaultQuality}
              useAutoQuality={useAutoQuality}
              defaultPlaybackRate={defaultPlaybackRate}
              playbackRates={playbackRates}
            >
              <LocaleProvider locale={locale} localeConfig={localeConfig}>
                <VideoSourceContext.Consumer>
                  {({currentSrc}) => (
                    <Player
                      useMSE={useMSE}
                      useAutoQuality={useAutoQuality}
                      autoplay={autoplay}
                      loop={loop}
                      muted={muted}
                      disablePictureInPicture={disablePictureInPicture}
                      hiddenPlayButton={hiddenPlayButton}
                      hiddenTimeline={hiddenTimeline}
                      hiddenTime={hiddenTime}
                      hiddenQualityMenu={hiddenQualityMenu}
                      hiddenVolume={hiddenVolume}
                      hiddenPlaybackRateItem={hiddenPlaybackRateItem}
                      hiddenFullScreenButton={hiddenFullScreenButton}
                      alwaysShowVolumeButton={alwaysShowVolumeButton}
                      progressDots={progressDots}
                      standalone={standalone}
                      cover={cover}
                      title={title}
                      duration={duration}
                      error={error}
                      onEvent={emitEvent}
                      subscribeAction={subscribeAction}
                      onBeforePlay={() => onBeforePlay(currentSrc)}
                    >
                      {children}
                    </Player>
                  )}
                </VideoSourceContext.Consumer>
              </LocaleProvider>
            </VideoSourceProvider>
          )}
        </InternalContext.Consumer>
      </MessageProvider>
    </PositionProvider>
  </ObjectFitProvider>
)

export default PlayerContainer
