import React from 'react'
import {css} from 'aphrodite/no-important'
import PositionContext from '../contexts/PositionContext'
import ObjectFitContext from '../contexts/ObjectFitContext'
import styles from './Layer.styles'

const getContainerClassName = (isFullWidth: any) =>
  css(
    styles.container,
    isFullWidth ? styles.containerFullWidth : styles.containerFullHeight
  )

const getImageClassName = (isFullWidth: any) =>
  css(
    styles.image,
    isFullWidth ? styles.imageFullWidth : styles.imageFullHeight
  )

const Positioned = ({children}: any) => (
  <PositionContext.Consumer>
    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'helperImageSrc' does not exist on type '... Remove this comment to see the full error message */}
    {({isFullWidth, helperImageSrc}) =>
      helperImageSrc && (
        <div className={getContainerClassName(isFullWidth)}>
          <img
            src={helperImageSrc}
            className={getImageClassName(isFullWidth)}
          />
          {children}
        </div>
      )
    }
  </PositionContext.Consumer>
)

export default function Layer({children}: any) {
  if (!children) return null

  const layer = <div className={css(styles.layer)}>{children}</div>

  // 暂时先只考虑 cover
  return (
    <ObjectFitContext.Consumer>
      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'objectFit' does not exist on type '{}'. */}
      {({objectFit}) =>
        objectFit === 'cover' ? layer : <Positioned>{layer}</Positioned>
      }
    </ObjectFitContext.Consumer>
  )
}
