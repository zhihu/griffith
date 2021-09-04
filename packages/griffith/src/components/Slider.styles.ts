import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({
  root: {
    overflow: 'hidden',
    userSelect: 'none',
    cursor: 'pointer',
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',

    ':focus': {
      outline: 'none',
    },
  },

  inner: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  track: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '2px',
  },

  bar: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '2px 0 0 2px',
  },

  thumbWrapper: {
    position: 'absolute',
  },

  thumb: {
    width: '1em',
    height: '1em',
    margin: '-0.5em',
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
})

export const horizontal = StyleSheet.create({
  root: {
    height: '1em',
    padding: `0 0.5em`,
  },

  inner: {
    flexDirection: 'row',
  },

  track: {
    height: 4,
  },

  bar: {
    top: 0,
    bottom: 0,
  },

  thumbWrapper: {
    top: '50%',
  },
})

export const vertical = StyleSheet.create({
  root: {
    width: '1em',
    padding: `0.5em 0`,
  },

  inner: {
    flexDirection: 'column',
  },

  track: {
    width: 4,
  },

  bar: {
    left: 0,
    right: 0,
  },

  thumbWrapper: {
    left: '50%',
  },
})
