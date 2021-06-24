import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({
  root: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    bottom: 0,
    width: '100%',
  },
  item: {
    position: 'absolute',
    width: 12,
    height: '100%',
    transform: 'translate(-50%)',
    ':hover': {
      height: 6,
      top: -1,
    },
  },
  innerItem: {
    width: 6,
    backgroundColor: '#ff9607',
    height: '100%',
    margin: '0 auto',
  },
})
