import Stream from '../stream'

export default function stss(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)
  const samples = []

  for (let i = 0; i < entryCount; i++) {
    samples.push({sampleNumber: stream.readByte(4)})
  }

  const stssBox = {
    version,
    flags,
    samples,
  }

  return stssBox
}
