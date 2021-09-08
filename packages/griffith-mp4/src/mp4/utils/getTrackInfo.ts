export function getVideoTrackInfo(videoSamples, mdatBuffer) {
  return {
    samples: videoSamples.map(sample => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 1,
  }
}

export function getAudioTrackInfo(audioSamples, mdatBuffer) {
  return {
    samples: audioSamples.map(sample => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 2,
  }
}
