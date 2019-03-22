import Stream from '../stream'

export default function stco(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)
  const samples = []

  for (let i = 0; i < entryCount; i++) {
    samples.push({chunkOffset: stream.readByte(4)})
  }

  const stcoBox = {
    version,
    flags,
    samples,
  }

  return stcoBox
}
