import React from 'react'
import {css} from 'aphrodite/no-important'
import Icon from '../Icon'
import styles from '../Controller.styles'

type OwnProps = {
  icon?: JSX.Element
  label?: JSX.Element | string
}

const ControllerButton: React.FC<
  OwnProps & React.HTMLAttributes<HTMLButtonElement>
> = ({icon, label, ...props}) => {
  return (
    <button
      {...props}
      className={css(styles.button, label ? styles.labelButton : null)}
      type="button"
    >
      {icon && <Icon icon={icon} />}
      {label && <span className={css(styles.labelButtonText)}>{label}</span>}
    </button>
  )
}

export default ControllerButton
