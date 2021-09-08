import {
  num2FourBytes,
  num2EightBytes,
  generateReserved,
  generateBox,
  generateVersionAndFlags,
} from '../utils'
import {MATRIX_TYPED_ARRAY} from '../utils/constants'

export default function tkhd(data) {
  const {type, duration, width, height} = data

  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(1, 7), // version & flags
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // creation_time
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // modification_time
    ...num2FourBytes(type === 'video' ? 1 : 2), // track_ID **
    ...generateReserved(4),
    ...num2EightBytes(duration),
    ...generateReserved(8),
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x00, 0x00, // volume
    0x00, 0x00, // reserved
    ...MATRIX_TYPED_ARRAY,
    (width >> 8) & 0xff, width & 0xff,
    0x00, 0x00,
    (height >> 8) & 0xff, height & 0xff,
    0x00, 0x00,
  ])
  return generateBox('tkhd', content)
}
