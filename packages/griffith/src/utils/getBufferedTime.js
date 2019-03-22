export default function getBufferedTime(currentTime, buffered) {
  const item = buffered.find(
    item => item.start <= currentTime && currentTime <= item.end
  )
  if (item) {
    return item.end
  }
  return 0
}
