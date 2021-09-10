import {num2FourBytes} from './num2Bytes'
import str2TypedArray from './str2TypedArray'
import concatTypedArray from './concatTypedArray'

export default function generateBox(type, content) {
  return concatTypedArray(
    num2FourBytes(content.length + 8),
    str2TypedArray(type),
    content
  )
}
