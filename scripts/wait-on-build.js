/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @fileoverview
 *
 * 运行等待所有包文件构建好
 */

const path = require('path')
const {execSync} = require('child_process')

const packages = [
  // 已使用 alias
  // 'griffith',
  // 'griffith-message',
  // 'griffith-utils',
  'griffith-hls',
  'griffith-mp4',
]

const distFiles = packages.map((x) => {
  const pkgFile = require.resolve(`${x}/package.json`)
  const file = path.resolve(path.dirname(pkgFile), require(pkgFile).module)
  return file
})

execSync(`npx wait-on ${distFiles.join(' ')}`)
