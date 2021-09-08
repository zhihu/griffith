const char2Hex = (char: any) => char.charCodeAt()

const str2TypedArray = (str: any) => {
  // 字符串转 uint8 array
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  return new Uint8Array(Array.prototype.map.call(str, char2Hex))
}

export default str2TypedArray
