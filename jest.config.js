module.exports = {
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
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
