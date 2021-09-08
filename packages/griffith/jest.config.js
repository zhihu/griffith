/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../../jest.config.base')

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  preset: 'es-jest',
}
