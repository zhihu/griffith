import React from 'react'
import {css} from 'aphrodite/no-important'
import {LocaleConfigKey} from '../constants/locales'
import TranslatedText from './TranslatedText'
import styles from './Tooltip.styles'

type Props = {
  content: LocaleConfigKey
}

const Tooltip: React.FC<Props> = ({content}) => {
  return (
    <div className={css(styles.root)}>
      <TranslatedText name={content} />
    </div>
  )
}

export default Tooltip
