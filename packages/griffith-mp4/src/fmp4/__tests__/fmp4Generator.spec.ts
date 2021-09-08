import FMP4 from '../fmp4Generator'
import {audioData} from '../boxes/__tests__/__mocks__/data'

describe('fmp4Generator', () => {
  it('should generator ftyp buffer', () => {
    // prettier-ignore
    expect(FMP4.ftyp()).toEqual(new Uint8Array([
      0x00, 0x00, 0x00, 0x18,   // size
      0x66, 0x74, 0x79, 0x70,   // ftyp
      0x69, 0x73, 0x6F, 0x6D,   // major_brand: isom
      0x00, 0x00, 0x00, 0x01,   // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x6D,   // isom
      0x61, 0x76, 0x63, 0x31,   // avc1
    ]))
  })

  it('should generator audio moov buffer size', () => {
    expect(FMP4.moov(audioData, 'audio').length).toBe(652)
  })

  it('should generator video moov buffer size', () => {
    expect(FMP4.moov(audioData, 'video').length).toBe(718)
  })

  it('should generator moof buffer size', () => {
    expect(FMP4.moof(audioData).length).toBe(5235)
  })

  it('should generator mdat buffer size', () => {
    expect(FMP4.mdat(audioData).length).toBe(8)
  })
})
