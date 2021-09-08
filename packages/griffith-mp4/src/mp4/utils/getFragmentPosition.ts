export default function getFragmentPosition(
  videoSamples,
  audioSamples,
  mdatStart,
  isLastFragmentPosition
) {
  const videoSamplesEnd = videoSamples[videoSamples.length - 1].end
  let videoSamplesStart = 0

  if (videoSamples.length > 0) {
    videoSamplesStart = videoSamples[0].start
  }

  // maybe the last GOP dont have audio track
  // 最后一个 GOP 序列可能没有音频轨
  let audioSamplesEnd = 0
  let audioSamplesStart = Number.MAX_SAFE_INTEGER
  if (audioSamples.length !== 0) {
    audioSamplesEnd = audioSamples[audioSamples.length - 1].end
    audioSamplesStart = audioSamples[0].start
  }

  const fragmentEndPosition = isLastFragmentPosition
    ? ''
    : Math.max(videoSamplesEnd, audioSamplesEnd) + mdatStart
  const fragmentStartPosition =
    Math.min(videoSamplesStart, audioSamplesStart) + mdatStart

  return [fragmentStartPosition, fragmentEndPosition]
}
