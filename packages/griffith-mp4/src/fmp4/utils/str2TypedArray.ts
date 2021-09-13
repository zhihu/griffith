const char2Hex = (char: string) => char.charCodeAt(0)

const str2TypedArray = (str: string) => {
  // 字符串转 uint8 array
  // 应该使用 Uint8Array.from/TextEncoder
  return new Uint8Array(
    Array.prototype.map.call(str, char2Hex) as Iterable<number>
  )
}

export default str2TypedArray
