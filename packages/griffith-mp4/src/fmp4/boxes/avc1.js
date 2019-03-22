import {
  generatePredefined,
  generateReserved,
  generateBox,
  concatTypedArray,
} from '../utils'
import avcC from './avcC'

export default function acv1(data) {
  const {width, height} = data

  // prettier-ignore
  let content = new Uint8Array([
    ...generateReserved(6),
    0x00, 0x01,  // data_reference_index
    ...generatePredefined(16),
    (width >> 8) & 0xff, width & 0xff, 
    (height >> 8) & 0xff, height & 0xff, // width & height
    0x00, 0x48, 0x00, 0x00,  // horizresolution
    0x00, 0x48, 0x00, 0x00,  // vertresolution
    ...generateReserved(4),
    0x00, 0x01, // frame_count
    0x0B,
    0x57, 0x41, 0x4E, 0x47,
    0x4C, 0x75, 0x76,
    0X44, 0x41, 0x4E, 0x47,
    ...generatePredefined(20),
    0x00, 0x18, // depth
    // 设置成 0x00, 0x00 的话 safari 无法正常播放。
    0xff, 0xff, // pre_defined
  ])
  content = concatTypedArray(content, avcC(data))
  return generateBox('avc1', content)
}
