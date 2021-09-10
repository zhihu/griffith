export default function generateVersionAndFlags(version: number, flag: number) {
  return new Uint8Array([
    version & 0xff,
    (flag >> 16) & 0xff,
    (flag >> 8) & 0xff,
    flag & 0xff,
  ])
}
