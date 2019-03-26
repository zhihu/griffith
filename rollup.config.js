import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require(path.resolve(process.cwd(), 'package.json'))

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [
      babel(require('./babel.config')),
      // resolves `./directory` to `./directory/index.js`
      resolve({only: [/\/packages\/.*/]}),
    ],
  },
]
