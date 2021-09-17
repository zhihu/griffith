import React, {useEffect, useMemo, useState} from 'react'
import ObjectFitContext, {ObjectFit} from './ObjectFitContext'

type Props = {
  initialObjectFit?: ObjectFit
}

const ObjectFitProvider: React.FC<Props> = ({
  initialObjectFit = 'contain',
  children,
}) => {
  const [objectFit, setObjectFit] = useState<ObjectFit>(initialObjectFit)
  const contextValue = useMemo(
    () => ({
      objectFit,
      setObjectFit,
    }),
    [objectFit, setObjectFit]
  )

  useEffect(() => {
    setObjectFit(initialObjectFit)
  }, [initialObjectFit])

  return (
    <ObjectFitContext.Provider value={contextValue}>
      {children}
    </ObjectFitContext.Provider>
  )
}

export default ObjectFitProvider
