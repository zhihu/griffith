export default class Stream {
  constructor(buffer) {
    this.buffer = buffer
    this.position = 0
  }

  readType(length = 4) {
    const typeBuffer = []
    for (let i = 0; i < length; i++) {
      typeBuffer.push(this.buffer[this.position++])
    }
    return String.fromCharCode.apply(null, typeBuffer)
  }

  readByte(length) {
    switch (length) {
      case 1:
        return this.readOneByte()
      case 2:
        return this.readTwoByte()
      case 3:
        return this.readThreeByte()
      case 4:
        return this.readFourByte()
      default:
        return 0
    }
  }

  readOneByte() {
    return this.buffer[this.position++] >>> 0
  }

  readTwoByte() {
    return (
      ((this.buffer[this.position++] << 8) | this.buffer[this.position++]) >>> 0
    )
  }

  readThreeByte() {
    return (
      ((this.buffer[this.position++] << 16) |
        (this.buffer[this.position++] << 8) |
        this.buffer[this.position++]) >>>
      0
    )
  }

  readFourByte() {
    return (
      ((this.buffer[this.position++] << 24) |
        (this.buffer[this.position++] << 16) |
        (this.buffer[this.position++] << 8) |
        this.buffer[this.position++]) >>>
      0
    )
  }
}
