import React from 'react'
import {css} from 'aphrodite/no-important'
import Slider, {SliderProps} from './Slider'
import styles, {slider as sliderStyles} from './VolumeSlider.styles'

type DefinedProps = Pick<SliderProps, 'styles' | 'orientation' | 'step'>
export type VolumeSliderProps = Omit<SliderProps, keyof DefinedProps>

const VolumeSlider: React.FC<VolumeSliderProps> = (props) => {
  return (
    <div className={css(styles.root)}>
      <Slider
        {...props}
        styles={sliderStyles}
        orientation="vertical"
        step={0.1}
      />
    </div>
  )
}

export default VolumeSlider
