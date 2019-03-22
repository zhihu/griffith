import {num2FourBytes, concatTypedArray, generateBox} from '../utils'

export default function trun(data) {
  const {samples, trackId} = data
  const ceil = trackId === 1 ? 16 : 12
  const length = samples.length
  // mdat-header 8
  // moof-header 8
  // mfhd 16
  // traf-header 8
  // thhd 16
  // tfdt 20
  // trun-header 12
  // sampleCount 4
  // data-offset 4
  // samples.length
  // sdtp-header 12
  const offset = 108 + ceil * length + samples.length
  // prettier-ignore
  const content = new Uint8Array([
    0x00, 0x00, trackId === 1 ? 0x0f : 0x07, 0x01,
    ...num2FourBytes(samples.length),
    ...num2FourBytes(offset),
    ...concatTypedArray(
      ...samples.map((sample, index) => {
        const {duration, size, compositionTimeOffset} = sample
        return concatTypedArray(
          num2FourBytes(duration),
          num2FourBytes(size),
          trackId === 1
            ? index === 0 // FIXME:need sample flags
              ? [0x02, 0x00, 0x00, 0x00]
              : [0x01, 0x01, 0x00, 0x00]
            : [0x01, 0x00, 0x00, 0x00],
          trackId === 1 ? num2FourBytes(compositionTimeOffset): [],
        )
      })
    ),
  ])
  return generateBox('trun', content)
}
