import Stream from '../stream'

describe('Stream', () => {
  describe('read byte', () => {
    it('should read four byte', () => {
      // box size
      const buffer = new Uint8Array([0x00, 0x00, 0x00, 0x20])
      const stream = new Stream(buffer)
      expect(stream.readByte(4)).toBe(32)
    })

    it('should read three byte', () => {
      // box flags
      const buffer = new Uint8Array([0x00, 0x00, 0x00])
      const stream = new Stream(buffer)
      expect(stream.readByte(3)).toBe(0)
    })

    it('should read two byte', () => {
      // avc1 width
      const buffer = new Uint8Array([0x01, 0x70])
      const stream = new Stream(buffer)
      expect(stream.readByte(2)).toBe(368)
    })

    it('should read one byte', () => {
      // box version
      const buffer = new Uint8Array([0x00])
      const stream = new Stream(buffer)
      expect(stream.readByte(1)).toBe(0)
    })
  })

  describe('readType', () => {
    it('should read ftyp box type', () => {
      const buffer = new Uint8Array([0x66, 0x74, 0x79, 0x70])
      const stream = new Stream(buffer)
      expect(stream.readType(4)).toBe('ftyp')
    })
  })
})
