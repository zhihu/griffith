import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import Slider from './Slider'
import styles, {slider as sliderStyles} from './VolumeSlider.styles'

class VolumeSlider extends Component {
  render() {
    return (
      <div className={css(styles.root)}>
        <Slider
          {...this.props}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          styles={sliderStyles}
          orientation="vertical"
          step={0.1}
        />
      </div>
    )
  }
}

export default VolumeSlider
