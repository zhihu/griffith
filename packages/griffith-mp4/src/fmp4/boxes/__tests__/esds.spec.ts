import esds from '../esds'

describe('esds', () => {
  it('should get esds box buffer', () => {
    // prettier-ignore
    expect(esds({audioConfig: [18, 16]})).toEqual(new Uint8Array([
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
