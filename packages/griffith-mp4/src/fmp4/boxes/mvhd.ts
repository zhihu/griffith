import {
  num2FourBytes,
  num2EightBytes,
  generatePredefined,
  generateReserved,
  generateBox,
} from '../utils'
import {MATRIX_TYPED_ARRAY} from '../utils/constants'

export default function mvhd(data: any) {
  const {duration, timescale} = data
  // prettier-ignore
  const content =  new Uint8Array([
    0x01, 0x00, 0x00, 0x00, // version、flags
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // creation_time
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // modification_time
    ...num2FourBytes(timescale), // timescale **
    ...num2EightBytes(duration),
    0x00, 0x01, 0x00, 0x00, // 1.0 rate
    0x01, 0x00, // 1.0 volume
    ...generateReserved(10), 
    ...MATRIX_TYPED_ARRAY,
    ...generatePredefined(24), // pre_defined
    0xff, 0xff, 0xff, 0xff // next_track_ID
  ])
  return generateBox('mvhd', content)
}
