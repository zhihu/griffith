import {Sample} from '../types'

export function getVideoTrackInfo(
  videoSamples: Sample[],
  mdatBuffer: ArrayBuffer
) {
  return {
    samples: videoSamples.map((sample) => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 1,
  }
}

export function getAudioTrackInfo(
  audioSamples: Sample[],
  mdatBuffer: ArrayBuffer
) {
  return {
    samples: audioSamples.map((sample) => ({
      ...sample,
      buffer: mdatBuffer.slice(sample.start, sample.end),
    })),
    trackId: 2,
  }
}
