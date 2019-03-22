import Stream from '../stream'

export default function vmhd(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const graphicsmode = stream.readByte(2)
  const opcolor = new Array(3).fill(stream.readByte(2))

  const vmhdBox = {
    version,
    flags,
    graphicsmode,
    opcolor,
  }

  return vmhdBox
}
