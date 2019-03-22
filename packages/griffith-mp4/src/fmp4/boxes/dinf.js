import {generateBox, concatTypedArray, generateVersionAndFlags} from '../utils'

export default function dinf() {
  return generateBox('dinf', dref())
}

function dref() {
  // prettier-ignore
  const content = concatTypedArray(new Uint8Array([
    ...generateVersionAndFlags(0, 0),
    0x00, 0x00, 0x00, 0x01, // entry_count
  ]), url())
  return generateBox('dref', content)
}

function url() {
  // prettier-ignore
  return generateBox('url ', [ 0x00, 0x00, 0x00, 0x01])
}
