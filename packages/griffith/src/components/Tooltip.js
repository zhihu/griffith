import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'
import TranslatedText from './TranslatedText'
import styles from './Tooltip.styles'

class Tooltip extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  }

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
