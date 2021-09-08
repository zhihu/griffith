import {generateBox, generateVersionAndFlags} from '../utils'

export default function vmhd() {
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 1), // version(0) + flags
    0x00, 0x00,             // graphicsmode: 2 bytes
    0x00, 0x00, 0x00, 0x00, // opcolor: 3 * 2 bytes
    0x00, 0x00
  ])
  return generateBox('vmhd', content)
}
