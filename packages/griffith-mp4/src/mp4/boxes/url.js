import Stream from '../stream'

export default function url(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const urlBox = {
    version,
    flags,
  }

  return urlBox
}
