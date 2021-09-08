import stsc from '../stsc'

describe('stsc box', () => {
  it('should get the stsc box tree', () => {
    // prettier-ignore
    const stscBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount
      0x00, 0x00, 0x00, 0x01,  // firstChunk
      0x00, 0x00, 0x00, 0x01,  // samplesPerChunk
      0x00, 0x00, 0x00, 0x01,  // sampleDescriptionIndex
    ])
    expect(stsc(stscBody)).toEqual({
      flags: 0,
      samples: [
        {
          firstChunk: 1,
          sampleDescriptionIndex: 1,
          samplesPerChunk: 1,
        },
      ],
      version: 0,
    })
  })
})
