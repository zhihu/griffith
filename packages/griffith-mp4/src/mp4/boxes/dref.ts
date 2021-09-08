import Stream from '../stream'
import Box from '../mp4Box'

export default function dref(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)

  const urlBox = []
  const urlBuffer = stream.buffer.slice(8)
  const newStream = new Stream(urlBuffer)
  const MP4Box = new Box()

  for (let i = 0; i < entryCount; i++) {
    MP4Box.readSize(newStream)
    MP4Box.readType(newStream)
    MP4Box.readBody(newStream)
    urlBox.push(MP4Box.box)
  }

  const drefBox = {
    version,
    flags,
    url: urlBox,
  }

  return drefBox
}
