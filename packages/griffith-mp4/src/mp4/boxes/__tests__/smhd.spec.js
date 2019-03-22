import smhd from '../smhd'

describe('smhd box', () => {
  it('should get the smhd box tree', () => {
    // prettier-ignore
    const smhdBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x00,  // data
    ])

    expect(smhd(smhdBody)).toEqual({
      flags: 0,
      version: 0,
      data: [0, 0, 0, 0],
    })
  })
})
