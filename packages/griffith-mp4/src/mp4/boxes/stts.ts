import Stream from '../stream'

export default function stts(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)
  const samples = []

  for (let i = 0; i < entryCount; i++) {
    const sampleCount = stream.readByte(4)
    const sampleDelta = stream.readByte(4)
    samples.push({
      sampleCount,
      sampleDelta,
    })
  }

  const sttsBox = {
    version,
    flags,
    samples,
  }

  return sttsBox
}
