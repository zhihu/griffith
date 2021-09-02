enum LogLevel {
  LOG = 'log',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const logger = {
  log(level: `${LogLevel}`, ...params: any[]) {
    /* eslint-disable no-console */
    const method = console[level] ? level : 'log'
    console[method]('[griffith]', ...params)
    /* eslint-enable no-console */
  },

  debug(...args: any[]) {
    this.log(LogLevel.DEBUG, ...args)
  },

  info(...args: any[]) {
    this.log(LogLevel.INFO, ...args)
  },

  warn(...args: any[]) {
    this.log(LogLevel.WARN, ...args)
  },

  error(...args: any[]) {
    this.log(LogLevel.ERROR, ...args)
  },
}

export default logger
