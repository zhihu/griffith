import cloneDeep from 'lodash/cloneDeep'
import {findBox, getDuration} from '.'

export function getVideoSamplesInterval(mp4BoxTree, time = 0) {
  const stssBox = cloneDeep(findBox(mp4BoxTree, 'videoStss'))
  const sttsBox = cloneDeep(findBox(mp4BoxTree, 'videoStts'))
  const stszBox = findBox(mp4BoxTree, 'videoStsz')
  const duration = getDuration(sttsBox, stszBox.samples.length)

  const intervalArray = stssBox.samples.map(sample => sample.sampleNumber - 1)
  const timeInterval = intervalArray.map(interval =>
    getDuration(sttsBox, interval)
  )

  const interval = {
    offsetInterVal: [],
    timeInterVal: [],
  }
  for (let i = 0; i < timeInterval.length; i++) {
    const start = timeInterval[i]
    const end = timeInterval[i + 1] ? timeInterval[i + 1] : duration

    if (start <= time && time < end) {
      const offsetStart = intervalArray[i]
      const offsetEnd =
        intervalArray[i + 1] !== undefined
          ? intervalArray[i + 1]
          : stszBox.samples.length
      interval.offsetInterVal.push(offsetStart, offsetEnd)
      interval.timeInterVal.push(start, end)
      break
    }
  }

  return interval
}

export function getAudioSamplesInterval(mp4BoxTree, videoInterval) {
  const {
    timeInterVal: [startTime, endTime],
    offsetInterVal,
  } = videoInterval
  const sttsBox = cloneDeep(findBox(mp4BoxTree, 'audioStts'))
  const {timescale: audioTimescale} = findBox(mp4BoxTree, 'audioMdhd')
  const {timescale: videoTimescale} = findBox(mp4BoxTree, 'videoMdhd')
  const videoStszBox = findBox(mp4BoxTree, 'videoStsz')
  const audioStszBox = findBox(mp4BoxTree, 'audioStsz')
  const audioElstBox = findBox(mp4BoxTree, 'audioElst')

  const audioStartTime = (startTime / videoTimescale) * audioTimescale
  const audioEndTime = (endTime / videoTimescale) * audioTimescale

  let start = 0
  let end = 0

  const {mediaTime, segmentDuration} = audioElstBox.entries[0]
  let startDuration = mediaTime !== -1 ? mediaTime : segmentDuration
  let endDuration = 0
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sampleCount, sampleDelta} = sttsBox.samples[i]
    for (let j = 0; j < sampleCount; j++) {
      if (startDuration <= audioStartTime && audioStartTime !== 0) {
        startDuration += sampleDelta
        start++
      }

      if (endDuration <= audioEndTime) {
        endDuration += sampleDelta
        end++
      }
    }
  }

  // 如果是 video 的最后一个片段，也就是 audio 的最有一个片段
  // 使用 stsz 的长度来判断
  let audioEnd
  if (offsetInterVal[1] === videoStszBox.samples.length) {
    audioEnd = audioStszBox.samples.length
  }
  const interval = {
    offsetInterVal: [start, audioEnd ? audioEnd : end],
    timeInterVal: [startDuration, endDuration],
  }

  return interval
}

export function getNextVideoSamplesInterval(mp4BoxTree, sample) {
  const stssBox = cloneDeep(findBox(mp4BoxTree, 'videoStss'))
  const intervalArray = stssBox.samples.map(sample => sample.sampleNumber - 1)
  const sttsBox = cloneDeep(findBox(mp4BoxTree, 'videoStts'))
  const stszBox = findBox(mp4BoxTree, 'videoStsz')
  const sampleCount = stszBox.samples.length
  const duration = getDuration(sttsBox, sampleCount)

  const timeInterval = intervalArray.map(interval =>
    getDuration(sttsBox, interval)
  )
  let result = []
  if (sample + 1 > intervalArray[intervalArray.length - 1]) {
    result = {
      offsetInterVal: [intervalArray[intervalArray.length - 1], sampleCount],
      timeInterVal: [timeInterval[intervalArray.length - 1], duration],
    }
  }
  for (let i = 0; i < intervalArray.length; i++) {
    if (intervalArray[i] < sample + 1 && intervalArray[i + 1] >= sample + 1) {
      result = {
        offsetInterVal: [intervalArray[i], intervalArray[i + 1]],
        timeInterVal: [timeInterval[i], timeInterval[i + 1]],
      }
      break
    }
  }
  return result
}
