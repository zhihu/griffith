import Stream from '../stream'
import Box from '../mp4Box'

export default function avc1(buffer) {
  const stream = new Stream(buffer)

  // reserved
  stream.readByte(4)
  stream.readByte(2)
  const dataReferenceIndex = stream.readByte(2)
  // preDefined
  stream.readByte(2)
  // reserved
  stream.readByte(2)
  // preDefined
  stream.readByte(4)
  stream.readByte(4)
  stream.readByte(4)
  const width = stream.readByte(2)
  const height = stream.readByte(2)
  const horizresolution = stream.readByte(4)
  const vertresolution = stream.readByte(4)
  // reserved
  stream.readByte(4)
  const frameCount = stream.readByte(2)
  const compressorname = stream.readType(32)
  const depth = stream.readByte(2)
  // preDefined
  stream.readByte(2)

  const avcCBuffer = stream.buffer.slice(78)
  const newStream = new Stream(avcCBuffer)
  const MP4Box = new Box()

  MP4Box.readSize(newStream)
  MP4Box.readType(newStream)
  MP4Box.readBody(newStream)
  const avcCBox = MP4Box.box

  const avc1Box = {
    dataReferenceIndex,
    width,
    height,
    horizresolution,
    vertresolution,
    frameCount,
    compressorname,
    depth,
    avcC: avcCBox,
  }

  return avc1Box
}
