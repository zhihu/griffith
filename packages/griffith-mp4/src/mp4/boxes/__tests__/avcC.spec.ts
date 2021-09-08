import avcC from '../avcC'

describe('avcC box', () => {
  it('should get the avcC box tree', () => {
    // prettier-ignore
    const avcCBody = new Uint8Array([
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
    expect(avcC(avcCBody)).toEqual({
      AVCLevelIndication: 30,
      AVCProfileIndication: 77,
      configurationVersion: 1,
      profileCompatibility: 64,
      lengthSizeMinusOne: 3,
      SPS: [
        103,
        77,
        64,
        30,
        236,
        160,
        184,
        40,
        208,
        128,
        0,
        0,
        3,
        0,
        128,
        0,
        0,
        25,
        7,
        139,
        22,
        203,
      ],
      PPS: [104, 235, 239, 32],
    })
  })
})
