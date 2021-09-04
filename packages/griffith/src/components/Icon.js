import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'

import styles from './Icon.styles'

function Icon({icon, styles: customStyles}) {
  const children = cloneElement(icon, {
    className: css(styles.svg),
  })

  return <span className={css(styles.root, customStyles)}>{children}</span>
}

Icon.propTypes = {
  icon: PropTypes.element.isRequired,
}

export default Icon
