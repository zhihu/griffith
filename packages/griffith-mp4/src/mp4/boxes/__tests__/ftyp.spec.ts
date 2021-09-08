import ftyp from '../ftyp'

describe('ftyp box', () => {
  it('should get the ftyp box tree', () => {
    // prettier-ignore
    const ftypBody = new Uint8Array([
      0x69, 0x73, 0x6f, 0x6d,  // majorBrand
      0x00, 0x00, 0x02, 0x00,  // minorVersion
      0x69, 0x73, 0x6f, 0x6d,  // compatibleBrands
      0x69, 0x73, 0x6f, 0x32,
      0x61, 0x76, 0x63, 0x31,
      0x6d, 0x70, 0x34, 0x31,
    ])
    expect(ftyp(ftypBody)).toEqual({
      majorBrand: 'isom',
      minorVersion: 512,
      compatibleBrands: ['isom', 'iso2', 'avc1', 'mp41'],
    })
  })
})
