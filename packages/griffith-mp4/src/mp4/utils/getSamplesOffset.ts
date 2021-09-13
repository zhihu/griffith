import {TypeBoxMap} from './findBox'

export default function getSamplesOffset(
  stszBox: ReturnType<TypeBoxMap['videoStsz']>,
  stscBoxSamplesPerChunkArray: number[]
) {
  const samplesOffset: number[] = []
  for (let i = 0, j = 0; i < stscBoxSamplesPerChunkArray.length; i++) {
    if (i + j >= stszBox.samples.length) {
      break
    }

    samplesOffset.push(stszBox.samples[i + j].entrySize)
    if (stscBoxSamplesPerChunkArray[i] !== 1) {
      for (let flag = 1; flag < stscBoxSamplesPerChunkArray[i]; flag++) {
        const offset =
          stszBox.samples[i + flag + j].entrySize +
          samplesOffset[i + flag - 1 + j]
        samplesOffset.push(offset)
      }
      j = j + stscBoxSamplesPerChunkArray[i] - 1
    }
  }

  return samplesOffset
}
