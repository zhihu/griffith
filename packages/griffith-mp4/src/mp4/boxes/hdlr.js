import Stream from '../stream'

export default function hdlr(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  // preDefined
  stream.readByte(4)
  const handlerType = stream.readType().toString()

  const handlerType2 = stream.readType().toString()

  // reserved
  stream.readByte(4)
  stream.readByte(4)
  const name = []
  let c
  while ((c = stream.readByte(1)) !== 0x00) {
    name.push(String.fromCharCode(c))
  }

  const hdlrBox = {
    version,
    flags,
    handlerType,
    handlerType2: handlerType2 || 0,
    name: name.join(''),
  }

  return hdlrBox
}
