module.exports = {
  preset: 'es-jest',
  testEnvironment: 'node',
  setupFiles: [require.resolve('./jest.setup.js')],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    // 约定：入口文件只包含 import/export，不执行逻辑
    '!src/index.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['/__mocks__/'],
}
