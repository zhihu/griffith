import {
  concatTypedArray,
  generateBox,
  num2FourBytes,
  generateVersionAndFlags,
} from '../utils'

export default function mvex(data: any) {
  const content = concatTypedArray(mehd(data), trex(1), trex(2))
  return generateBox('mvex', content)
}

export function mehd(data: any) {
  const {duration} = data
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),
    ...num2FourBytes(duration), 
  ])
  return generateBox('mehd', content)
}

export function trex(trackId: any) {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0), // version & flags
    ...num2FourBytes(trackId),
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
  ])
  return generateBox('trex', content)
}
