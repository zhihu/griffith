import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import {LocaleConfigKey} from '../constants/locales'
import TranslatedText from './TranslatedText'
import styles from './Tooltip.styles'

type Props = {
  content: LocaleConfigKey
}

class Tooltip extends Component<Props> {
  render() {
    const {content} = this.props
    return (
      <div className={css(styles.root)}>
        <TranslatedText name={content} />
      </div>
    )
  }
}

export default Tooltip
