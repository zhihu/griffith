import React from 'react'
import {render} from '@testing-library/react'
import MinimalTimeline from '../MinimalTimeline'

describe('MinimalTimeline', () => {
  it('get MinimalTimeline component', () => {
    const result = render(
      <MinimalTimeline
        buffered={0}
        duration={182.234}
        currentTime={0}
        show={false}
      />
    )

    expect(result.container).toMatchSnapshot()

    result.rerender(
      <MinimalTimeline
        buffered={0}
        duration={182.234}
        currentTime={60}
        show={true}
      />
    )

    expect(result.container).toMatchSnapshot()
  })
})
