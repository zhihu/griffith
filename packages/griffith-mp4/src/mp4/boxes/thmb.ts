import Stream from '../stream'

export default function thmb(buffer: any) {
  const stream = new Stream(buffer)

  const data = stream.readByte(buffer.length)

  const thmbBox = {
    data,
  }

  return thmbBox
}
