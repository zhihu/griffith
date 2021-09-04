import {StyleSheet} from 'aphrodite/no-important'

const actionAnimation = {
  '0%': {
    opacity: 0,
    transform: 'scale(0)',
  },

  '50%': {
    opacity: 0.6,
    transform: 'scale(0.8)',
  },

  '100%': {
    opacity: 0,
    transform: 'scale(1)',
  },
}

const fadeinAnimation = {
  '0%': {
    opacity: 0,
  },

  '100%': {
    opacity: 1,
  },
}

const breakpoints = {
  mobile: '26em', // 416px
}

const breakTo = breakpoint =>
  `@media screen and (max-width: ${breakpoints[breakpoint]})`

export default StyleSheet.create({
  root: {
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    width: '100%',
    height: '100%',
    fontSize: 16,
    backgroundColor: '#000',

    ':focus': {
      outline: 'none',
    },
  },

  fullScreened: {
    fontSize: 24,
  },
  pageFullScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100000,
  },

  actionButton: {
    width: '4.5em',
    height: '4.5em',
  },

  actionButtonAnimated: {
    animationName: actionAnimation,
    animationDuration: '600ms',
    animationFillMode: 'both',
  },

  actionIcon: {
    width: '4.5em',
    height: '4.5em',

    [breakTo('mobile')]: {
      transform: 'scale(0.75)',
    },
  },

  video: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  overlayMask: {
    background: 'rgba(0, 0, 0, 0.08)',
  },

  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    color: '#0f88eb',
    transform: 'translate(-50%, -50%)',
  },

  action: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
    padding: '0 1em',
    lineHeight: 2.5,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#fff',
    backgroundImage:
      'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
    transform: 'translateY(-100%)',
    transition: 'transform 300ms',
  },

  titleShown: {
    transform: 'translateY(0)',
  },

  controller: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))',
  },

  volumeButton: {
    position: 'absolute',
    bottom: 0,
    right: 8,
  },

  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#000',
    cursor: 'pointer',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 300ms, opacity 300ms',
  },

  coverShown: {
    visibility: 'visible',
    opacity: 1,
  },

  coverImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },

  coverTime: {
    position: 'absolute',
    right: '0.5em',
    bottom: '0.5em',
    padding: '0.375em',
    fontSize: '0.875em',
    lineHeight: 1,
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'transparent',
    textShadow: '0 0 6px rgba(0, 0, 0, 0.4)',
  },

  coverTimeMobile: {
    padding: 0,
  },

  coverAction: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  coverReplayAction: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    animationName: fadeinAnimation,
    animationDuration: '600ms',
    animationFillMode: 'both',
  },

  coverReplayButton: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    height: '40px',
    width: '116px',
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '8px',
    boxSizing: 'border-box',
    textAlign: 'center',
    transition: 'transform 200ms, opacity 200ms',
    willChange: 'transform',
  },

  coverReplayButtonHovered: {
    transform: 'scale(1.1)',
  },

  coverReplayButtonPressed: {
    opacity: '0.7',
  },

  replayIcon: {
    verticalAlign: 'top',
    marginRight: '4px',
  },

  error: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#000',
  },

  errorIcon: {
    width: '2.5em',
    height: '2.5em',
    margin: '0 auto',
    fill: 'currentColor',
  },

  errorMessage: {
    marginTop: '1em',
    fontSize: '1.25em',
    lineHeight: 1,
    textAlign: 'center',
  },
})
export const hiddenOrShownStyle = StyleSheet.create({
  base: {
    transition: `opacity .5s ease-in-out, visibility .5s ease-in-out`,
  },

  hidden: {
    opacity: 0,
    visibility: 'hidden',
  },

  shown: {
    opacity: 1,
    visibility: 'visible',
  },
})
