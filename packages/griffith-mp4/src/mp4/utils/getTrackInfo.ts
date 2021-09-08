export function getVideoTrackInfo(videoSamples: any, mdatBuffer: any) {
  return {
    samples: videoSamples.map((sample: any) => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 1,
  }
}

export function getAudioTrackInfo(audioSamples: any, mdatBuffer: any) {
  return {
    samples: audioSamples.map((sample: any) => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 2,
  }
}
