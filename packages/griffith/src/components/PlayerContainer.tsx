import React from 'react'
import {defaultLocal} from '../constants/locales'
import Player from './Player'
import VideoSourceProvider from '../contexts/VideoSourceProvider'
import VideoSourceContext from '../contexts/VideoSourceContext'
import {MessageProvider, InternalContext} from '../contexts/MessageContext'
import PositionProvider from '../contexts/PositionProvider'
import ObjectFitProvider, {VALID_FIT} from '../contexts/ObjectFitProvider'
import LocaleProvider from '../contexts/LocaleProvider'
import {DEFAULT_PLAYBACK_RATE} from '../constants/DefaultPlaybackRate'

type Props = {
  standalone?: boolean
  autoplay?: boolean
  loop?: boolean
  id: string
  title?: string
  cover?: string
  duration?: number
  sources: {
    [key: string]: {
      bitrate?: number
      duration?: number
      format: string
      height?: number
      play_url: string
      size?: number
      width?: number
    }
  }
  error?: {
    message?: string
  }
  onBeforePlay?: (...args: any[]) => any
  onEvent?: (...args: any[]) => any
  dispatchRef?: {
    current?: (...args: any[]) => any
  }
  initialObjectFit?: any // TODO: PropTypes.oneOf(VALID_FIT)
  useMSE?: boolean
  defaultQuality?: 'ld' | 'sd' | 'hd' | 'fhd'
  playbackRates?: {
    text?: string
    value?: number
  }[]
}

const PlayerContainer = ({
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldObserveResize' does not exist on t... Remove this comment to see the full error message
  shouldObserveResize,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
  children,
  initialObjectFit = 'contain',
  useMSE,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'locale' does not exist on type 'Props'.
  locale = defaultLocal,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'localeConfig' does not exist on type 'Pr... Remove this comment to see the full error message
  localeConfig = {},
  autoplay,
  loop,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'muted' does not exist on type 'Props'.
  muted,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disablePictureInPicture' does not exist ... Remove this comment to see the full error message
  disablePictureInPicture,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenPlayButton' does not exist on type... Remove this comment to see the full error message
  hiddenPlayButton,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenTimeline' does not exist on type '... Remove this comment to see the full error message
  hiddenTimeline,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenTime' does not exist on type 'Prop... Remove this comment to see the full error message
  hiddenTime,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenQualityMenu' does not exist on typ... Remove this comment to see the full error message
  hiddenQualityMenu,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenVolume' does not exist on type 'Pr... Remove this comment to see the full error message
  hiddenVolume,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenPlaybackRateItem' does not exist o... Remove this comment to see the full error message
  hiddenPlaybackRateItem,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hiddenFullScreenButton' does not exist o... Remove this comment to see the full error message
  hiddenFullScreenButton,
  defaultQuality,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultPlaybackRate' does not exist on t... Remove this comment to see the full error message
  defaultPlaybackRate = {value: 1.0, text: '1.0x'},
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'useAutoQuality' does not exist on type '... Remove this comment to see the full error message
  useAutoQuality = false,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'progressDots' does not exist on type 'Pr... Remove this comment to see the full error message
  progressDots = [],
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'alwaysShowVolumeButton' does not exist o... Remove this comment to see the full error message
  alwaysShowVolumeButton,
  playbackRates = DEFAULT_PLAYBACK_RATE,
}: Props) => (
  <ObjectFitProvider initialObjectFit={initialObjectFit}>
    <PositionProvider shouldObserveResize={shouldObserveResize}>
      <MessageProvider
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; id: string; enableCross... Remove this comment to see the full error message
        id={id}
        enableCrossWindow={standalone}
        onEvent={onEvent}
        dispatchRef={dispatchRef}
      >
        <InternalContext.Consumer>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'emitEvent' does not exist on type '{}'. */}
          {({emitEvent, subscribeAction}) => (
            <VideoSourceProvider
              onEvent={emitEvent}
              sources={sources}
              id={id}
              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              defaultQuality={defaultQuality}
              useAutoQuality={useAutoQuality}
              defaultPlaybackRate={defaultPlaybackRate}
              playbackRates={playbackRates}
            >
              <LocaleProvider locale={locale} localeConfig={localeConfig}>
                <VideoSourceContext.Consumer>
                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'currentSrc' does not exist on type '{}'. */}
                  {({currentSrc}) => (
                    <Player
                      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
                      hiddenVolumeItem={hiddenVolume}
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
