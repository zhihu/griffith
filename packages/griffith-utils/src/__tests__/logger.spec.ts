import logger from '../logger'

describe('logger', () => {
  beforeAll(() => {
    // @ts-expect-error ts-migrate(2740) FIXME: Type '{ warn: Mock<any, any>; log: Mock<any, any>;... Remove this comment to see the full error message
    global.console = {
      warn: jest.fn(),
      log: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    }
  })

  it('should be executing console log', () => {
    logger.log('log', '@zhihu-griffith')

    expect(global.console.log).toHaveBeenCalledWith(
      '[griffith] @zhihu-griffith'
    )
  })

  it('should be executing console debug', () => {
    logger.debug('@zhihu-griffith')

    expect(global.console.debug).toHaveBeenCalledWith(
      '[griffith] @zhihu-griffith'
    )
  })

  it('should be executing console info', () => {
    logger.info('@zhihu-griffith')

    expect(global.console.info).toHaveBeenCalledWith(
      '[griffith] @zhihu-griffith'
    )
  })

  it('should be executing console warn', () => {
    logger.warn('@zhihu-griffith')

    expect(global.console.warn).toHaveBeenCalledWith(
      '[griffith] @zhihu-griffith'
    )
  })

  it('should be executing console error', () => {
    logger.error('@zhihu-griffith')

    expect(global.console.error).toHaveBeenCalledWith(
      '[griffith] @zhihu-griffith'
    )
  })
})
