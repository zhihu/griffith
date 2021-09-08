import Stream from '../stream'

export default function meta(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const metaBox = {
    version,
    flags,
  }

  return metaBox
}
