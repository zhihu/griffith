import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const pkg = require(path.resolve(process.cwd(), 'package.json'))

const deps = Object.keys({...pkg.dependencies, ...pkg.peerDependencies})
const reExternal = new RegExp(`^(${deps.join('|')})($|/)`)

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
    external: id => (deps.length ? reExternal.test(id) : false),
  },
]
