import React from 'react'
import {PlaySource, Quality, PlaybackRate} from '../types'

let foo: Quality[] = ['auto', 'fhd']

export type VideoSourceContextValue = {
  dataKey?: string
  currentSrc: string
  format: string
  sources: PlaySource[]
  // 视频质量
  qualities: Quality[]
  setCurrentQuality(x: Quality): void
  currentQuality: Quality
  // 播放速度
  playbackRates: PlaybackRate[]
  setCurrentPlaybackRate(x: PlaybackRate): void
  currentPlaybackRate: PlaybackRate
}

const VideoSourceContext = React.createContext<VideoSourceContextValue>(
  {} as any
)
VideoSourceContext.displayName = 'VideoSourceContext'

export default VideoSourceContext
