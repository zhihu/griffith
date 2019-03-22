import dref from '../dref'

describe('dref box', () => {
  it('should get the dref box tree', () => {
    // prettier-ignore
    const drefBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount

      // url
      0x00, 0x00, 0x00, 0x0c,  // size
      0x75, 0x72, 0x6c, 0x20,  // type: url
      0x00, 0x00, 0x00, 0x01,  // version + flags
    ])

    expect(dref(drefBody)).toEqual({
      flags: 0,
      version: 0,
      url: [
        {
          flags: 1,
          version: 0,
        },
      ],
    })
  })
})
