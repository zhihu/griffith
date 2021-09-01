/**
 * @fileoverview
 *
 * 运行等待所有包文件构建好
 */

const path = require('path')
const {execSync} = require('child_process')

const packages = [
  'griffith',
  'griffith-hls',
  'griffith-message',
  'griffith-mp4',
  'griffith-utils',
]

const distFiles = packages.map(x => {
  const pkgFile = require.resolve(`${x}/package.json`)
  const file = path.resolve(path.dirname(pkgFile), require(pkgFile).module)
  return file
})

execSync(`npx wait-on ${distFiles.join(' ')}`)
