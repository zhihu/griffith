import boxParse from './boxes'
import Stream from './stream'

const CONTAINER_BOXES = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl']

const SPECIAL_BOXES = ['udta', 'free']

type BoxType = keyof typeof boxParse

export default class MP4Box {
  box: any
  data?: Uint8Array
  size: number
  start: number
  type: BoxType
  constructor() {
    this.size = 0
    this.type = '' as BoxType
    this.start = 0
    this.box = {}
  }

  readSize(stream: Stream) {
    this.start = stream.position
    this.size = stream.readByte(4)
  }

  readType(stream: Stream) {
    this.type = stream.readType() as BoxType

    // 一个 box 的 size 只可能大于等于 8
    // 如果从 readSize 中解析出来的 mdat size 为 1，则表明此视频比较大，需要 type 后的 8 个字节来计算实际大小
    if (this.size === 1) {
      this.size = stream.readByte(4) << 32
      this.size |= stream.readByte(4)
    }
  }

  readBody(stream: Stream) {
    this.data = stream.buffer.slice(stream.position, this.size + this.start)
    if (
      CONTAINER_BOXES.find((item) => item === this.type) ||
      SPECIAL_BOXES.find((item) => item === this.type)
    ) {
      this.parserContainerBox()
    } else {
      if (!boxParse[this.type]) {
        this.box = {}
      } else {
        this.box = {
          ...this.box,
          ...boxParse[this.type](this.data),
        }
      }
    }

    stream.position += this.data.length
  }

  parserContainerBox() {
    const stream = new Stream(this.data!)
    const size = stream.buffer.length
    while (stream.position < size) {
      const Box = new MP4Box()
      Box.readSize(stream)
      Box.readType(stream)
      Box.readBody(stream)

      // @ts-expect-error This condition will always return 'false'
      if (Box.type === 'trak' && Box.box.mdia && Box.box.mdia.hdlr) {
        const handlerType = Box.box.mdia.hdlr.handlerType
        if (handlerType === 'vide') {
          this.box.videoTrak = Box.box
        } else if (handlerType === 'soun') {
          this.box.audioTrak = Box.box
        } else {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          this.box[`${handlerType}Trak`] = Box.box
        }
      } else {
        this.box[Box.type] = Box.box
      }
    }
  }
}
