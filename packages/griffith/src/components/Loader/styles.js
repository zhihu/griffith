import {StyleSheet} from 'aphrodite/no-important'

const SIZE = 64
const BORDER = 3
const RADIUS = (SIZE - BORDER) / 2
const PERIMETER = 2 * Math.PI * RADIUS

const animation = {
  '0%': {
    transform: 'rotate(0deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
}

const circleAnimation = {
  '0%': {
    strokeDashoffset: PERIMETER,
    transform: 'rotate(0deg)',
  },

  '50%': {
    strokeDashoffset: PERIMETER / 4,
    transform: 'rotate(90deg)',
  },

  '100%': {
    strokeDashoffset: PERIMETER,
    transform: 'rotate(360deg)',
  },
}

export default StyleSheet.create({
  root: {
    width: '4em',
    height: '4em',
  },

  svg: {
    display: 'block',
    width: '100%',
    height: '100%',
    animationName: animation,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },

  circle: {
    cx: '50%',
    cy: '50%',
    r: RADIUS,
    strokeDasharray: PERIMETER,
    stroke: 'currentColor',
    strokeWidth: BORDER,
    strokeLinecap: 'round',
    fill: 'none',
    transformOrigin: 'center',
    animationName: circleAnimation,
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
})
