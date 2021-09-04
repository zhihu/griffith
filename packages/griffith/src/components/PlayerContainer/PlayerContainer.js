import React from 'react'
import PropTypes from 'prop-types'
import {defaultLocal} from '../../constants/locales'
import Player from '../Player'
import VideoSourceProvider from '../../contexts/VideoSourceProvider'
import VideoSourceContext from '../../contexts/VideoSourceContext'
import {MessageProvider, InternalContext} from '../../contexts/MessageContext'
import PositionProvider from '../../contexts/PositionProvider'
import ObjectFitProvider, {VALID_FIT} from '../../contexts/ObjectFitProvider'
import LocaleProvider from '../../contexts/LocaleProvider'
import {DEFAULT_PLAYBACK_RATE} from '../../constants/DefaultPlaybackRate'

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
  shouldObserveResize,
  children,
  initialObjectFit = 'contain',
  useMSE,
  locale = defaultLocal,
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
  defaultPlaybackRate = {value: 1.0, text: '1.0x'},
  useAutoQuality = false,
  progressDots = [],
  alwaysShowVolumeButton,
  playbackRates = DEFAULT_PLAYBACK_RATE,
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

PlayerContainer.propTypes = {
  standalone: PropTypes.bool,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  cover: PropTypes.string,
  duration: PropTypes.number,
  sources: PropTypes.objectOf(
    PropTypes.shape({
      bitrate: PropTypes.number,
      duration: PropTypes.number,
      format: PropTypes.string.isRequired,
      height: PropTypes.number,
      play_url: PropTypes.string.isRequired,
      size: PropTypes.number,
      width: PropTypes.number,
    })
  ).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  onBeforePlay: PropTypes.func,
  onEvent: PropTypes.func,
  dispatchRef: PropTypes.shape({
    current: PropTypes.func,
  }),
  initialObjectFit: PropTypes.oneOf(VALID_FIT),
  useMSE: PropTypes.bool,
  defaultQuality: PropTypes.oneOf(['ld', 'sd', 'hd', 'fhd']),
  playbackRates: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.number,
    })
  ),
}

export default PlayerContainer
