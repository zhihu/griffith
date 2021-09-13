import {generateBox, generateVersionAndFlags} from '../utils'

export default function esds(data: {audioConfig: number[]}) {
  const {audioConfig: config = [43, 146, 8, 0]} = data
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),
    0x03, // DecoderSpecificInfo
    0x17 + config.length, // length
    0x00, 0x01, // es_id
    0x00, // stream_priority
    0x04, // DecoderConfigDescrTag
    0x0f + config.length, // length
    0x40, // codec
    0x15, // stream_type
    0x00, 0x00, 0x00, // buffer_size
    0x00, 0x00, 0x00, 0x00, // maxBitrate
    0x00, 0x00, 0x00, 0x00, // avgBitrate
    0x05, // DecSpecificInfoTag
    config.length,  // configlen
    ...config,
    0x06, 0x01, 0x02,  // GASpecificConfig
  ])
  return generateBox('esds', content)
}
