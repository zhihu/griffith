import Stream from '../stream'

export default function mdhd(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const creationTime = stream.readByte(4)
  const modificationTime = stream.readByte(4)
  const timescale = stream.readByte(4)
  const duration = stream.readByte(4)
  const language = stream.readByte(2)

  const field = []
  field[0] = (language >> 10) & 0x1f
  field[1] = (language >> 5) & 0x1f
  field[2] = language & 0x1f
  const languageString = String.fromCharCode(
    0x60 + field[0],
    0x60 + field[1],
    0x60 + field[2]
  )

  // preDefined
  stream.readByte(2)
  const mdhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    timescale,
    duration,
    languageString,
  }

  return mdhdBox
}
