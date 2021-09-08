import React from 'react'

const NormalVideo = (props: any) => {
  const {
    onRef,
    /* eslint-disable no-unused-vars */
    paused,
    currentQuality,
    useAutoQuality,
    sources,
    /* eslint-disable no-unused-vars */
    ...restProps
  } = props
  return <video {...restProps} ref={onRef} />
}

export default {
  pluginName: 'native',
  VideoComponent: NormalVideo,
}
