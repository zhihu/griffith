export default function getSamplesOffset(
  stszBox: any,
  stscBoxSamplesPerChunkArray: any
) {
  const samplesOffset = []
  for (let i = 0, j = 0; i < stscBoxSamplesPerChunkArray.length; i++) {
    if (i + j >= stszBox.samples.length) {
      break
    }

    samplesOffset.push(stszBox.samples[i + j].entrySize)
    if (stscBoxSamplesPerChunkArray[i] !== 1) {
      for (let flag = 1; flag < stscBoxSamplesPerChunkArray[i]; flag++) {
        // @ts-expect-error ts-migrate(7022) FIXME: 'offset' implicitly has type 'any' because it does... Remove this comment to see the full error message
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
