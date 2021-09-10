import {isHlsNativeSupported, isMSESupported} from 'griffith-utils'
import GriffithHls from 'griffith-hls'
import GriffithMp4 from 'griffith-mp4'
import NormalVideo from './NormalVideo'
import memoize from 'lodash/memoize'

function selectVideo(format: any, useMSE: any) {
  if (
    format === 'm3u8' &&
    GriffithHls?.VideoComponent &&
    isMSESupported() &&
    !isHlsNativeSupported()
  ) {
    return GriffithHls
  }
  if (
    format === 'mp4' &&
    GriffithMp4?.VideoComponent &&
    isMSESupported() &&
    useMSE
  ) {
    return GriffithMp4
  }
  return NormalVideo
}

// 内部利用了 DOM 推测，避免 render 过程中多次执行
export default memoize(selectVideo, (...args) => String(args))
