import React from 'react'
import {css} from 'aphrodite/no-important'

import VideoSourceContext from '../../contexts/VideoSourceContext'
import reverseArray from '../../utils/reverseArray'
import TranslatedText from '../TranslatedText'

import styles from '../Controller.styles'

const QUALITIES = {
  auto: 'quality-auto',
  ld: 'quality-ld',
  sd: 'quality-sd',
  hd: 'quality-hd',
  fhd: 'quality-fhd',
}

class QualityMenuItem extends React.PureComponent {
  state = {
    isQualityHovered: false,
  }

  handleQualityPointerEnter = () => {
    this.setState({isQualityHovered: true})
  }

  handleQualityPointerLeave = () => {
    this.setState({isQualityHovered: false})
  }

  handleClickItem = (q, handler) => {
    this.handleQualityPointerLeave()
    handler(q)
  }

  render() {
    const {isQualityHovered} = this.state
    return (
      <VideoSourceContext.Consumer>
        {({qualities, setCurrentQuality, currentQuality}) =>
          qualities.length > 1 && (
            <div
              className={css(styles.menuContainer)}
              onMouseEnter={this.handleQualityPointerEnter}
              onMouseLeave={this.handleQualityPointerLeave}
            >
              <button className={css(styles.button, styles.qualityButton)}>
                <span className={css(styles.qualityButtonText)}>
                  <TranslatedText name={QUALITIES[currentQuality]} />
                </span>
              </button>
              <div
                className={css(
                  styles.menu,
                  isQualityHovered && styles.menuShown
                )}
              >
                <div className={css(styles.qualityMenu)}>
                  {reverseArray(qualities).map(q => (
                    <button
                      key={q}
                      className={css(
                        styles.qualityMenuItem,
                        currentQuality === q && styles.qualityMenuActiveItem
                      )}
                      onClick={() => this.handleClickItem(q, setCurrentQuality)}
                    >
                      <TranslatedText name={QUALITIES[q]} />
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

export default QualityMenuItem
