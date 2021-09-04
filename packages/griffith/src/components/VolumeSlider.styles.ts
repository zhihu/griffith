import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({
  root: {
    padding: '0.375em 0',
  },
})

export const slider = StyleSheet.create({
  root: {
    width: '2.5em',
    height: '4em',
  },

  track: {
    margin: '-0.4em 0',
    // 之前是 -0.5em（thumb 的半径），是为了在 0 或 100% 的情况下，让 thumb 的边缘和 track 的边缘平齐
    // 因为下面缩放了 0.8 所以改为 0.5em * 0.8 = 0.4em
    // workaround for bug with overflow: hidden; in chrome
    transform: 'translate3d(0, 0, 0)',
  },

  thumb: {
    transform: 'scale(0.8)',
    transition: 'transform 300ms',

    ':hover': {
      transform: 'scale(1)',
    },
  },

  thumbSliding: {
    transform: 'scale(1)',
  },
})
