import React from 'react'
import {render} from '@testing-library/react'
import CombinedTimeItem from '../CombinedTimeItem'

describe('CombinedTimeItem', () => {
  it('get CombinedTimeItem component', () => {
    const result = render(
      <CombinedTimeItem isFullScreen={true} currentTime={6} duration={182} />
    )
    expect(result.container).toMatchSnapshot()
  })
})
