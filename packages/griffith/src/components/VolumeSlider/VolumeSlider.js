import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'

import Slider from '../Slider'

import styles, {slider as sliderStyles} from './styles'

class VolumeSlider extends Component {
  render() {
    return (
      <div className={css(styles.root)}>
        <Slider
          {...this.props}
          styles={sliderStyles}
          orientation="vertical"
          step={0.1}
        />
      </div>
    )
  }
}

export default VolumeSlider
