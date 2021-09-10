import Stream from '../stream'

const TAGS = [
  null,
  null,
  null,
  'ESDescrTag',
  'DecoderConfigDescrTag',
  'DecSpecificDescrTag',
]

export default function esds(buffer) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const type = TAGS[stream.readByte(1)]
  const esdsBox = {
    version,
    flags,
    [type]: getESDescrTag(stream),
  }

  return esdsBox
}

function getESDescrTag(stream) {
  const data = {}

  let size = stream.readByte(1)
  if (size === 0x80) {
    stream.readByte(2)
    size = stream.readByte(1) + 5
  } else {
    size += 2
  }

  data.size = size
  data.ESID = stream.readByte(2)
  data.streamPriority = stream.readByte(1)

  data[TAGS[stream.readByte(1)]] = getDecoderConfigDescrTag(stream)
  data[TAGS[stream.readByte(1)]] = getDecSpecificDescrTag(stream)
  return data
}

function getDecoderConfigDescrTag(stream) {
  const data = {}

  let size = stream.readByte(1)
  if (size === 0x80) {
    stream.readByte(2)
    size = stream.readByte(1) + 5
  } else {
    size += 2
  }

  data.size = size
  data.objectTypeIndication = stream.readByte(1)
  const type = stream.readByte(1)
  data.streamType = type & ((1 << 7) - 1)
  data.upStream = type & (1 << 1)
  data.bufferSize = stream.readByte(3)
  data.maxBitrate = stream.readByte(4)
  data.avgBitrate = stream.readByte(4)

  return data
}

function getDecSpecificDescrTag(stream) {
  const data = {}
  let size = stream.readByte(1)
  let dataSize = size
  if (size === 0x80) {
    stream.readByte(2)
    size = stream.readByte(1) + 5
    dataSize = size - 5
  } else {
    size += 2
  }

  data.size = size
  const EScode = []
  for (let i = 0; i < dataSize; i++) {
    EScode.push(
      Number(stream.readByte(1))
        .toString(16)
        .padStart(2, '0')
    )
  }
  data.audioConfig = EScode.map(item => Number(`0x${item}`))

  return data
}
