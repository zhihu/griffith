import {num2FourBytes, str2TypedArray, concatTypedArray} from './'

export default function generateBox(type, content) {
  return concatTypedArray(
    num2FourBytes(content.length + 8),
    str2TypedArray(type),
    content
  )
}
