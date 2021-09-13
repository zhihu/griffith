import {Mp4BoxTree} from './types'
import Stream from './stream'
import Box from './mp4Box'

export default class MP4Parse {
  buffer: Uint8Array
  mp4BoxTreeObject: Mp4BoxTree
  stream: Stream
  constructor(buffer: Uint8Array) {
    this.buffer = buffer
    this.stream = new Stream(buffer)
    this.mp4BoxTreeObject = {} as Mp4BoxTree
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
      this.mp4BoxTreeObject[MP4Box.type as keyof Mp4BoxTree] = MP4Box.box
      // @ts-expect-error Property 'size' does not exist on type
      this.mp4BoxTreeObject[MP4Box.type as keyof Mp4BoxTree].size = MP4Box.size
    }
  }
}
