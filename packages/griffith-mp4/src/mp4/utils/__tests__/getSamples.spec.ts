import {getVideoSamples, getAudioSamples} from '..'
import mp4BoxTree from '../../__tests__/__mocks__/mp4BoxTree'

describe('getSamples', () => {
  it('should get first video sample', () => {
    expect(getVideoSamples(mp4BoxTree, 9271, [0, 229])).toMatchSnapshot()
  })

  it('should get last video sample', () => {
    expect(getVideoSamples(mp4BoxTree, 588544, [229, 251])).toMatchSnapshot()
  })

  it('should get first audio sample', () => {
    expect(getAudioSamples(mp4BoxTree, 9271, [0, 395])).toMatchSnapshot()
  })

  it('should get last audio sample', () => {
    expect(getAudioSamples(mp4BoxTree, 588544, [395, 430])).toMatchSnapshot()
  })
})
