export function num2FourBytes(num: any) {
  return new Uint8Array([
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ])
}

export function num2EightBytes(num: any) {
  const upper = num / Math.pow(2, 32)
  const lower = num % Math.pow(2, 32)
  return new Uint8Array([
    (upper >>> 24) & 0xff,
    (upper >>> 16) & 0xff,
    (upper >>> 8) & 0xff,
    upper & 0xff,
    (lower >>> 24) & 0xff,
    (lower >>> 16) & 0xff,
    (lower >>> 8) & 0xff,
    lower & 0xff,
  ])
}
