import Stream from '../stream'

export default function tkhd(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const creationTime = stream.readByte(4)
  const modificationTime = stream.readByte(4)
  const trackID = stream.readByte(4)
  // reserved
  stream.readByte(4)
  const duration = stream.readByte(4)
  // reserved
  stream.readByte(4)
  stream.readByte(4)
  const layer = stream.readByte(2)
  const alternateGroup = stream.readByte(2)
  const volume = stream.readByte(2)
  // reserved
  stream.readByte(2)

  const matrix = []
  for (let i = 0; i < 36; i += 4) {
    matrix.push(stream.readByte(4))
  }
  const width = Number(`${stream.readByte(2)}.${stream.readByte(2)}`)
  const height = Number(`${stream.readByte(2)}.${stream.readByte(2)}`)
  const tkhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    trackID,
    duration,
    layer,
    alternateGroup,
    volume,
    matrix,
    width,
    height,
  }

  return tkhdBox
}
