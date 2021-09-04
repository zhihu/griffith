// https://github.com/zloirock/core-js/issues/280
function pad(number) {
  let result = String(number)
  if (result.length < 2) {
    result = '0' + result
  }
  return result
}

export default function formatTime(time) {
  if (!Number.isFinite(time)) return ''

  time = Math.floor(time)
  const seconds = time % 60
  const minutes = Math.floor(time / 60)
  return `${pad(minutes)}:${pad(seconds)}`
}
