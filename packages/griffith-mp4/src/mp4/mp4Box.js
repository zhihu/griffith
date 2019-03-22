import boxParse from './boxes'
import Stream from './stream'

const CONTAINER_BOXES = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl']

const SPECIAL_BOXES = ['udta', 'free']

export default class MP4Box {
  constructor() {
    this.size = 0
    this.type = ''
    this.start = 0
    this.box = {}
  }

  readSize(stream) {
    this.start = stream.position
    this.size = stream.readByte(4)
  }

  readType(stream) {
    this.type = stream.readType()

    // 一个 box 的 size 只可能大于等于 8
    // 如果从 readSize 中解析出来的 mdat size 为 1，则表明此视频比较大，需要 type 后的 8 个字节来计算实际大小
    if (this.size === 1) {
      this.size = stream.readByte(4) << 32
      this.size |= stream.readByte(4)
    }
  }

  readBody(stream) {
    this.data = stream.buffer.slice(stream.position, this.size + this.start)
    if (
      CONTAINER_BOXES.find(item => item === this.type) ||
      SPECIAL_BOXES.find(item => item === this.type)
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
    const stream = new Stream(this.data)
    const size = stream.buffer.length
    while (stream.position < size) {
      const Box = new MP4Box()
      Box.readSize(stream)
      Box.readType(stream)
      Box.readBody(stream)

      if (Box.type === 'trak') {
        const handlerType = Box.box.mdia.hdlr.handlerType
        if (handlerType === 'vide') {
          this.box.videoTrak = Box.box
        } else if (handlerType === 'soun') {
          this.box.audioTrak = Box.box
        } else {
          this.box[`${handlerType}Trak`] = Box.box
        }
      } else {
        this.box[Box.type] = Box.box
      }
    }
  }
}
