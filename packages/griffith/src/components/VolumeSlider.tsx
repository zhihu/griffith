import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import Slider, {SliderProps} from './Slider'
import styles, {slider as sliderStyles} from './VolumeSlider.styles'

type DefinedProps = Pick<SliderProps, 'styles' | 'orientation' | 'step'>

class VolumeSlider extends Component<Omit<SliderProps, keyof DefinedProps>> {
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
