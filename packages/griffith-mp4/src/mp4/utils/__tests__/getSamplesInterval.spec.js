import {
  getVideoSamplesInterval,
  getAudioSamplesInterval,
  getNextVideoSamplesInterval,
} from '..'
import mp4BoxTree from '../../__tests__/__mocks__/mp4BoxTree'
import mp4BoxTree2 from '../../__tests__/__mocks__/mp4BoxTree2'

describe('getSamplesInterval', () => {
  it('Should get the interval of video samles', () => {
    expect(getVideoSamplesInterval(mp4BoxTree, 0, 12800)).toEqual({
      offsetInterVal: [0, 229],
      timeInterVal: [0, 117248],
    })

    expect(getVideoSamplesInterval(mp4BoxTree, 9.2 * 12800)).toEqual({
      offsetInterVal: [229, 251],
      timeInterVal: [117248, 128512],
    })
  })

  it('Should get the interval of audio samles', () => {
    expect(
      getAudioSamplesInterval(mp4BoxTree, {
        offsetInterVal: [0, 229],
        timeInterVal: [0, 117248],
      })
    ).toEqual({
      offsetInterVal: [0, 395],
      timeInterVal: [0, 404480],
    })
  })

  it('Should get the next interval of a sample', () => {
    expect(getNextVideoSamplesInterval(mp4BoxTree, 229)).toEqual({
      offsetInterVal: [229, 251],
      timeInterVal: [117248, 128512],
    })

    expect(getNextVideoSamplesInterval(mp4BoxTree2, 56)).toEqual({
      offsetInterVal: [56, 86],
      timeInterVal: [56056, 86086],
    })
  })
})
