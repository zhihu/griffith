import React, {Component} from 'react'
import {css, StyleDeclaration} from 'aphrodite/no-important'
import clamp from 'lodash/clamp'
import {ProgressDot as ProgressDotType} from '../types'
import ProgressDot, {ProgressDotsProps} from './ProgressDot'
import formatPercent from '../utils/formatPercent'
import KeyCode from '../constants/KeyCode'

import styles, {
  horizontal as horizontalStyles,
  vertical as verticalStyles,
} from './Slider.styles'

type OwnProps = {
  orientation?: 'horizontal' | 'vertical'
  reverse?: boolean
  value?: number
  buffered?: number
  total?: number
  step?: number
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onDragStart?: (...args: any[]) => any
  onDragEnd?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onProgressDotHover?: ProgressDotsProps['onProgressDotHover']
  onProgressDotLeave?: ProgressDotsProps['onProgressDotLeave']
  noInteraction?: boolean
  progressDots?: ProgressDotType[]
  styles: StyleDeclaration[]
}

type State = any

export type SliderProps = OwnProps & typeof Slider.defaultProps

class Slider extends Component<SliderProps, State> {
  static defaultProps = {
    orientation: 'horizontal',
    reverse: false,
    value: 0,
    buffered: 0,
    total: 0,
    step: 1,
    progressDots: [] as ProgressDotType[],
  }

  state = {
    isSlideActive: false,
    isSliding: false,
    slidingValue: null,
  }

  // refs
  trackRef = React.createRef<HTMLDivElement>()

  registerEvents() {
    document.addEventListener('mousemove', this.handleDragMove)
    document.addEventListener('mouseup', this.handleDragEnd)
  }

  unregisterEvents() {
    document.removeEventListener('mousemove', this.handleDragMove)
    document.removeEventListener('mouseup', this.handleDragEnd)
  }

  getVariantStyleSheet() {
    const {orientation} = this.props
    return orientation === 'horizontal' ? horizontalStyles : verticalStyles
  }

  getStyles(name: keyof typeof horizontalStyles) {
    let customStyles = this.props.styles
    if (!Array.isArray(customStyles)) {
      customStyles = [customStyles]
    }
    customStyles = customStyles.filter(Boolean)

    return [
      styles[name],
      this.getVariantStyleSheet()[name],
      ...customStyles.map((item: any) => item[name]),
    ]
  }

  getClassName(...names: any[]) {
    return css(
      ...Array.prototype.concat.apply(
        [],
        names.map((name) => this.getStyles(name))
      )
    )
  }

  getAlignKey() {
    const {orientation, reverse} = this.props
    if (orientation === 'horizontal') {
      return reverse ? 'right' : 'left'
    } else {
      return reverse ? 'top' : 'bottom'
    }
  }

  getSizeKey() {
    const {orientation} = this.props
    return orientation === 'horizontal' ? 'width' : 'height'
  }

  getPercentage() {
    const {value, total} = this.props
    const {isSlideActive, slidingValue} = this.state
    return formatPercent(isSlideActive ? (slidingValue as any) : value, total)
  }

  getBufferedPercentage() {
    const {buffered, total} = this.props
    return formatPercent(buffered, total)
  }

  getSlidingValue(event: any) {
    const {orientation, reverse, total} = this.props
    const track = this.trackRef.current
    if (!track) return 0
    const rect = (track as any).getBoundingClientRect()

    let value
    if (orientation === 'horizontal') {
      value = (event.clientX - rect.left) / rect.width
    } else {
      value = (rect.bottom - event.clientY) / rect.height
    }
    value = clamp(value, 0, 1)
    if (reverse) {
      value = 1 - value
    }

    return value * total
  }

  handleKeyDown = (event: any) => {
    const {reverse, value, total, step} = this.props

    let direction = 0
    if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.DOWN) {
      direction = -1
    }
    if (event.keyCode === KeyCode.RIGHT || event.keyCode === KeyCode.UP) {
      direction = 1
    }
    if (reverse) {
      direction = -direction
    }

    const result = clamp(value + step * direction, 0, total)
    if (result !== value) {
      event.preventDefault()
      this.handleChange(result)
    }
  }

  handleDragStart = (event: any) => {
    if (event.button !== 0) return

    const value = this.getSlidingValue(event)
    this.setState({
      isSlideActive: true,
      slidingValue: value,
    })

    const {onDragStart} = this.props
    if (onDragStart) {
      onDragStart()
    }
    this.handleChange(value)

    this.registerEvents()
  }

  handleDragMove = (event: any) => {
    const value = this.getSlidingValue(event)
    this.setState({
      slidingValue: value,
      isSliding: true,
    })

    this.handleChange(value)
  }

  handleDragEnd = (event: any) => {
    this.unregisterEvents()

    const {onDragEnd} = this.props
    if (onDragEnd) {
      onDragEnd()
    }

    if (this.state.isSliding) {
      // 点击动作不需要重复触发 change event
      this.handleChange(this.getSlidingValue(event))
    }

    this.setState({
      isSlideActive: false,
      slidingValue: null,
      isSliding: false,
    })
  }

  handleChange = (value: any) => {
    const {onChange} = this.props
    if (onChange) {
      onChange(value)
    }
  }

  render() {
    const {
      buffered,
      onFocus,
      onBlur,
      noInteraction,
      progressDots,
      total,
      onProgressDotHover,
      onProgressDotLeave,
    } = this.props
    const {isSlideActive} = this.state
    const interactionProps = noInteraction
      ? {}
      : {
          tabIndex: 0,
          onFocus,
          onBlur,
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleDragStart,
        }
    return (
      <div className={this.getClassName('root')} {...interactionProps}>
        <div className={this.getClassName('inner')}>
          <div ref={this.trackRef} className={this.getClassName('track')}>
            {Boolean(buffered) && (
              <div
                className={this.getClassName('bar', 'buffered')}
                style={{
                  [this.getAlignKey()]: 0,
                  [this.getSizeKey()]: this.getBufferedPercentage(),
                }}
              />
            )}
            <div
              className={this.getClassName('bar')}
              style={{
                [this.getAlignKey()]: 0,
                [this.getSizeKey()]: this.getPercentage(),
              }}
            />
            {Boolean(progressDots.length) && (
              <ProgressDot
                progressDots={progressDots}
                total={total}
                onProgressDotHover={onProgressDotHover}
                onProgressDotLeave={onProgressDotLeave}
              />
            )}
          </div>
          {!noInteraction && (
            <div
              className={this.getClassName('thumbWrapper')}
              style={{[this.getAlignKey()]: this.getPercentage()}}
            >
              <div
                className={this.getClassName(
                  'thumb',
                  isSlideActive && 'thumbSliding'
                )}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Slider
