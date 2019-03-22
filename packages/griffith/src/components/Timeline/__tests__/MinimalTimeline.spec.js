import React from 'react'
import {shallow} from 'enzyme'
import {MinimalTimeline} from '..'

describe('MinimalTimeline', () => {
  it('get MinimalTimeline component', () => {
    const wrapper = shallow(
      <MinimalTimeline
        buffered={0}
        duration={182.234}
        currentTime={0}
        show={false}
      />
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({show: true})

    expect(wrapper).toMatchSnapshot()
  })
})
