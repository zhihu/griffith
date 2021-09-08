import Stream from './stream'
import Box from './mp4Box'

export default class MP4Parse {
  buffer: any
  mp4BoxTreeObject: any
  stream: any
  constructor(buffer: any) {
    this.buffer = buffer
    this.stream = new Stream(buffer)
    this.mp4BoxTreeObject = {}
    this.init()
  }

  init() {
    this.parse()
  }

  parse() {
    while (this.stream.position < this.buffer.length) {
      const MP4Box = new Box()
      MP4Box.readSize(this.stream)
      MP4Box.readType(this.stream)
      MP4Box.readBody(this.stream)
      this.mp4BoxTreeObject[MP4Box.type] = MP4Box.box
      this.mp4BoxTreeObject[MP4Box.type].size = MP4Box.size
    }
  }
}
