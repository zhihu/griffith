import stts from '../stts'

describe('stts box', () => {
  it('should get the stts box tree', () => {
    // prettier-ignore
    const sttsBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount
      0x00, 0x00, 0x00, 0xfb,  // sampleCount
      0x00, 0x00, 0x02, 0x00,  // sampleDeltas
    ])

    expect(stts(sttsBody)).toEqual({
      flags: 0,
      version: 0,
      samples: [{sampleCount: 251, sampleDelta: 512}],
    })
  })
})
