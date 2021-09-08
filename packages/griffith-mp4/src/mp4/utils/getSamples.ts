import cloneDeep from 'lodash/cloneDeep'
import findBox from './findBox'
import getPerChunkArray from './getPerChunkArray'
import getSamplesOffset from './getSamplesOffset'

export function getVideoSamples(
  mp4BoxTree: any,
  bufferStart: any,
  offsetInterVal: any
) {
  const cttsBox = cloneDeep(findBox(mp4BoxTree, 'videoCtts'))

  const compositionTimeOffset = []

  if (cttsBox) {
    for (let i = 0; i < cttsBox.samples.length; i++) {
      compositionTimeOffset.push(cttsBox.samples[i].sampleOffset)
      if (cttsBox.samples[i].sampleCount !== 1) {
        cttsBox.samples[i].sampleCount--
        i--
      }
    }
  }

  return getSamples(
    mp4BoxTree,
    bufferStart,
    offsetInterVal,
    compositionTimeOffset
  )
}

export function getAudioSamples(
  mp4BoxTree: any,
  bufferStart: any,
  offsetInterVal: any
) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  return getSamples(mp4BoxTree, bufferStart, offsetInterVal)
}

function getSamples(
  mp4BoxTree: any,
  bufferStart: any,
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'offsetStart' implicitly has an 'a... Remove this comment to see the full error message
  [offsetStart, offsetEnd],
  compositionTimeOffset: any
) {
  const samples = []
  const sttsBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStts' : 'audioStts'
  )
  const stszBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStsz' : 'audioStsz'
  )
  const stcoBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStco' : 'audioStco'
  )
  const stscBox = cloneDeep(
    findBox(mp4BoxTree, compositionTimeOffset ? 'videoStsc' : 'audioStsc')
  )
  const stscBoxSamplesPerChunkArray = getPerChunkArray(stscBox, offsetEnd)

  const samplesOffset = getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray)

  const sttsFormatBox: any = []
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sampleCount, sampleDelta} = sttsBox.samples[i]
    sttsFormatBox.push({
      sampleCount:
        sampleCount +
        (sttsFormatBox[i - 1] ? sttsFormatBox[i - 1].sampleCount : 0),
      sampleDelta,
    })
  }

  // 算法不太好，可以和下面 for 循环结合，用双指针来做
  // FIXME
  const chunkOffsetArray = []
  for (let i = 0; i < stscBoxSamplesPerChunkArray.length; i++) {
    for (let j = 0; j < stscBoxSamplesPerChunkArray[i]; j++) {
      const sample = stcoBox.samples[i]
      chunkOffsetArray.push(
        sample
          ? sample.chunkOffset
          : stcoBox.samples[stcoBox.samples.length - 1].chunkOffset
      )
    }
  }

  for (let i = offsetStart; i < offsetEnd; i++) {
    const {entrySize: size} = stszBox.samples[i]

    const end = chunkOffsetArray[i] - bufferStart + samplesOffset[i]
    const start = end - size

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sample' implicitly has an 'any' type.
    const duration = sttsFormatBox.find((sample, idx) => {
      if (sttsFormatBox[idx - 1]) {
        return (
          i + 1 <= sample.sampleCount &&
          i + 1 > sttsFormatBox[idx - 1].sampleCount
        )
      } else {
        return i + 1 <= sample.sampleCount
      }
    }).sampleDelta

    samples.push({
      // 只有 video 有此字段，没有 B 帧的视频，compositionTimeOffset 为 0
      ...(compositionTimeOffset && {
        compositionTimeOffset: compositionTimeOffset.length
          ? compositionTimeOffset[i]
          : 0,
      }),
      duration,
      size,
      start,
      end,
      bufferStart,
    })
  }
  return samples
}
