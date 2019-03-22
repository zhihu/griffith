module.exports = {
  coverageReporters: ['html', 'cobertura', 'lcov'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  collectCoverageFrom: ['packages/**/src/**/*.js'],
  coveragePathIgnorePatterns: [
    'webpack.config.js',
    '.babelrc.js',
    'constants',
    'index.js',
    'styles.js',
    'constants.js',
    'icons',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/[^/]+?/(?!src/)',
    '[^/]+?/__mocks__',
  ],
  transform: {
    '\\.js$': '@zhihu/babel-preset/jest',
  },
  transformIgnorePatterns: ['/node_modules/@babel/runtime/'],
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
