import mp4a from '../mp4a'
import {audioData} from './__mocks__/data'

describe('mp4a', () => {
  it('should get mp4a box buffer', () => {
    // prettier-ignore
    expect(mp4a(audioData)).toEqual(new Uint8Array([
      0x00, 0x00, 0x00, 0x4B,   // size
      0x6D, 0x70, 0x34, 0x61,   // mp4a
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00,
      0x00, 0x01,               // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x02,
      0x00, 0x10,               // sampleSize
      0x00, 0x00, 0x00, 0x00,
      0xAC,                     // Audio sample rate
      0x44,
      0x00, 0x00,

      // esds
      0x00, 0x00, 0x00, 0x27,   // size
      0x65, 0x73, 0x64, 0x73,   // esds
      0x00, 0x00, 0x00, 0x00,   // version + flag
      0x03,                     // DecoderSpecificInfo
      0x19,                     // length
      0x00, 0x01,               // es_id
      0x00,                     // stream_priority
      0x04,                     // DecoderConfigDescrTag
      0x11,                     // length
      0x40,                     // codec
      0x15,                     // stream_type
      0x00, 0x00, 0x00,         // buffer_size
      0x00, 0x00, 0x00, 0x00,   // maxBitrate
      0x00, 0x00, 0x00, 0x00,   // avgBitrate
      0x05,                     // DecSpecificInfoTag
      0x02,                     // configlen
      0x12, 0x10,               // config
      0x06, 0x01, 0x02,         // GASpecificConfig
    ]))
  })
})
