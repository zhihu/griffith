import logger from '../logger'

describe('logger', () => {
  beforeAll(() => {
    Object.assign(console, {
      warn: jest.fn(),
      log: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    })
  })

  it('should be executing console log', () => {
    logger.log('log', 'foo')

    expect(global.console.log).toHaveBeenCalledWith('[griffith]', 'foo')
  })

  it('should be executing console debug', () => {
    logger.debug('foo')

    expect(global.console.debug).toHaveBeenCalledWith('[griffith]', 'foo')
  })

  it('should be executing console info', () => {
    logger.info('foo')

    expect(global.console.info).toHaveBeenCalledWith('[griffith]', 'foo')
  })

  it('should be executing console warn', () => {
    logger.warn('foo')

    expect(global.console.warn).toHaveBeenCalledWith('[griffith]', 'foo')
  })

  it('should be executing console error', () => {
    logger.error('foo')

    expect(global.console.error).toHaveBeenCalledWith('[griffith]', 'foo')
  })
})
