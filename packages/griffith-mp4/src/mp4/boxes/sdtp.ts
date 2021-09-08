import Stream from '../stream'

export default function sdtp(buffer: any) {
  const stream = new Stream(buffer)

  const version = stream.readByte(1)
  const flags = stream.readByte(3)

  const samplesFlag = []

  for (let i = stream.position; i < buffer.length; i++) {
    const tmpByte = stream.readByte(1)
    samplesFlag.push({
      isLeading: tmpByte >> 6,
      dependsOn: (tmpByte >> 4) & 0x3,
      isDepended: (tmpByte >> 2) & 0x3,
      hasRedundancy: tmpByte & 0x3,
    })
  }

  const sdtpBox = {
    version,
    flags,
    samplesFlag,
  }

  return sdtpBox
}
