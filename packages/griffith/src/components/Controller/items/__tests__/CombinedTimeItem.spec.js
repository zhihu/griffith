import React from 'react'
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
