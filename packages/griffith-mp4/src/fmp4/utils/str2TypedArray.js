const char2Hex = char => char.charCodeAt()

const str2TypedArray = str => {
  // 字符串转 uint8 array
  return new Uint8Array(Array.prototype.map.call(str, char2Hex))
}

export default str2TypedArray
