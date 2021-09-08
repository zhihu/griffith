import {concatTypedArray, generateBox} from '../utils'

export default function sdtp(data) {
  const {samples} = data
  const content = concatTypedArray(
    [0x00, 0x00, 0x00, 0x00],
    ...samples.map(() => new Uint8Array([0x10])) // FIXME: need sample flags
  )
  return generateBox('sdtp', content)
}
