import {
  findBox,
  getBufferStart,
  getFragmentPosition,
  getVideoTrackInfo,
  getAudioTrackInfo,
  getVideoSamples,
  getAudioSamples,
  getAudioSamplesInterval,
  getVideoSamplesInterval,
  getNextVideoSamplesInterval,
} from './utils'

export default class MP4Probe {
  constructor(mp4BoxTree) {
    this.mp4BoxTree = mp4BoxTree
    this.mp4Data = {}
    this.init()
  }

  updateInterval = time => {
    const {videoTimescale, audioTimescale} = this.mp4Data

    if (typeof time === 'number') {
      this.videoInterval = getVideoSamplesInterval(
        this.mp4BoxTree,
        time * videoTimescale
      )
    } else {
      this.videoInterval = getNextVideoSamplesInterval(
        this.mp4BoxTree,
        this.videoInterval.offsetInterVal[1]
      )
    }

    this.audioInterval = getAudioSamplesInterval(
      this.mp4BoxTree,
      this.videoInterval
    )

    const videoTimeRange = this.videoInterval.timeInterVal.map(
      time => time / videoTimescale
    )
    const audioTimeRange = this.audioInterval.timeInterVal.map(
      time => time / audioTimescale
    )

    this.timeRange = [
      Math.min(videoTimeRange[0], audioTimeRange[0]),
      Math.max(videoTimeRange[1], audioTimeRange[1]),
    ]
  }

  isDraining = time =>
    time > (this.timeRange[1] - this.timeRange[0]) / 4 + this.timeRange[0]

  getFragmentPosition = time => {
    this.updateInterval(time)

    this.bufferStart = getBufferStart(
      this.mp4BoxTree,
      this.videoInterval.offsetInterVal[0],
      this.audioInterval.offsetInterVal[0]
    )

    const {videoSamples, audioSamples} = this.getSamples()
    const stcoBox = findBox(this.mp4BoxTree, 'videoStco')
    const isLastFragmentPosition =
      videoSamples[videoSamples.length - 1].start +
        videoSamples[videoSamples.length - 1].bufferStart ===
      stcoBox.samples[stcoBox.samples.length - 1].chunkOffset

    return getFragmentPosition(
      videoSamples,
      audioSamples,
      this.bufferStart,
      isLastFragmentPosition
    )
  }

  getSamples = () => {
    const videoSamples = getVideoSamples(
      this.mp4BoxTree,
      this.bufferStart,
      this.videoInterval.offsetInterVal
    )

    const audioSamples = getAudioSamples(
      this.mp4BoxTree,
      this.bufferStart,
      this.audioInterval.offsetInterVal
    )

    return {
      videoSamples,
      audioSamples,
    }
  }

  getTrackInfo = mdatBuffer => {
    const {videoSamples, audioSamples} = this.getSamples()
    const videoTrackInfo = getVideoTrackInfo(videoSamples, mdatBuffer)
    const audioTrackInfo = getAudioTrackInfo(audioSamples, mdatBuffer)

    return {
      videoTrackInfo,
      audioTrackInfo,
    }
  }

  init() {
    this.getMP4Data()
  }

  getMP4Data() {
    const {duration, timescale} = findBox(this.mp4BoxTree, 'mvhd')
    const {width, height} = findBox(this.mp4BoxTree, 'videoTkhd')
    const {samples} = findBox(this.mp4BoxTree, 'videoStsz')
    const {SPS, PPS} = findBox(this.mp4BoxTree, 'avcC')
    const {channelCount, sampleRate} = findBox(this.mp4BoxTree, 'mp4a')
    const {timescale: audioTimescale, duration: audioDuration} = findBox(
      this.mp4BoxTree,
      'audioMdhd'
    )
    const {timescale: videoTimescale, duration: videoDuration} = findBox(
      this.mp4BoxTree,
      'videoMdhd'
    )
    const {
      ESDescrTag: {
        DecSpecificDescrTag: {audioConfig},
      },
    } = findBox(this.mp4BoxTree, 'esds')

    this.mp4Data = {
      duration,
      timescale,
      width,
      height,
      SPS,
      PPS,
      channelCount,
      sampleRate,
      audioConfig,
      audioDuration,
      videoDuration,
      audioTimescale,
      videoTimescale,
      videoSamplesLength: samples.length,
    }
  }
}
