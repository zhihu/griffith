import Stream from '../stream'

export default function elst(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const entryCount = stream.readByte(4)
  const entries = []

  for (let i = 0; i < entryCount; ++i) {
    const segmentDuration = stream.readByte(4)
    const mediaTime = stream.readByte(4)
    const mediaRateInteger = stream.readByte(2)
    const mediaRateFraction = stream.readByte(2)

    entries.push({
      segmentDuration,
      mediaTime,
      mediaRateInteger,
      mediaRateFraction,
    })
  }

  const elstBox = {
    version,
    flags,
    entries,
  }

  return elstBox
}
