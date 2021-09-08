import Stream from '../stream'

export default function url(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const urlBox = {
    version,
    flags,
  }

  return urlBox
}
