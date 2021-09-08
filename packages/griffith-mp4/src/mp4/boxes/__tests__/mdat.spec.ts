import mdat from '../mdat'

describe('mdat box', () => {
  it('should get the mdat box tree', () => {
    // prettier-ignore
    const mdatBody = new Uint8Array([
      0x00, 0x00, 0x1d, 0x1e,  // data
      0x65, 0x88, 0x84, 0x00,
      // ...
    ])

    expect(mdat(mdatBody)).toEqual({
      data: new Uint8Array([0, 0, 29, 30, 101, 136, 132, 0]),
    })
  })
})
