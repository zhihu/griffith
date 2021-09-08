import mdhd from '../mdhd'

describe('mdhd box', () => {
  it('should get the mdhd box tree', () => {
    // prettier-ignore
    const mdhdBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x00,  // creationTime
      0x00 ,0x00, 0x00, 0x00,  // modificationTime
      0x00, 0x00, 0x32, 0x00,  // timescale
      0x00, 0x01, 0xf6, 0x00,  // duration
      0x55, 0xc4,              // language
      0x00, 0x00,              // preDefined
    ])

    expect(mdhd(mdhdBody)).toEqual({
      creationTime: 0,
      duration: 128512,
      flags: 0,
      languageString: 'und',
      modificationTime: 0,
      timescale: 12800,
      version: 0,
    })
  })
})
