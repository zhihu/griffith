import React from 'react'

// eslint-disable-next-line
export default ({onRef, paused, currentQuality, sources, ...props}) => (
  <video {...props} ref={onRef} />
)
