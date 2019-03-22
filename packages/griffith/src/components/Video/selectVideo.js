import {isHlsNativeSupported, isMSESupported} from 'griffith-utils'
import NormalVideo from './NormalVideo'
/* global __WITHOUT_HLSJS__:false, __WITHOUT_MP4__:false */

export default function selectVideo(format, useMSE) {
  if (format === 'm3u8') {
    if (typeof __WITHOUT_HLSJS__ === 'undefined' ? false : __WITHOUT_HLSJS__) {
      return NormalVideo
    } else if (isMSESupported() && !isHlsNativeSupported()) {
      return require('griffith-hls').default
    }
  }
  if (format === 'mp4') {
    if (typeof __WITHOUT_MP4__ === 'undefined' ? false : __WITHOUT_MP4__) {
      return NormalVideo
    } else if (isMSESupported() && useMSE) {
      return require('griffith-mp4').default
    }
  }
  return NormalVideo
}
