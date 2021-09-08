import stsd from '../stsd'

describe('stsd box', () => {
  it('should get the stsd box tree', () => {
    // prettier-ignore
    const stsdBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount

      // avc1
      0x00, 0x00, 0x00, 0x83,  // size
      0x61, 0x76, 0x63, 0x31,  // type
      0x00, 0x00, 0x00, 0x00,  // reserved
      0x00, 0x00,
      0x00, 0x01,              // dataReferenceIndex
      0x00, 0x00,              // preDefined
      0x00, 0x00,              // reserved
      0x00, 0x00, 0x00, 0x00,  // preDefined
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x01, 0x70,              // width
      0x02, 0x80,              // height
      0x00, 0x48, 0x00, 0x00,  // horizresolution
      0x00, 0x48, 0x00, 0x00,  // vertresolution
      0x00, 0x00, 0x00, 0x00,  // reserved
      0x00, 0x01,              // frameCount
      0x00, 0x00, 0x00, 0x00,  // compressorname
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x18,              // depth
      0xff, 0xff,              // preDefined

      // avcC
      0x00, 0x00, 0x00, 0x2d,  // size
      0x61, 0x76, 0x63, 0x43,  // type: avcC
      0x01,                    // configurationVersion
      0x4d,                    // AVCProfileIndication
      0x40,                    // profileCompatibility
      0x1e,                    // AVCLevelIndication
      0xff,                    // lengthSizeMinusOne
      0xe1,                    // numOfSequenceParameterSets
      0x00, 0x16,              // SPS length
      0x67, 0x4d, 0x40, 0x1e,  // SPS
      0xec, 0xa0, 0xb8, 0x28,
      0xd0, 0x80, 0x00, 0x00,
      0x03, 0x00, 0x80, 0x00,
      0x00, 0x19, 0x07, 0x8b,
      0x16, 0xcb,
      0x01,                    // numOfPictureParameterSets
      0x00, 0x04,              // PPS length
      0x68, 0xeb, 0xef, 0x20   // PPS
    ])

    expect(stsd(stsdBody)).toEqual({
      flags: 0,
      version: 0,
      avc1: [
        {
          compressorname: new Array(32).fill('\u0000').join(''),
          dataReferenceIndex: 1,
          depth: 24,
          frameCount: 1,
          height: 640,
          horizresolution: 4718592,
          vertresolution: 4718592,
          width: 368,
          avcC: {
            AVCLevelIndication: 30,
            AVCProfileIndication: 77,
            configurationVersion: 1,
            profileCompatibility: 64,
            lengthSizeMinusOne: 3,
            SPS: [
              103, 77, 64, 30, 236, 160, 184, 40, 208, 128, 0, 0, 3, 0, 128, 0,
              0, 25, 7, 139, 22, 203,
            ],
            PPS: [104, 235, 239, 32],
          },
        },
      ],
    })
  })
})
