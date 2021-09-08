import {generateReserved, concatTypedArray, generateBox} from '../utils'
import esds from './esds'

export default function mp4a(data: any) {
  const {channelCount, sampleRate} = data
  // prettier-ignore
  let content = new Uint8Array([
    ...generateReserved(6),
    0x00, 0x01, // data_reference_index
    ...generateReserved(8),
    0x00, channelCount,
    0x00, 0x10, // sampleSize
    ...generateReserved(4),
    (sampleRate >> 8) & 0xFF,  // Audio sample rate
    (sampleRate) & 0xFF,
    0x00, 0x00
  ])
  content = concatTypedArray(content, esds(data))
  return generateBox('mp4a', content)
}
