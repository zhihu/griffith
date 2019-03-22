import {generateBox, num2FourBytes, generateVersionAndFlags} from '../utils'

export default function tfhd(data) {
  const {trackId} = data
  // prettier-ignore
  return generateBox('tfhd', new Uint8Array([
    ...generateVersionAndFlags(0, 0), // version & flags
    ...num2FourBytes(trackId),
  ]))
}
