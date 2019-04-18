import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require(path.resolve(process.cwd(), 'package.json'))

const externalLibraries = [
  'react',
  'prop-types',
  'eventemitter3',
  'griffith-message',
  'query-string',
  'griffith-utils',
  'isomorphic-bigscreen',
  'element-resize-event',
  /^aphrodite\//,
  /^lodash\//,
]

const external = id =>
  externalLibraries.some(name =>
    name instanceof RegExp ? name.test(id) : name === id
  )

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel(require('./babel.config')),
      // resolves `./directory` to `./directory/index.js`
      resolve({only: [/\/packages\/.*/]}),
    ],
    external,
  },
]
