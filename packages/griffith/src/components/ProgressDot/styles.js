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
    backgroundColor: '#ff9607',
    width: '6px',
    height: '100%',
    transform: 'translate(-50%)',
  },
})
