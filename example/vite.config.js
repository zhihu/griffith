/* eslint-disable */
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

const packages = [
  'griffith',
  'griffith-message',
  'griffith-utils',
  'griffith-hls',
  'griffith-mp4',
]

const packagesAliases = Object.fromEntries(
  packages.map((x) => {
    const pkgFile = require.resolve(`${x}/package.json`)
    const file = path.resolve(path.dirname(pkgFile), require(pkgFile).source)
    return [x, file]
  })
)

/**
 * @see https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      ...packagesAliases,
    },
  },
  plugins: [reactRefresh()],
}
