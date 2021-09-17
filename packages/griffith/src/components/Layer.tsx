import React, {useContext} from 'react'
import {css} from 'aphrodite/no-important'
import PositionContext from '../contexts/PositionContext'
import ObjectFitContext from '../contexts/ObjectFitContext'
import styles from './Layer.styles'

const getContainerClassName = (isFullWidth: boolean) =>
  css(
    styles.container,
    isFullWidth ? styles.containerFullWidth : styles.containerFullHeight
  )

const getImageClassName = (isFullWidth: boolean) =>
  css(
    styles.image,
    isFullWidth ? styles.imageFullWidth : styles.imageFullHeight
  )

const Positioned: React.FC = ({children}) => {
  const {isFullWidth, helperImageSrc} = useContext(PositionContext)

  if (helperImageSrc) {
    return (
      <div className={getContainerClassName(isFullWidth)}>
        <img src={helperImageSrc} className={getImageClassName(isFullWidth)} />
        {children}
      </div>
    )
  }

  return null
}

const Layer: React.FC = ({children}) => {
  const {objectFit} = useContext(ObjectFitContext)

  if (children) {
    const layer = <div className={css(styles.layer)}>{children}</div>
    // 暂时先只考虑 cover
    return objectFit === 'cover' ? layer : <Positioned>{layer}</Positioned>
  }

  return null
}

export default Layer
