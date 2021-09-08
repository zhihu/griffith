import esds from '../esds'

describe('esds box', () => {
  it('should get the esds box tree', () => {
    // prettier-ignore
    const esdsBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x03,                    // ESDescrTag
      0x80, 0x80, 0x80, 0x22,  // ESDescrTag size
      0x00, 0x02,              // ESID
      0x00,                    // streamPriority
      0x04,                    // DecoderConfigDescrTag      
      0x80, 0x80, 0x80, 0x14,  // DecoderConfigDescrTag size
      0x40,                    // objectTypeIndication
      0x15,                    // streamType + upStream
      0x00, 0x00, 0x00,        // bufferSize
      0x00, 0x01, 0xf4, 0x00,  // maxBitrate
      0x00, 0x01, 0xf4, 0x00,  // avgBitrate
      0x05,                    // DecSpecificDescrTag
      0x80, 0x80, 0x80, 0x02,  // DecSpecificDescrTag size
      0x12, 0x10,              // audioConfig
      0x06, 0x80, 0x80, 0x80,
      0x01, 0x02
    ]);
    expect(esds(esdsBody)).toEqual({
      ESDescrTag: {
        DecSpecificDescrTag: {
          audioConfig: [18, 16],
          size: 7,
        },
        DecoderConfigDescrTag: {
          avgBitrate: 128000,
          bufferSize: 0,
          maxBitrate: 128000,
          objectTypeIndication: 64,
          size: 25,
          streamType: 21,
          upStream: 0,
        },
        ESID: 2,
        size: 39,
        streamPriority: 0,
      },
      flags: 0,
      version: 0,
    })
  })
})
