import React from 'react'
import {css} from 'aphrodite/no-important'

import VideoSourceContext from '../../contexts/VideoSourceContext'
import reverseArray from '../../utils/reverseArray'

import styles from '../Controller.styles'
import TranslatedText from '../TranslatedText'

class PlaybackRateMenuItem extends React.PureComponent {
  state = {
    isPlaybackRateHovered: false,
  }

  handlePlaybackRatePointerEnter = () => {
    this.setState({isPlaybackRateHovered: true})
  }

  handlePlaybackRatePointerLeave = () => {
    this.setState({isPlaybackRateHovered: false})
  }
  handleClickItem = (q, handler) => {
    this.handlePlaybackRatePointerLeave()
    handler(q)
  }

  render() {
    const {isPlaybackRateHovered} = this.state
    return (
      <VideoSourceContext.Consumer>
        {({playbackRates, setCurrentPlaybackRate, currentPlaybackRate}) =>
          playbackRates.length > 1 && (
            <div
              className={css(styles.menuContainer)}
              onMouseEnter={this.handlePlaybackRatePointerEnter}
              onMouseLeave={this.handlePlaybackRatePointerLeave}
            >
              <button className={css(styles.button, styles.qualityButton)}>
                <span className={css(styles.qualityButtonText)}>
                  {currentPlaybackRate.value === 1.0 ? (
                    <TranslatedText name={'playback-rate'} />
                  ) : (
                    `${currentPlaybackRate.text}`
                  )}
                </span>
              </button>
              <div
                className={css(
                  styles.menu,
                  isPlaybackRateHovered && styles.menuShown
                )}
              >
                <div className={css(styles.qualityMenu)}>
                  {reverseArray(playbackRates).map(q => (
                    <button
                      key={q.value}
                      className={css(
                        styles.qualityMenuItem,
                        currentPlaybackRate.value === q.value &&
                          styles.qualityMenuActiveItem
                      )}
                      onClick={() => {
                        this.handleClickItem(q, setCurrentPlaybackRate)
                      }}
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        }
      </VideoSourceContext.Consumer>
    )
  }
}

export default PlaybackRateMenuItem
