/**
 * @fileoverview
 *
 * 定义一些跨许多文件使用的类型
 */

import type {ComponentType} from 'react'

export type RealQuality = 'ld' | 'sd' | 'hd' | 'fhd'
export type Quality = 'auto' | RealQuality
export type QualityOrder = 'asc' | 'desc'

export interface PlaySource {
  bitrate?: number
  duration?: number
  format?: string
  height?: number
  play_url: string
  size?: number
  width?: number
}

export interface FormattedPlaySource extends PlaySource {
  quality: RealQuality
  source: string
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

export type ProgressValue = {
  start: number
  end: number
}

/** 与 griffith-mp4 / griffith-hls 默认导出结构一致，用于 customPlayer 注入 */
export type VideoPlugin = {
  pluginName?: string
  VideoComponent: ComponentType<Record<string, unknown>>
  /** 切清晰度时是否由插件自行处理 src 变更，默认 true */
  willHandleSrcChange?: boolean
}
