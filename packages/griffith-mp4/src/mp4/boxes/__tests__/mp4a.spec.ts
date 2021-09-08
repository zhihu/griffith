import mp4a from '../mp4a'

describe('mp4a box', () => {
  it('should get the mp4a box tree', () => {
    // prettier-ignore
    const mp4aBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // reserved
      0x00, 0x00,              // reserved
      0x00, 0x01,              // dataReferenceIndex
      0x00, 0x00,              // preDefined
      0x00, 0x00,              // reserved
      0x00, 0x00, 0x00, 0x00,  // preDefined
      0x00, 0x02,              // channelCount
      0x00, 0x10,              // sampleSize
      0x00, 0x00, 0x00, 0x00,  // reserved
      0xac, 0x44, 0x00, 0x00,  // sampleRate

      // esds
      0x00, 0x00, 0x00, 0x33,  // size
      0x65, 0x73, 0x64, 0x73,  // type: esds
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
    ])

    expect(mp4a(mp4aBody)).toEqual({
      channelCount: 2,
      dataReferenceIndex: 1,
      sampleRate: 44100,
      sampleSize: 16,
      esds: {
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
      },
    })
  })
})
