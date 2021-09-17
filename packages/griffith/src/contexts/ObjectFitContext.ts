import React from 'react'

// https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export type ObjectFitContextValue = {
  objectFit: ObjectFit
  setObjectFit(objectFit: ObjectFit): void
}

const ObjectFitContext = React.createContext<ObjectFitContextValue>({} as never)
ObjectFitContext.displayName = 'ObjectFitContext'

export default ObjectFitContext
