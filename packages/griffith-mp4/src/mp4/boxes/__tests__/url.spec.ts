import url from '../url'

describe('url box', () => {
  it('should get the url box tree', () => {
    // prettier-ignore
    const urlBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x01,  // version + flags
    ])

    expect(url(urlBody)).toEqual({
      flags: 1,
      version: 0,
    })
  })
})
