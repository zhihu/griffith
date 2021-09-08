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

type State = any

class QualityMenuItem extends React.PureComponent<{}, State> {
  state = {
    isQualityHovered: false,
  }

  handleQualityPointerEnter = () => {
    this.setState({isQualityHovered: true})
  }

  handleQualityPointerLeave = () => {
    this.setState({isQualityHovered: false})
  }

  handleClickItem = (q: any, handler: any) => {
    this.handleQualityPointerLeave()
    handler(q)
  }

  render() {
    const {isQualityHovered} = this.state
    return (
      <VideoSourceContext.Consumer>
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'qualities' does not exist on type '{}'. */}
        {({qualities, setCurrentQuality, currentQuality}) =>
          qualities.length > 1 && (
            <div
              className={css(styles.menuContainer)}
              onMouseEnter={this.handleQualityPointerEnter}
              onMouseLeave={this.handleQualityPointerLeave}
            >
              <button className={css(styles.button, styles.qualityButton)}>
                <span className={css(styles.qualityButtonText)}>
                  {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
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
                  {reverseArray(qualities).map((q: any) => (
                    <button
                      key={q}
                      className={css(
                        styles.qualityMenuItem,
                        currentQuality === q && styles.qualityMenuActiveItem
                      )}
                      onClick={() => this.handleClickItem(q, setCurrentQuality)}
                    >
                      {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
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
