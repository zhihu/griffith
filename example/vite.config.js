import {loadConfig, createMatchPath} from 'tsconfig-paths'
import react from '@vitejs/plugin-react'

const result = loadConfig()
const matchPath = createMatchPath(result.absoluteBaseUrl, result.paths)

const packagesAliases = Object.fromEntries(
  Object.keys(result.paths).map((x) => {
    return [x, matchPath(x)]
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
  plugins: [react()],
}
