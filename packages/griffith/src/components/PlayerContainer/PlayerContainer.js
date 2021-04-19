import React from 'react'
import PropTypes from 'prop-types'

import Player from '../Player'
import {
  VideoSourceProvider,
  VideoSourceContext,
} from '../../contexts/VideoSource'
import {MessageProvider, InternalContext} from '../../contexts/Message'
import {PositionProvider} from '../../contexts/Position'
import {ObjectFitProvider, VALID_FIT} from '../../contexts/ObjectFit'
import {LocaleContext} from '../../contexts/Locale'

const PlayerContainer = ({
  standalone,
  id,
  title,
  cover,
  duration,
  sources,
  error,
  onBeforePlay = () => Promise.resolve(),
  shouldObserveResize,
  children,
  initialObjectFit = 'contain',
  useMSE,
  locale = 'en',
  autoplay,
  disablePictureInPicture,
  hiddenPlayButton,
  hiddenTimeline,
  hiddenTime,
  hiddenQualityMenu,
  hiddenVolume,
  hiddenFullScreenButton,
  defaultQuality,
  useAutoQuality = false,
  progressDots = [],
}) => (
  <ObjectFitProvider initialObjectFit={initialObjectFit}>
    <PositionProvider shouldObserveResize={shouldObserveResize}>
      <MessageProvider id={id} enableCrossWindow={standalone}>
        <InternalContext.Consumer>
          {({emitEvent, subscribeAction}) => (
            <VideoSourceProvider
              onEvent={emitEvent}
              sources={sources}
              id={id}
              defaultQuality={defaultQuality}
              useAutoQuality={useAutoQuality}
            >
              <LocaleContext.Provider value={locale}>
                <VideoSourceContext.Consumer>
                  {({currentSrc}) => (
                    <Player
                      useMSE={useMSE}
                      useAutoQuality={useAutoQuality}
                      autoplay={autoplay}
                      disablePictureInPicture={disablePictureInPicture}
                      hiddenPlayButton={hiddenPlayButton}
                      hiddenTimeline={hiddenTimeline}
                      hiddenTime={hiddenTime}
                      hiddenQualityMenu={hiddenQualityMenu}
                      hiddenVolumeItem={hiddenVolume}
                      hiddenFullScreenButton={hiddenFullScreenButton}
                      progressDots={progressDots}
                      standalone={standalone}
                      cover={cover}
                      title={title}
                      duration={duration}
                      error={error}
                      onEvent={emitEvent}
                      subscribeAction={subscribeAction}
                      onBeforePlay={() => onBeforePlay(currentSrc)}
                    />
                  )}
                </VideoSourceContext.Consumer>
                {children}
              </LocaleContext.Provider>
            </VideoSourceProvider>
          )}
        </InternalContext.Consumer>
      </MessageProvider>
    </PositionProvider>
  </ObjectFitProvider>
)

PlayerContainer.propTypes = {
  standalone: PropTypes.bool,
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
  initialObjectFit: PropTypes.oneOf(VALID_FIT),
  useMSE: PropTypes.bool,
  defaultQuality: PropTypes.oneOf(['ld', 'sd', 'hd', 'fhd']),
}

export default PlayerContainer
