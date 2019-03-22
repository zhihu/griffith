export default function isHlsNativeSupported() {
  const video = document.createElement('video')
  return Boolean(video.canPlayType('application/vnd.apple.mpegURL'))
}
