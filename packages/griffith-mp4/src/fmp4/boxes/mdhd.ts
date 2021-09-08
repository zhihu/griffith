import {
  num2FourBytes,
  num2EightBytes,
  generateBox,
  generateVersionAndFlags,
} from '../utils'

export default function mdhd(data: any) {
  const {type} = data
  let duration
  let timescale
  if (type === 'video') {
    duration = data.videoDuration
    timescale = data.videoTimescale
  } else {
    duration = data.audioDuration
    timescale = data.audioTimescale
  }
  // prettier-ignore
  const content = new Uint8Array([
    ...generateVersionAndFlags(1, 0),
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // creation_time
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // modification_time
    ...num2FourBytes(timescale), // timescale **
    ...num2EightBytes(duration), // duration 
    0x55, 0xc4, // language
    0x00, 0x00, // pre_defined
  ])
  return generateBox('mdhd', content)
}
