import {TypeBoxMap} from './findBox'

export default function getPerChunkArray(
  stscBox: ReturnType<TypeBoxMap['videoStsc']>,
  end: number
) {
  const stscBoxSamplesPerChunkArray = []
  const stscSamplesLength = stscBox.samples.length

  // stsc box
  // firstChunk         1  3  6  7
  // samplesPerChunk    1  2  1  2
  // ↓
  // [1,1,2,2,2,1,2,2]
  for (let i = 0; i < end; i++) {
    if (
      i !== 0 &&
      i < stscSamplesLength &&
      stscBox.samples[i].firstChunk - 1 !== stscBox.samples[i - 1].firstChunk
    ) {
      i--
      stscBox.samples[i].firstChunk++
    }

    // 处理最后一位不是 end 时的情况
    if (i >= stscSamplesLength) {
      // @ts-expect-error semantic error TS2367: This condition will always return 'true'
      if (stscBox.samples[stscSamplesLength - 1] !== 1) {
        i = i + stscBox.samples[stscSamplesLength - 1].samplesPerChunk - 1
      }
      stscBoxSamplesPerChunkArray.push(
        stscBox.samples[stscSamplesLength - 1].samplesPerChunk
      )
    } else {
      stscBoxSamplesPerChunkArray.push(stscBox.samples[i].samplesPerChunk)
    }
  }

  return stscBoxSamplesPerChunkArray
}
