import React, {Component} from 'react'
// TODO: 升级有类型的新版
import Hls from 'hls.js/dist/hls.light.min'
import {Source} from './types'
import {getMasterM3U8Blob} from './utils'

type NativeVideoProps = React.HTMLProps<HTMLVideoElement>
type VideoProps = NativeVideoProps & {
  paused: boolean
  currentQuality: string
  useAutoQuality: boolean
  sources: Source[]
  onRef(el: HTMLVideoElement | null): void
}

export default class VideoComponent extends Component<VideoProps> {
  hls?: Hls
  src!: string
  video: HTMLVideoElement | null = null
  manuallyBuildAdaptiveM3U8Blob = false
  hasLoadStarted = false

  componentDidMount() {
    const {src, sources, useAutoQuality} = this.props
    this.hls = new Hls({autoStartLoad: false})
    this.hls.attachMedia(this.video!)

    const isAutoQualitySourceProvided = Boolean(
      sources.find((s) => s.quality === 'auto')
    )

    // 启用自动质量但是又没有提供 auto 规格的 source，那么就尝试本地手动生成
    if (useAutoQuality && !isAutoQualitySourceProvided) {
      const master = getMasterM3U8Blob(sources)
      this.src = URL.createObjectURL(master)
      this.manuallyBuildAdaptiveM3U8Blob = true
    } else {
      this.src = src!
    }

    this.hls.loadSource(this.src)
  }

  componentDidUpdate(prevProps: VideoProps) {
    const {currentQuality, sources, paused} = this.props

    if (!this.hls) {
      return
    }

    if (currentQuality !== prevProps.currentQuality || prevProps.src !== src) {
      // 切换清晰度
      const source = sources.find((s) => s.quality === currentQuality)
      if (source) {
        if (this.manuallyBuildAdaptiveM3U8Blob) {
          const levels = this.hls.levels
          const level = levels.findIndex((l) =>
            l.url.includes(source.source as any)
          )
          this.hls.nextLevel = level
        } else {
          // TODO: 没有在 hls 的 API 内部找到顺畅切换 source 的方法
          // 因此这里比较直接和生硬
          const currentTime = this.video!.currentTime
          this.hls.destroy()
          this.hls = new Hls({autoStartLoad: false})
          this.hls.attachMedia(this.video!)
          this.hls.loadSource(source.source)
          this.video!.currentTime = currentTime
          this.hls.startLoad()
          if (!paused) {
            void this.video!.play()
          }
        }
      } else {
        // 一定意味着选择了手动生成的「auto」
        this.hls.nextLevel = -1
      }
    }

    // 切换播放状态
    if (!paused && prevProps.paused && !this.hasLoadStarted) {
      this.hls.startLoad()
      this.hasLoadStarted = true
    }
  }

  componentWillUnmount() {
    this.hls!.destroy()
    if (this.manuallyBuildAdaptiveM3U8Blob) {
      URL.revokeObjectURL(this.src)
    }
  }

  render() {
    const {
      onRef,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      currentQuality,
      useAutoQuality,
      src,
      sources,
      paused,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = this.props
    return (
      <video
        ref={(el) => {
          if (onRef) {
            onRef(el)
          }
          this.video = el
        }}
        {...props}
      />
    )
  }
}
