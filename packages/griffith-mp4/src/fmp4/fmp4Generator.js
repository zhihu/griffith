import {concatTypedArray} from './utils'
import ftyp from './boxes/ftyp'
import moov from './boxes/moov'
import moof from './boxes/moof'
import mdat from './boxes/mdat'

export default class FMP4Generator {
  static sequenceNumber = 1

  static ftyp() {
    return ftyp()
  }

  static moov(data) {
    return moov(data)
  }

  static moof(trackInfo, baseMediaDecodeTime) {
    return moof(
      Object.assign({}, trackInfo, {
        sequenceNumber: FMP4Generator.sequenceNumber++,
        baseMediaDecodeTime,
      })
    )
  }

  static mdat(trackInfo) {
    const samples = trackInfo.samples.map(
      sample => new Uint8Array(sample.buffer)
    )

    return mdat(concatTypedArray(...samples))
  }
}
