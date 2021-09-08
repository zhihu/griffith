import {num2FourBytes, generateBox, generateVersionAndFlags} from '../utils'

export default function mfhd(data: any) {
  const {sequenceNumber} = data
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(0, 0), 
    ...num2FourBytes(sequenceNumber)
  ])
  return generateBox('mfhd', content)
}
