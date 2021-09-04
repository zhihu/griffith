import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({})

export const slider = StyleSheet.create({
  root: {
    height: 40,
  },

  track: {
    transition: 'transform 300ms',
  },

  bar: {
    backgroundColor: '#0f88eb',
  },

  thumb: {
    transform: 'scale(0)',
    transition: 'transform 300ms',
  },

  buffered: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '2px 0 0 2px',
  },
})

export const hoveredSlider = StyleSheet.create({
  thumb: {
    transform: 'scale(1)',
  },
})

export const dotHoveredSlider = StyleSheet.create({
  track: {
    overflow: 'visible',
  },
})

export const minimal = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    height: '3px',
  },

  track: {
    borderRadius: 0,
  },

  thumb: {
    display: 'none',
  },

  buffered: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '2px 0 0 2px',
  },
})
