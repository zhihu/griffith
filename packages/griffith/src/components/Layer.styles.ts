import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    pointerEvents: 'none',
    overflow: 'hidden',
  },

  containerFullWidth: {
    width: '100%',
    height: 'auto',
    top: '50%',
    left: 0,
    transform: 'translate(0, -50%)',
  },

  containerFullHeight: {
    width: 'auto',
    height: '100%',
    top: 0,
    left: '50%',
    transform: 'translate(-50%)',
  },

  image: {
    display: 'block',
    visibility: 'hidden',
  },

  imageFullWidth: {
    width: '100%',
    height: 'auto',
  },

  imageFullHeight: {
    width: 'auto',
    height: '100%',
  },

  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
})
