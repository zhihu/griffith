import React from 'react'

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
type ObjectFitContextValue = {
  objectFit?: ObjectFit
  setObjectFit?(objectFit: ObjectFit): void
}

const ObjectFitContext = React.createContext<ObjectFitContextValue>({})
ObjectFitContext.displayName = 'ObjectFitContext'

export default ObjectFitContext
