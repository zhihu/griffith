import Stream from '../stream'

export default function stss(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const sampleSize = stream.readByte(4)
  const sampleCount = stream.readByte(4)
  const samples = []

  for (let i = 0; i < sampleCount; i++) {
    samples.push({entrySize: stream.readByte(4)})
  }

  const stssBox = {
    version,
    flags,
    sampleSize,
    samples,
  }

  return stssBox
}
