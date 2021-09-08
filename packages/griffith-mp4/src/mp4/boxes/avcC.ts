import Stream from '../stream'

export default function avcC(buffer: any) {
  const stream = new Stream(buffer)

  const configurationVersion = stream.readByte(1)
  const AVCProfileIndication = stream.readByte(1)
  const profileCompatibility = stream.readByte(1)
  const AVCLevelIndication = stream.readByte(1)
  const lengthSizeMinusOne = stream.readByte(1) & 0x3

  const numOfSequenceParameterSets = stream.readByte(1) & 31
  const SPS = []
  for (let i = 0; i < numOfSequenceParameterSets; i++) {
    const length = stream.readByte(2)
    SPS.push(...stream.buffer.slice(stream.position, stream.position + length))
    stream.position += length
  }

  const numOfPictureParameterSets = stream.readByte(1)
  const PPS = []
  for (let i = 0; i < numOfPictureParameterSets; i++) {
    const length = stream.readByte(2)
    PPS.push(...stream.buffer.slice(stream.position, stream.position + length))
    stream.position += length
  }

  const avcCBox = {
    configurationVersion,
    AVCProfileIndication,
    profileCompatibility,
    AVCLevelIndication,
    lengthSizeMinusOne,
    SPS,
    PPS,
  }

  return avcCBox
}
