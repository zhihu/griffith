import React, {Component} from 'react'
import {css, StyleDeclarationMap} from 'aphrodite/no-important'
import clamp from 'lodash/clamp'
import {ProgressDot as ProgressDotType} from '../types'
import ProgressDot, {ProgressDotsProps} from './ProgressDot'

import styles, {
  horizontal as horizontalStyles,
  vertical as verticalStyles,
} from './Slider.styles'

type SlideStyle = typeof horizontalStyles & typeof verticalStyles // & {thumbSliding: unknown}
type OwnStyleKey = keyof SlideStyle
type StyleKey = OwnStyleKey | 'buffered' | 'thumb'

type OwnProps = {
  orientation?: 'horizontal' | 'vertical'
  reverse?: boolean
  value?: number
  buffered?: number
  total?: number
  step?: number
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onDragStart?: () => void
  onDragEnd?: () => void
  onChange?: (value: number) => void
  onProgressDotHover?: ProgressDotsProps['onProgressDotHover']
  onProgressDotLeave?: ProgressDotsProps['onProgressDotLeave']
  noInteraction?: boolean
  progressDots?: ProgressDotType[]
  styles: Record<string, unknown> | Record<string, unknown>[]
  // styles: StyleDeclaration<SlideStyle>[] | Partial<StyleDeclaration<SlideStyle>>
}

type State = {
  isSlideActive: boolean
  isSliding: boolean
  slidingValue: null | number
}

const getRatio = (value: number, total?: number) =>
  total ? clamp(value / total, 0, 1) : 0

const toPercentage = (value: number) => `${value * 100}%`

export type SliderProps = OwnProps //& typeof Slider.defaultProps

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

  getStyles(name: StyleKey) {
    let customStyles = this.props.styles
    if (!Array.isArray(customStyles)) {
      customStyles = [customStyles]
    }
    customStyles = customStyles.filter(Boolean)

    return [
      styles[name as OwnStyleKey],
      this.getVariantStyleSheet()[name as OwnStyleKey],
      ...customStyles.map((item) => item[name]),
    ] as StyleDeclarationMap[]
  }

  getClassName(...names: StyleKey[]) {
    return css(...names.map((name) => this.getStyles(name)))
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

  getPercentageValue() {
    const {value, total} = this.props
    const {isSlideActive, slidingValue} = this.state
    return getRatio(isSlideActive ? slidingValue! : value!, total)
  }

  getProgressStyle(value: number) {
    const {orientation} = this.props
    const scaleAxis = orientation === 'horizontal' ? 'scaleX' : 'scaleY'
    return {
      [this.getSizeKey()]: '100%',
      transform: `${scaleAxis}(${value})`,
      transformOrigin: this.getAlignKey(),
    }
  }

  getProgressThumbStyle(value: number) {
    const {orientation} = this.props
    const horizontal = orientation === 'horizontal'
    const translateAxis = horizontal ? 'translateX' : 'translateY'
    return {
      [this.getSizeKey()]: '100%',
      transform: `${translateAxis}(${toPercentage(
        horizontal ? value : 1 - value
      )})`,
      transformOrigin: this.getAlignKey(),
    }
  }

  getBufferedPercentageValue() {
    const {buffered, total} = this.props
    return getRatio(buffered!, total)
  }

  getSlidingValue(event: globalThis.MouseEvent) {
    const {orientation, reverse, total} = this.props
    const track = this.trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()

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

    return value * total!
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const {reverse, value, total, step} = this.props

    let direction = 0
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      direction = -1
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      direction = 1
    }
    if (reverse) {
      direction = -direction
    }

    const result = clamp(value! + step! * direction, 0, total!)
    if (result !== value) {
      event.preventDefault()
      this.handleChange(result)
    }
  }

  handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const value = this.getSlidingValue(
      event as unknown as globalThis.MouseEvent
    )
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

  handleDragMove = (event: globalThis.MouseEvent) => {
    const value = this.getSlidingValue(event)
    this.setState({
      slidingValue: value,
      isSliding: true,
    })

    this.handleChange(value)
  }

  handleDragEnd = (event: globalThis.MouseEvent): void => {
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

  handleChange = (value: number) => {
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
    const ratio = this.getPercentageValue()
    return (
      <div
        className={this.getClassName('root')}
        {...interactionProps}
        role="slider"
      >
        <div className={this.getClassName('inner')}>
          <div ref={this.trackRef} className={this.getClassName('track')}>
            {Boolean(buffered) && (
              <div
                className={this.getClassName('bar', 'buffered')}
                style={this.getProgressStyle(this.getBufferedPercentageValue())}
              />
            )}
            <div
              className={this.getClassName('bar')}
              style={this.getProgressStyle(ratio)}
            />
            {Boolean(progressDots?.length) && (
              <ProgressDot
                progressDots={progressDots!}
                total={total!}
                onProgressDotHover={onProgressDotHover}
                onProgressDotLeave={onProgressDotLeave}
              />
            )}
          </div>
          {!noInteraction && (
            // the position indicator (visible when hovering)
            <div
              className={this.getClassName('thumbWrapper')}
              style={this.getProgressThumbStyle(ratio)}
            >
              <div
                className={this.getClassName(
                  'thumb',
                  (isSlideActive && 'thumbSliding') as OwnStyleKey
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
