import Stream from '../stream'
import Box from '../mp4Box'

export default function mp4a(buffer) {
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
  const channelCount = stream.readByte(2)
  const sampleSize = stream.readByte(2)

  // reserved
  stream.readByte(4)
  const sampleRate = stream.readByte(4) / (1 << 16)

  const esdsBuffer = stream.buffer.slice(28)
  const newStream = new Stream(esdsBuffer)
  const MP4Box = new Box()

  MP4Box.readSize(newStream)
  MP4Box.readType(newStream)
  MP4Box.readBody(newStream)
  const esdsBox = MP4Box.box

  const mp4aBox = {
    dataReferenceIndex,
    channelCount,
    sampleSize,
    sampleRate,
    esds: esdsBox,
  }

  return mp4aBox
}
