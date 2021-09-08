import React, {cloneElement} from 'react'
import {css} from 'aphrodite/no-important'

import styles from './Icon.styles'

type Props = {
  icon: React.ReactElement
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'styles' does not exist on type 'Props'.
function Icon({icon, styles: customStyles}: Props) {
  const children = cloneElement(icon, {
    className: css(styles.svg),
  })

  return <span className={css(styles.root, customStyles)}>{children}</span>
}

export default Icon
