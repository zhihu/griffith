import hdlr from '../hdlr'

describe('hdlr box', () => {
  it('should get the hdlr box tree', () => {
    // prettier-ignore
    const hdlrBody = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00 ,0x00, 0x76,  // preDefined
      0x76, 0x69, 0x64, 0x65,  // handlerType
      0x00, 0x00, 0x00, 0x00,  // handlerType2
      0x00, 0x00, 0x00, 0x00,  // reserved
      0x00, 0x00, 0x00, 0x00,
      0x56, 0x69, 0x64, 0x65,  // name
      0x6f, 0x48, 0x61, 0x6e,
      0x64, 0x6c, 0x65, 0x72,
      0x00,
    ])

    expect(hdlr(hdlrBody)).toEqual({
      flags: 0,
      handlerType: 'vide',
      handlerType2: new Array(4).fill('\u0000').join(''),
      name: 'VideoHandler',
      version: 0,
    })
  })
})
