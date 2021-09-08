import Stream from '../stream'

export default function smhd(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push(stream.readByte(1))
  }

  const smhdBox = {
    version,
    flags,
    data,
  }

  return smhdBox
}
