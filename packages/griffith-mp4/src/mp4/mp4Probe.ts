import {Mp4BoxTree, Interval, TimeOffsetInterval} from './types'
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
  audioInterval?: TimeOffsetInterval
  videoInterval?: TimeOffsetInterval
  bufferStart: any
  mp4BoxTree: Mp4BoxTree
  mp4Data: any
  timeRange!: Interval
  constructor(mp4BoxTree: Mp4BoxTree) {
    this.mp4BoxTree = mp4BoxTree
    this.mp4Data = {}
    this.init()
  }

  updateInterval = (time: number) => {
    const {videoTimescale, audioTimescale} = this.mp4Data

    if (typeof time === 'number') {
      this.videoInterval = getVideoSamplesInterval(
        this.mp4BoxTree,
        time * videoTimescale
      )
    } else {
      this.videoInterval = getNextVideoSamplesInterval(
        this.mp4BoxTree,
        this.videoInterval!.offsetInterVal[1]
      )
    }

    this.audioInterval = getAudioSamplesInterval(
      this.mp4BoxTree,
      this.videoInterval
    )

    const videoTimeRange = this.videoInterval.timeInterVal.map(
      (time) => time / videoTimescale
    )
    const audioTimeRange = this.audioInterval.timeInterVal.map(
      (time) => time / audioTimescale
    )

    this.timeRange = [
      Math.min(videoTimeRange[0], audioTimeRange[0]),
      Math.max(videoTimeRange[1], audioTimeRange[1]),
    ]
  }

  isDraining = (time: number) =>
    time > (this.timeRange[1] - this.timeRange[0]) / 4 + this.timeRange[0]

  getFragmentPosition = (time: number) => {
    this.updateInterval(time)

    this.bufferStart = getBufferStart(
      this.mp4BoxTree,
      this.videoInterval!.offsetInterVal[0],
      this.audioInterval!.offsetInterVal[0]
    )

    const {videoSamples, audioSamples} = this.getSamples()
    const stcoBox = findBox(this.mp4BoxTree, 'videoStco')

    let videoSamplesStart = 0
    if (videoSamples.length > 0) {
      videoSamplesStart = videoSamples[videoSamples.length - 1].start
    }
    const isLastFragmentPosition =
      videoSamplesStart + videoSamples[videoSamples.length - 1].bufferStart ===
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
      this.videoInterval!.offsetInterVal
    )

    const audioSamples = getAudioSamples(
      this.mp4BoxTree,
      this.bufferStart,
      this.audioInterval!.offsetInterVal
    )

    return {
      videoSamples,
      audioSamples,
    }
  }

  getTrackInfo = (mdatBuffer: ArrayBuffer) => {
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

    const {channelCount, sampleRate} = findBox(this.mp4BoxTree, 'mp4a')
    const {timescale: audioTimescale, duration: audioDuration} = findBox(
      this.mp4BoxTree,
      'audioMdhd'
    )

    const {
      ESDescrTag: {
        DecSpecificDescrTag: {audioConfig},
      },
    } = findBox(this.mp4BoxTree, 'esds')

    this.mp4Data = {
      duration,
      timescale,
      channelCount,
      sampleRate,
      audioConfig,
      audioDuration,
      audioTimescale,
    }

    const hasVideoStream = findBox(this.mp4BoxTree, 'videoTrak')
    if (hasVideoStream) {
      const {width, height} = findBox(this.mp4BoxTree, 'videoTkhd')
      const {samples} = findBox(this.mp4BoxTree, 'videoStsz')
      const {SPS, PPS} = findBox(this.mp4BoxTree, 'avcC')
      const {timescale: videoTimescale, duration: videoDuration} = findBox(
        this.mp4BoxTree,
        'videoMdhd'
      )

      this.mp4Data = {
        ...this.mp4Data,
        width,
        height,
        SPS,
        PPS,
        videoDuration,
        videoTimescale,
        videoSamplesLength: samples.length,
      }
    }
  }
}
