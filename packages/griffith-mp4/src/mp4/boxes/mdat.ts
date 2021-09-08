import Stream from '../stream'

export default function mdat(buffer: any) {
  const stream = new Stream(buffer)

  const data = stream.buffer.subarray(stream.position, stream.buffer.length)

  const mdatBox = {
    data,
  }

  return mdatBox
}
