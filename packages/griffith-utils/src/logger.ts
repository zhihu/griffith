const logger = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',

  log(level, message, ...params) {
    /* eslint-disable no-console */
    const method = console[level] ? level : 'log'
    console[method]('[griffith] ' + message, ...params)
    /* eslint-enable no-console */
  },

  debug(...args) {
    this.log(this.DEBUG, ...args)
  },

  info(...args) {
    this.log(this.INFO, ...args)
  },

  warn(...args) {
    this.log(this.WARN, ...args)
  },

  error(...args) {
    this.log(this.ERROR, ...args)
  },
}

export default logger
