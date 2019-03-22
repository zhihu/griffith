import stss from '../stss'

describe('stss box', () => {
  it('should get the stss box tree', () => {
    // prettier-ignore
    const stssBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x02,  // entryCount
      0x00, 0x00, 0x00, 0x01,  // sampleNumber
      0x00, 0x00, 0x00, 0xe6,
    ])

    expect(stss(stssBody)).toEqual({
      flags: 0,
      version: 0,
      samples: [{sampleNumber: 1}, {sampleNumber: 230}],
    })
  })
})
