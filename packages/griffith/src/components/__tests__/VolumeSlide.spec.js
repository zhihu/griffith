import React from 'react'
import {render} from 'enzyme'
import VolumeSlider from '../VolumeSlider'

describe('VolumeSlider', () => {
  it('get VolumeSlider component', () => {
    expect(render(<VolumeSlider total={1} value={0.5} />)).toMatchSnapshot()
  })
})
