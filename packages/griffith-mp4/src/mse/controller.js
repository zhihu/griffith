import FragmentFetch from '../fetch'
import MP4Parse from '../mp4/mp4Parse'
import MP4Probe from '../mp4/mp4Probe'
import FMP4 from '../fmp4/fmp4Generator'
import {concatTypedArray} from '../fmp4/utils'

const MAGIC_NUMBER = 20000

export default class MSE {
  constructor(video, src) {
    this.video = video
    this.src = src
    this.videoQueue = []
    this.audioQueue = []
    this.sourceBuffers = {
      video: null,
      audio: null,
    }
    this.mimeTypes = {
      video: 'video/mp4; codecs="avc1.42E01E"',
      audio: 'audio/mp4; codecs="mp4a.40.2"',
    }
    this.installSrc()
  }

  installSrc = () => {
    this.mediaSource = new MediaSource()
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen)
    this.video.src = URL.createObjectURL(this.mediaSource)
  }

  handleSourceOpen = () => {
    this.sourceBuffers.video = this.mediaSource.addSourceBuffer(
      this.mimeTypes.video
    )
    this.sourceBuffers.audio = this.mediaSource.addSourceBuffer(
      this.mimeTypes.audio
    )
    this.sourceBuffers.video.addEventListener('updateend', () => {
      const buffer = this.videoQueue.shift()

      if (buffer && this.mediaSource.readyState === 'open') {
        this.handleAppendBuffer(buffer, 'video')
      }
      if (this.needUpdateTime) {
        this.needUpdateTime = false
        this.handleTimeUpdate()
      }
    })

    this.sourceBuffers.audio.addEventListener('updateend', () => {
      const buffer = this.audioQueue.shift()

      if (buffer && this.mediaSource.readyState === 'open') {
        this.handleAppendBuffer(buffer, 'audio')
      }
    })
  }

  handleAppendBuffer = (buffer, type) => {
    if (this.mediaSource.readyState === 'open') {
      this.sourceBuffers[type].appendBuffer(buffer)
    } else {
      this[`${type}Queue`].push(buffer)
    }
  }

  init() {
    // 获取 mdat 外的数据
    this.loadData()
      .then(res => {
        return new MP4Parse(new Uint8Array(res)).mp4BoxTreeObject
      })
      .then(mp4BoxTreeObject => {
        // 有可能 moov 在最后一个 box，导致我们第一次请求 0~MAGIC_NUMBER 没有请求到 moov。
        const {moov, ftyp} = mp4BoxTreeObject
        if (!moov) {
          let moovStart = 0
          for (const box in mp4BoxTreeObject) {
            moovStart += mp4BoxTreeObject[box].size
          }
          return this.loadData(moovStart, '').then(res => {
            const {moov} = new MP4Parse(new Uint8Array(res)).mp4BoxTreeObject
            if (moov) {
              mp4BoxTreeObject.moov = moov
              return mp4BoxTreeObject
            }
          })
        } else {
          // 有可能视频较大，第一次请求没有请求到完整的 moov box
          const ftypAndMoovSize = moov.size + ftyp.size
          if (ftypAndMoovSize > MAGIC_NUMBER) {
            return this.loadData(ftyp.size, ftypAndMoovSize).then(res => {
              const {moov} = new MP4Parse(new Uint8Array(res)).mp4BoxTreeObject
              if (moov) {
                mp4BoxTreeObject.moov = moov
                return mp4BoxTreeObject
              }
            })
          }
        }

        return mp4BoxTreeObject
      })
      .then(mp4BoxTreeObject => {
        this.mp4Probe = new MP4Probe(mp4BoxTreeObject)
        this.mp4BoxTreeObject = mp4BoxTreeObject

        const videoRawData = concatTypedArray(
          FMP4.ftyp(),
          FMP4.moov(this.mp4Probe.mp4Data, 'video')
        )

        const audioRawData = concatTypedArray(
          FMP4.ftyp(),
          FMP4.moov(this.mp4Probe.mp4Data, 'audio')
        )

        this.mediaSource.addEventListener('sourceopen', () => {
          this.handleAppendBuffer(videoRawData, 'video')
          this.handleAppendBuffer(audioRawData, 'audio')
        })
      })
  }

  hasBufferedCache = (time = 0) => {
    const buffered = this.video.buffered

    if (buffered) {
      for (let i = 0; i < buffered.length; i++) {
        if (time >= buffered.start(i) && time <= buffered.end(i)) {
          return true
        }
      }
    }

    return false
  }

  seek = time => {
    FragmentFetch.clear()

    const [start, end] = this.mp4Probe.getFragmentPosition(time)

    // 对于已经请求的数据不再重复请求
    // No need to repeat request video data
    if (time && this.hasBufferedCache(this.video.currentTime)) {
      return
    }

    this.handleReplayCase()

    this.loadData(start, end).then(mdatBuffer => {
      if (!mdatBuffer) {
        return
      }
      const {videoTrackInfo, audioTrackInfo} = this.mp4Probe.getTrackInfo(
        mdatBuffer
      )
      const {videoInterval, audioInterval} = this.mp4Probe
      const videoBaseMediaDecodeTime = videoInterval.timeInterVal[0]
      const audioBaseMediaDecodeTime = audioInterval.timeInterVal[0]
      const videoRawData = concatTypedArray(
        FMP4.moof(videoTrackInfo, videoBaseMediaDecodeTime),
        FMP4.mdat(videoTrackInfo)
      )

      // maybe the last GOP dont have audio track
      // 最后一个 GOP 序列可能没有音频轨
      if (audioTrackInfo.samples.length !== 0) {
        const audioRawData = concatTypedArray(
          FMP4.moof(audioTrackInfo, audioBaseMediaDecodeTime),
          FMP4.mdat(audioTrackInfo)
        )
        this.handleAppendBuffer(audioRawData, 'audio')
      }

      this.handleAppendBuffer(videoRawData, 'video')

      if (time) {
        this.needUpdateTime = true
      }
    })
  }

  loadData(start = 0, end = MAGIC_NUMBER) {
    return new Promise(resolve => {
      new FragmentFetch(this.src, start, end, resolve)
    }).catch(() => {
      // catch cancel error
    })
  }

  handleTimeUpdate = () => {
    if (!this.mp4Probe) {
      return
    }
    const {
      videoInterval: {offsetInterVal = []} = [],
      mp4Data: {videoSamplesLength},
    } = this.mp4Probe

    if (this.mediaSource.readyState !== 'closed') {
      if (offsetInterVal[1] === videoSamplesLength) {
        this.destroy()
      } else if (this.shouldFetchNextSegment()) {
        this.seek()
      }
    }
  }

  handleReplayCase = () => {
    if (this.mediaSource.readyState === 'ended') {
      this.sourceBuffers.video.appendBuffer(new Uint8Array(0))
    }
  }

  shouldFetchNextSegment = () => {
    this.handleReplayCase()

    if (this.mp4Probe.isDraining(this.video.currentTime)) {
      return true
    }
    return false
  }

  destroy = () => {
    this.mediaSource.removeEventListener('sourceopen', this.handleSourceOpen)
    URL.revokeObjectURL(this.video.src)
    if (this.mediaSource.readyState === 'open') {
      this.mediaSource.endOfStream()
    }
  }
}
