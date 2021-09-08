import Stream from '../stream'

export default function ctts(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)
  const samples = []

  for (let i = 0; i < entryCount; i++) {
    samples.push({
      sampleCount: stream.readByte(4),
      sampleOffset: stream.readByte(4),
    })
  }

  const cttsBox = {
    version,
    flags,
    samples,
  }

  return cttsBox
}
