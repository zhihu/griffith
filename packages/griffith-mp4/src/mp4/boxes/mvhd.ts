import Stream from '../stream'

export default function mvhd(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)
  const creationTime = stream.readByte(4)
  const modificationTime = stream.readByte(4)
  const timescale = stream.readByte(4)
  const duration = stream.readByte(4)
  const rate = stream.readByte(4)
  const volume = stream.readByte(1)

  // reserved
  stream.readByte(3)
  stream.readByte(4)
  stream.readByte(4)

  const matrix = []
  for (let i = 0; i < 36; i += 4) {
    matrix.push(stream.readByte(4))
  }

  // preDefined
  for (let i = 0; i < 24; i += 4) {
    stream.readByte(4)
  }

  const nextTrackID = stream.readByte(4)

  const mvhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    timescale,
    duration,
    rate,
    volume,
    matrix,
    nextTrackID,
  }

  return mvhdBox
}
