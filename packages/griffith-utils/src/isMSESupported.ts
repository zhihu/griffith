/**
 * Copied from https://github.com/video-dev/hls.js/blob/master/src/is-supported.js
 */
function getMediaSource() {
  if (typeof window !== 'undefined') {
    return window.MediaSource || (window as any).WebKitMediaSource;
  }
}

export default function isMSESupported() {
  const mediaSource = getMediaSource()
  const sourceBuffer = window.SourceBuffer || (window as any).WebKitSourceBuffer;
  const isTypeSupported =
    mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')

  const sourceBufferValidAPI =
    !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function')
  return !!isTypeSupported && !!sourceBufferValidAPI
}
