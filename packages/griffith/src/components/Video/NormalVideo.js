import React from 'react'

// eslint-disable-next-line
const NormalVideo = ({onRef, paused, currentQuality, sources, ...props}) => (
  <video {...props} ref={onRef} />
)

export default {
  pluginName: 'native',
  VideoComponent: NormalVideo,
}
