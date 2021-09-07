import React, {cloneElement} from 'react'
import {css, StyleDeclarationValue} from 'aphrodite/no-important'

import styles from './Icon.styles'

type Props = {
  icon: React.ReactElement
  styles?: StyleDeclarationValue
}

function Icon({icon, styles: customStyles}: Props) {
  const children = cloneElement(icon, {
    className: css(styles.svg),
  })

  return <span className={css(styles.root, customStyles)}>{children}</span>
}

export default Icon
