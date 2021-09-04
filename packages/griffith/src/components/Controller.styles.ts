import {StyleSheet} from 'aphrodite/no-important'

export default StyleSheet.create({
  root: {
    height: '5em',
    padding: '0 0.5em',
  },
  rootTop: {
    height: '2em',
  },
  rootBottom: {
    height: '2.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rootBottomLeft: {
    display: 'flex',
  },
  rootBottomRight: {
    display: 'flex',
  },
  button: {
    display: 'block',
    width: '2.5em',
    height: '2.5em',
    margin: 0,
    padding: '0.5em',
    border: 'none',
    borderRadius: 0,
    fontSize: 'inherit',
    color: 'rgba(255, 255, 255, 0.7)',
    background: 'none',
    cursor: 'pointer',
    transition: 'color 300ms',

    ':hover': {
      color: '#fff',
    },

    ':focus': {
      outline: 'none',
    },
  },

  menuContainer: {
    position: 'relative',
  },

  menu: {
    position: 'absolute',
    left: '50%',
    bottom: '100%',
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateX(-50%)',
    transition: 'visibility 300ms, opacity 300ms',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
  },

  menuShown: {
    visibility: 'visible',
    opacity: 1,
  },

  timeline: {
    flex: 1,
  },

  timelineHolder: {
    flex: 1,
  },

  time: {
    padding: '0 0.5em',
    width: '100px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    fontSize: '0.875em',
    lineHeight: 2.5,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  qualityButton: {
    width: 'auto',
    lineHeight: 1.5,
  },

  qualityButtonText: {
    fontSize: '0.875em',
  },

  qualityMenu: {
    padding: '0.25em 0',
  },

  qualityMenuItem: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    height: '2em',
    margin: 0,
    padding: '0 0.75em',
    border: 'none',
    borderRadius: 0,
    fontSize: '0.875em',
    lineHeight: 2,
    whiteSpace: 'nowrap',
    color: 'rgba(255, 255, 255, 0.5)',
    background: 'none',
    cursor: 'pointer',
    transition: 'color 300ms, background-color 300ms',

    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },

    ':focus': {
      outline: 'none',
    },
  },

  qualityMenuActiveItem: {
    color: '#fff',
  },

  fullScreenTooltip: {
    pointerEvents: 'none',
  },

  fullScreenedTime: {
    width: '150px',
  },

  fullScreenTooltipWide: {
    left: '30%',
  },

  pipTooltip: {
    pointerEvents: 'none',
  },
})
