import {generateBox, concatTypedArray, generateVersionAndFlags} from '../utils'
import avc1 from './avc1'
import mp4a from './mp4a'

export default function stsd(data: any) {
  const {type} = data
  let content
  if (type === 'video') {
    content = avc1(data)
  } else if (type === 'audio') {
    content = mp4a(data)
  }
  content = concatTypedArray(
    // prettier-ignore
    new Uint8Array([
      ...generateVersionAndFlags(0, 0), // version & flags
      0x00, 0x00, 0x00, 0x01 // entry_count
    ]),
    content
  )
  return generateBox('stsd', content)
}
