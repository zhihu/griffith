/**
 * @fileoverview
 *
 * 定义一些跨许多文件使用的类型
 */

export type RealQuality = 'ld' | 'sd' | 'hd' | 'fhd'
export type Quality = 'auto' | RealQuality

export interface PlaySource {
  bitrate?: number
  duration?: number
  format?: string
  height?: number
  play_url: string
  size?: number
  width?: number
}

export type PlaySourceMap = {
  [key in RealQuality]?: PlaySource
}

export interface PlaybackRate {
  value: number
  text: string
}

export type ProgressDot = {
  startTime: number
}
