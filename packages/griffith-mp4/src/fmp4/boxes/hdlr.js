import {
  generateVersionAndFlags,
  generatePredefined,
  generateReserved,
  str2TypedArray,
  generateBox,
} from '../utils'

export default function hdlr(type) {
  let handler = ''
  let name = ''
  switch (type) {
    case 'video':
      handler = 'vide'
      name = 'VideoHandler'
      break
    case 'audio':
      handler = 'soun'
      name = 'SoundHandler'
  }
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0),
    ...generatePredefined(4),
    ...str2TypedArray(handler), // **
    ...generateReserved(12),
    ...str2TypedArray(name),
    0x00,
  ])
  return generateBox('hdlr', content)
}
