import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import findCacheDir from 'find-cache-dir'

const resolveCwd = path.resolve.bind(null, process.cwd())
const pkg = require(resolveCwd('package.json'))
const deps = Object.keys({...pkg.dependencies, ...pkg.peerDependencies})
const reExternal = new RegExp(`^(${deps.join('|')})($|/)`)

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
      typescript({
        cacheRoot: findCacheDir({
          name: 'rollup-plugin-typescript2',
          cwd: __dirname,
        }),
        tsconfigOverride: {
          include: [resolveCwd('src/**/*')],
          exclude: ['**/*.spec.*', '**/__tests__'],
          compilerOptions: {
            // reset to empty
            paths: {},
          },
        },
      }),
    ],
    external: (id) => (deps.length ? reExternal.test(id) : false),
  },
]
