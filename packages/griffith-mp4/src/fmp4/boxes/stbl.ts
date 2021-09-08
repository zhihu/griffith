import {generateBox, concatTypedArray, generateVersionAndFlags} from '../utils'
import stsd from './stsd'

export default function stbl(data: any) {
  const content = concatTypedArray(stsd(data), stts(), stsc(), stsz(), stco())
  return generateBox('stbl', content)
}

const stsz = () => {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),  // version(0) + flags
    0x00, 0x00, 0x00, 0x00,  // sample_size
    0x00, 0x00, 0x00, 0x00   // sample_count
  ])
  return generateBox('stsz', content)
}

const stsc = () => {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),  // version(0) + flags
    0x00, 0x00, 0x00, 0x00,  // entry_count
  ])
  return generateBox('stsc', content)
}

const stts = () => {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),  // version(0) + flags
    0x00, 0x00, 0x00, 0x00,  // entry_count
  ])
  return generateBox('stts', content)
}

const stco = () => {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),  // version(0) + flags
    0x00, 0x00, 0x00, 0x00,  // entry_count
  ])
  return generateBox('stco', content)
}
