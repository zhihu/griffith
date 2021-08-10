import React from 'react'
import {EVENTS, ACTIONS} from 'griffith-message'

type RealQuality = 'ld' | 'sd' | 'hd' | 'fhd'

interface PlaySource {
  bitrate: number
  duration: number
  format: string
  height: number
  play_url: string
  size: number
  width: number
}

interface PlayerContainerProps {
  id: string
  standalone?: boolean
  autoplay?: boolean
  loop?: boolean
  title?: string
  cover: string
  duration: number
  sources: {[key in RealQuality]?: PlaySource}
  error?: {
    message: string
  }
  onBeforePlay?: (src: string) => Promise<void>
  onEvent?: (type: string, data?: any) => void
  dispatchRef?: React.Ref<MessageContextValue['dispatchAction']>,
  shouldObserveResize?: boolean
  initialObjectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  useMSE?: boolean
  locale?: 'en' | 'ja' | 'zh-Hans' | 'zh-Hant'
  defaultQuality?: RealQuality[]
}

interface Subscription {
  unsubscribe: () => void
}

interface MessageContextValue {
  subscribeEvent: (
    eventName: string,
    eventHandler: (data: any) => void
  ) => Subscription
  dispatchAction: (actionName: string, data?: any) => void
}

type Quality = 'auto' | RealQuality

interface Source {
  bitrate: number
  duration: number
  format: number
  height: number
  quality: Quality
  source: string
  size: string
  width: number
}

interface VideoSourceContextValue {
  dataKey: string
  qualities: Quality[]
  format: string
  sources: Source[]
  currentQuality: Quality
  currentSrc: string
  setCurrentQuality: (q: Quality) => void
}

declare const PlayerContainer: React.ComponentType<PlayerContainerProps>
declare const MessageContext: React.Context<MessageContextValue>
declare const VideoSourceContext: React.Context<VideoSourceContextValue>
declare const Layer: React.ComponentType

export default PlayerContainer

export {VideoSourceContext, MessageContext, Layer, EVENTS, ACTIONS}
