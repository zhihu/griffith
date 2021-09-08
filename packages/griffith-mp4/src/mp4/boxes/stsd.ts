import Stream from '../stream'
import Box from '../mp4Box'

export default function stsd(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const entryCount = stream.readByte(4)

  const box = []
  const avc1Buffer = stream.buffer.slice(8)
  const newStream = new Stream(avc1Buffer)
  const MP4Box = new Box()
  let type = 'avc1'

  for (let i = 0; i < entryCount; i++) {
    MP4Box.readSize(newStream)
    MP4Box.readType(newStream)
    MP4Box.readBody(newStream)
    box.push(MP4Box.box)
    type = MP4Box.type
  }

  const stsdBox = {
    version,
    flags,
    [type]: box,
  }

  return stsdBox
}
