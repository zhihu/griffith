import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {render} from 'enzyme'
import VolumeSlider from '../VolumeSlider'

describe('VolumeSlider', () => {
  it('get VolumeSlider component', () => {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    expect(render(<VolumeSlider total={1} value={0.5} />)).toMatchSnapshot()
  })
})
