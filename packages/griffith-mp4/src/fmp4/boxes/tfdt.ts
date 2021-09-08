import {generateBox, generateVersionAndFlags} from '../utils'

export default function tfdt(data: any) {
  const {baseMediaDecodeTime} = data
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(1, 0), //  version & flag
    0x00, 0x00, 0x00, 0x00,
    (baseMediaDecodeTime >>> 24) & 0xFF,  // baseMediaDecodeTime: int32
    (baseMediaDecodeTime >>> 16) & 0xFF,
    (baseMediaDecodeTime >>>  8) & 0xFF,
    (baseMediaDecodeTime) & 0xFF
  ])
  return generateBox('tfdt', content)
}
