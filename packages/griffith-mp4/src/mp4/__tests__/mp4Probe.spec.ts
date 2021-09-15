import mp4BoxTree from './__mocks__/mp4BoxTree'
import MP4Probe from '../mp4Probe'

test('MP4Probe', () => {
  const mp4Probe = new MP4Probe(mp4BoxTree)
  mp4Probe.updateInterval(1000)
  expect(mp4Probe.getSamples()).toMatchObject({
    videoSamples: [],
    audioSamples: [],
  })
  expect(mp4Probe.getTrackInfo(new ArrayBuffer(100))).toMatchObject({
    audioTrackInfo: {samples: []},
    videoTrackInfo: {samples: []},
  })
  expect(mp4Probe.isDraining(1000)).toBeFalsy()
})
