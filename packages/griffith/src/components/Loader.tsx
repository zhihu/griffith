import React from 'react'
import {css} from 'aphrodite/no-important'

import styles from './Loader.styles'

const Loader = () => {
  return (
    <div className={css(styles.root)}>
      <svg viewBox="0 0 64 64" className={css(styles.svg)}>
        <circle className={css(styles.circle)} />
      </svg>
    </div>
  )
}

export default Loader
