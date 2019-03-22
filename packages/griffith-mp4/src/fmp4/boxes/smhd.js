import {generateBox, generateVersionAndFlags} from '../utils'
export default function smhd() {
  // prettier-ignore
  const content = [
    ...generateVersionAndFlags(0, 0),
    0x00, 0x00, 0x00, 0x00  // balance(2) + reserved(2)
  ]
  return generateBox('smhd', content)
}
