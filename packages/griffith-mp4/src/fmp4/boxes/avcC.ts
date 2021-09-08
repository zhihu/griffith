import {generateBox} from '../utils'

export default function avcC(data) {
  const {SPS, PPS} = data
  // prettier-ignore
  const content = new Uint8Array([
    0x01, // configurationVersion
    SPS[1], // AVCProfileIndication
    SPS[2], // profile_compatibility,
    SPS[3], // AVCLevelIndication
    0xfc | 3, // lengthSizeMinusOne`
    0xE0 | 1, // 目前只处理一个sps **
    SPS.length >> 8 & 0xff,
    SPS.length & 0xff, 
    ...SPS,
    0x01,
    PPS.length >> 8 & 0xff, 
    PPS.length & 0xff, 
    ...PPS
  ])
  return generateBox('avcC', content)
}
