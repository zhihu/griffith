import React from 'react'
import Renderer from 'react-test-renderer'
import VolumeSlider from '../VolumeSlider'

describe('VolumeSlider', () => {
  it('get VolumeSlider component', () => {
    expect(
      Renderer.create(<VolumeSlider total={1} value={0.5} />).toJSON()
    ).toMatchSnapshot()
  })
})
