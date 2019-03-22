export default function getFragmentPosition(
  videoSamples,
  audioSamples,
  mdatStart,
  isLastFragmentPosition
) {
  const videoSamplesEnd = videoSamples[videoSamples.length - 1].end
  const videoSamplesStart = videoSamples[0].start
  const audioSamplesEnd = audioSamples[audioSamples.length - 1].end
  const audioSamplesStart = audioSamples[0].start

  const fragmentEndPosition = isLastFragmentPosition
    ? ''
    : Math.max(videoSamplesEnd, audioSamplesEnd) + mdatStart
  const fragmentStartPosition =
    Math.min(videoSamplesStart, audioSamplesStart) + mdatStart

  return [fragmentStartPosition, fragmentEndPosition]
}
