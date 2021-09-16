import React from 'react'
import {PlaySource} from '../types'

type NativeVideoProps = React.HTMLProps<HTMLVideoElement>
type VideoProps = NativeVideoProps & {
  paused: boolean
  currentQuality: string
  useAutoQuality: boolean
  sources: PlaySource[]
  onRef: (el: HTMLVideoElement | null) => void
}

const NormalVideo: React.FC<VideoProps> = (props) => {
  const {
    onRef,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    paused,
    currentQuality,
    useAutoQuality,
    sources,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ...restProps
  } = props
  return <video {...restProps} ref={onRef} />
}

export default {
  pluginName: 'native',
  VideoComponent: NormalVideo,
  willHandleSrcChange: false,
}
