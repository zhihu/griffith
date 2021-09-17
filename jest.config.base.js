module.exports = {
  preset: 'es-jest',
  testEnvironment: 'node',
  setupFiles: [require.resolve('./jest/setup.js')],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    // 约定：入口文件只包含 import/export，不执行逻辑
    '!src/index.{js,jsx,ts,tsx}',
    // 约定：只包含类型定义的文件排除
    '!src/**/types.ts',
  ],
  testPathIgnorePatterns: ['/__mocks__/'],
  snapshotSerializers: [require.resolve('./jest/prettier-dom.js')],
}
