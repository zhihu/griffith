import React, {useEffect, useRef} from 'react'
import {css, StyleDeclarationMap} from 'aphrodite/no-important'
import clamp from 'lodash/clamp'
import {ProgressDot as ProgressDotType} from '../types'
import ProgressDot, {ProgressDotsProps} from './ProgressDot'
import styles, {
  horizontal as horizontalStyles,
  vertical as verticalStyles,
} from './Slider.styles'
import useHandler from '../hooks/useHandler'
import useSetState from '../hooks/useSetState'

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
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onBlur?: React.FocusEventHandler<HTMLDivElement>
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

const getRatio = (value: number, total?: number) =>
  total ? clamp(value / total, 0, 1) : 0

const toPercentage = (value: number) => `${value * 100}%`

export type SliderProps = OwnProps //& typeof Slider.defaultProps

Slider.defaultProps = {
  orientation: 'horizontal',
  reverse: false,
  progressDots: [] as ProgressDotType[],
}

function Slider(props: SliderProps) {
  const {
    orientation,
    reverse,
    onFocus,
    onBlur,
    onChange,
    onDragStart,
    onDragEnd,
    noInteraction,
    progressDots,
    value = 0,
    buffered = 0,
    total = 0,
    step = 1,
    onProgressDotHover,
    onProgressDotLeave,
  } = props
  const [{isSlideActive, isSliding, slidingValue}, setState] = useSetState({
    isSlideActive: false,
    isSliding: false,
    slidingValue: null as null | number,
  })

  const isHorizontal = orientation === 'horizontal'
  const trackRef = useRef<HTMLDivElement>(null)

  const getStyles = (name: StyleKey) => {
    const variantStyles = isHorizontal ? horizontalStyles : verticalStyles
    let customStyles = props.styles
    if (!Array.isArray(customStyles)) {
      customStyles = [customStyles]
    }
    customStyles = customStyles.filter(Boolean)

    return [
      styles[name as OwnStyleKey],
      variantStyles[name as OwnStyleKey],
      ...customStyles.map((item) => item[name]),
    ] as StyleDeclarationMap[]
  }

  const getClassName = (...names: StyleKey[]) => {
    return css(...names.map((name) => getStyles(name)))
  }

  const alignKey = (() => {
    if (isHorizontal) {
      return reverse ? 'right' : 'left'
    } else {
      return reverse ? 'top' : 'bottom'
    }
  })()

  const sizeKey = isHorizontal ? 'width' : 'height'

  const getProgressStyle = (value: number) => {
    const scaleAxis = isHorizontal ? 'scaleX' : 'scaleY'
    return {
      [sizeKey]: '100%',
      transform: `${scaleAxis}(${value})`,
      transformOrigin: alignKey,
    }
  }

  const getProgressThumbStyle = (value: number) => {
    const translateAxis = isHorizontal ? 'translateX' : 'translateY'
    return {
      [sizeKey]: '100%',
      transform: `${translateAxis}(${toPercentage(
        isHorizontal ? value : 1 - value
      )})`,
      transformOrigin: alignKey,
    }
  }

  const getSlidingValue = (event: MouseEvent) => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()

    let value
    if (isHorizontal) {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    let direction = 0
    let handled = false
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      handled = true
      direction = -1
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      handled = true
      direction = 1
    }
    if (handled) {
      event.preventDefault()
      if (reverse) {
        direction = -direction
      }
      const result = clamp(value + step * direction, 0, total)
      if (result !== value) {
        handleChange(result)
      }
    }
  }

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const value = getSlidingValue(event as unknown as MouseEvent)
    setState({
      isSlideActive: true,
      slidingValue: value,
    })
    onDragStart?.()
    handleChange(value)
  }

  const handleDragMove = useHandler((event: MouseEvent) => {
    const value = getSlidingValue(event)
    setState({
      slidingValue: value,
      isSliding: true,
    })
    handleChange(value)
  })

  const handleDragEnd = useHandler((event: MouseEvent): void => {
    onDragEnd?.()
    if (isSliding) {
      // 点击动作不需要重复触发 change event
      handleChange(getSlidingValue(event))
    }
    setState({
      isSlideActive: false,
      slidingValue: null,
      isSliding: false,
    })
  })

  useEffect(() => {
    if (isSlideActive) {
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
      return () => {
        document.removeEventListener('mousemove', handleDragMove)
        document.removeEventListener('mouseup', handleDragEnd)
      }
    }
  }, [handleDragEnd, handleDragMove, isSlideActive])

  const handleChange = (value: number) => {
    onChange?.(value)
  }

  const interactionProps = noInteraction
    ? {}
    : {
        tabIndex: 0,
        onFocus,
        onBlur,
        onKeyDown: handleKeyDown,
        onMouseDown: handleDragStart,
      }
  const ratio = getRatio(isSlideActive ? slidingValue! : value, total)
  const bufferedRatio = getRatio(buffered, total)

  return (
    <div className={getClassName('root')} {...interactionProps} role="slider">
      <div className={getClassName('inner')}>
        <div ref={trackRef} className={getClassName('track')}>
          {Boolean(buffered) && (
            <div
              className={getClassName('bar', 'buffered')}
              style={getProgressStyle(bufferedRatio)}
            />
          )}
          <div
            className={getClassName('bar')}
            style={getProgressStyle(ratio)}
          />
          {Boolean(progressDots?.length) && (
            <ProgressDot
              progressDots={progressDots!}
              total={total}
              onProgressDotHover={onProgressDotHover}
              onProgressDotLeave={onProgressDotLeave}
            />
          )}
        </div>
        {!noInteraction && (
          // the position indicator (visible when hovering)
          <div
            className={getClassName('thumbWrapper')}
            style={getProgressThumbStyle(ratio)}
          >
            <div
              className={getClassName(
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

export default Slider
