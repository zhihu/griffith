import elst from '../elst'

describe('elst box', () => {
  it('should get the elst box tree', () => {
    // prettier-ignore
    const elstBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount
      0x00, 0x00, 0x27, 0x38,  // segmentDuration
      0x00, 0x00, 0x04, 0x00,  // mediaTime
      0x00, 0x01,              // mediaRateInteger
      0x00, 0x00,              // mediaRateFraction
    ])
    expect(elst(elstBody)).toEqual({
      entries: [
        {
          mediaRateFraction: 0,
          mediaRateInteger: 1,
          mediaTime: 1024,
          segmentDuration: 10040,
        },
      ],
      flags: 0,
      version: 0,
    })
  })
})
