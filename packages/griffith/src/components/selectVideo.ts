import {isHlsNativeSupported, isMSESupported} from 'griffith-utils'
import GriffithHls from 'griffith-hls'
import GriffithMp4 from 'griffith-mp4'
import type {VideoPlugin} from '../types'
import NormalVideo from './NormalVideo'
import memoize from 'lodash/memoize'

function selectVideo(
  format: string,
  useMSE: boolean | undefined,
  customPlayer?: VideoPlugin
) {
  if (
    format === 'm3u8' &&
    GriffithHls?.VideoComponent &&
    isMSESupported() &&
    !isHlsNativeSupported()
  ) {
    return GriffithHls
  }
  if (format === 'mp4' && isMSESupported() && useMSE) {
    if (customPlayer?.VideoComponent) {
      return {
        pluginName: customPlayer.pluginName ?? 'custom',
        VideoComponent: customPlayer.VideoComponent,
        willHandleSrcChange: customPlayer.willHandleSrcChange ?? true,
      }
    }
    if (GriffithMp4?.VideoComponent) {
      return GriffithMp4
    }
  }
  return NormalVideo
}

// 内部利用了 DOM 推测，避免 render 过程中多次执行
export default memoize(
  selectVideo,
  (format, useMSE, customPlayer) =>
    `${format}-${Boolean(useMSE)}-${customPlayer?.pluginName ?? ''}`
)
