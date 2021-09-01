module.exports = {
  setupFiles: [require.resolve('./jest.setup.js')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['/__mocks__/'],
}
