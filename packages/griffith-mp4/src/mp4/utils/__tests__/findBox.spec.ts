import {findBox} from '..'
import mp4BoxTree from '../../__tests__/__mocks__/mp4BoxTree'

describe('findBox', () => {
  it('find moov box', () => {
    expect(findBox(mp4BoxTree, 'moov')).toHaveProperty('audioTrak')
    expect(findBox(mp4BoxTree, 'moov')).toHaveProperty('videoTrak')
    expect(findBox(mp4BoxTree, 'moov')).toHaveProperty('mvhd')
    expect(findBox(mp4BoxTree, 'moov')).toHaveProperty('udta')
  })

  it('find mvhd box', () => {
    expect(findBox(mp4BoxTree, 'mvhd')).toHaveProperty('duration')
  })

  it('find videoTrak box', () => {
    expect(findBox(mp4BoxTree, 'videoTrak')['mdia']['hdlr']).toHaveProperty(
      'handlerType',
      'vide'
    )
  })

  it('find audioTrak box', () => {
    expect(findBox(mp4BoxTree, 'audioTrak')['mdia']['hdlr']).toHaveProperty(
      'handlerType',
      'soun'
    )
  })

  it('find videoTkhd box', () => {
    expect(findBox(mp4BoxTree, 'videoTkhd')).toHaveProperty('alternateGroup', 0)
  })

  it('find audioTkhd box', () => {
    expect(findBox(mp4BoxTree, 'audioTkhd')).toHaveProperty('alternateGroup', 1)
  })

  it('find videoStbl box', () => {
    expect(findBox(mp4BoxTree, 'videoStbl')).toHaveProperty('ctts')
  })

  it('find audioStbl box', () => {
    expect(findBox(mp4BoxTree, 'audioStbl')).not.toHaveProperty('ctts')
  })

  it('find videoStsc box', () => {
    expect(findBox(mp4BoxTree, 'videoStsc').samples).toHaveLength(1)
  })

  it('find audioStsc box', () => {
    expect(findBox(mp4BoxTree, 'audioStsc').samples).toHaveLength(138)
  })

  it('find avcC box', () => {
    expect(findBox(mp4BoxTree, 'avcC')).toHaveProperty('AVCLevelIndication')
  })

  it('find esds box', () => {
    expect(findBox(mp4BoxTree, 'esds')).toHaveProperty('ESDescrTag')
  })

  it('find videoStco box', () => {
    expect(findBox(mp4BoxTree, 'videoStco').samples[0].chunkOffset).toBe(9271)
  })

  it('find audioStco box', () => {
    expect(findBox(mp4BoxTree, 'audioStco').samples[0].chunkOffset).toBe(16729)
  })

  it('find videoStts box', () => {
    expect(findBox(mp4BoxTree, 'videoStts').samples[0].sampleCount).toBe(251)
  })

  it('find audioStts box', () => {
    expect(findBox(mp4BoxTree, 'audioStts').samples[0].sampleCount).toBe(430)
  })

  it('find videoMdhd box', () => {
    expect(findBox(mp4BoxTree, 'videoMdhd')).toHaveProperty('duration', 128512)
  })

  it('find audioMdhd box', () => {
    expect(findBox(mp4BoxTree, 'audioMdhd')).toHaveProperty('duration', 440320)
  })

  it('find videoStss box', () => {
    expect(findBox(mp4BoxTree, 'videoStss').samples).toHaveLength(2)
  })

  it('find videoStsz box', () => {
    expect(findBox(mp4BoxTree, 'videoStsz').samples[0]).toHaveProperty(
      'entrySize',
      7458
    )
  })

  it('find audioStsz box', () => {
    expect(findBox(mp4BoxTree, 'audioStsz').samples[0]).toHaveProperty(
      'entrySize',
      371
    )
  })

  it('find videoCtts box', () => {
    expect(findBox(mp4BoxTree, 'videoCtts').samples).toHaveLength(196)
  })

  it('find mp4a box', () => {
    expect(findBox(mp4BoxTree, 'mp4a')).toHaveProperty('esds')
  })

  it('find empty', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(findBox(mp4BoxTree)).toEqual({})
  })

  it('find audio elst', () => {
    expect(findBox(mp4BoxTree, 'audioElst').entries[0].mediaTime).toBe(2048)
  })

  it('find video elst', () => {
    expect(findBox(mp4BoxTree, 'videoElst').entries[0].mediaTime).toBe(2048)
  })
})
