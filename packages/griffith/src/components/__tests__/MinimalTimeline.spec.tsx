import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {shallow} from 'enzyme'
import MinimalTimeline from '../MinimalTimeline'

describe('MinimalTimeline', () => {
  it('get MinimalTimeline component', () => {
    const wrapper = shallow(
      // @ts-expect-error ts-migrate(2786) FIXME: 'MinimalTimeline' cannot be used as a JSX componen... Remove this comment to see the full error message
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
