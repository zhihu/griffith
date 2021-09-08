import Stream from '../stream'

const TAGS = [
  null,
  null,
  null,
  'ESDescrTag',
  'DecoderConfigDescrTag',
  'DecSpecificDescrTag',
]

export default function esds(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const type = TAGS[stream.readByte(1)]
  const esdsBox = {
    version,
    flags,
    // @ts-expect-error ts-migrate(2464) FIXME: A computed property name must be of type 'string',... Remove this comment to see the full error message
    [type]: getESDescrTag(stream),
  }

  return esdsBox
}

function getESDescrTag(stream: any) {
  const data = {}

  let size = stream.readByte(1)
  if (size === 0x80) {
    stream.readByte(2)
    size = stream.readByte(1) + 5
  } else {
    size += 2
  }

  (data as any).size = size
  ;(data as any).ESID = stream.readByte(2)
  ;(data as any).streamPriority = stream.readByte(1)

  // @ts-expect-error ts-migrate(2538) FIXME: Type 'null' cannot be used as an index type.
  data[TAGS[stream.readByte(1)]] = getDecoderConfigDescrTag(stream)
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'null' cannot be used as an index type.
  data[TAGS[stream.readByte(1)]] = getDecSpecificDescrTag(stream)
  return data
}

function getDecoderConfigDescrTag(stream: any) {
  const data = {}

  let size = stream.readByte(1)
  if (size === 0x80) {
    stream.readByte(2)
    size = stream.readByte(1) + 5
  } else {
    size += 2
  }

  (data as any).size = size
  ;(data as any).objectTypeIndication = stream.readByte(1)
  const type = stream.readByte(1)
  ;(data as any).streamType = type & ((1 << 7) - 1)
  ;(data as any).upStream = type & (1 << 1)
  ;(data as any).bufferSize = stream.readByte(3)
  ;(data as any).maxBitrate = stream.readByte(4)
  ;(data as any).avgBitrate = stream.readByte(4)

  return data
}

function getDecSpecificDescrTag(stream: any) {
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

  (data as any).size = size
  const EScode = []
  for (let i = 0; i < dataSize; i++) {
    EScode.push(Number(stream.readByte(1)).toString(16).padStart(2, '0'))
  }
  (data as any).audioConfig = EScode.map((item) => Number(`0x${item}`))

  return data
}
