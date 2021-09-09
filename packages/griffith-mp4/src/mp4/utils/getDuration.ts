export default function getDuration(sttsBox: any, totalCount: number) {
  let count = 0
  let duration = 0
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sampleCount, sampleDelta} = sttsBox.samples[i]
    for (let j = 0; j < sampleCount; j++) {
      if (count < totalCount && totalCount !== 0) {
        duration += sampleDelta
        count++
      } else {
        return duration
      }
    }
  }
  return duration
}
