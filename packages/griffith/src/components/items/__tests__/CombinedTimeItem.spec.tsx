import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {shallow} from 'enzyme'
import CombinedTimeItem from '../CombinedTimeItem'

describe('CombinedTimeItem', () => {
  it('get CombinedTimeItem component', () => {
    const wrapper = shallow(
      <CombinedTimeItem isFullScreen={true} currentTime={6} duration={182} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
