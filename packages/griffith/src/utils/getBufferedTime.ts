export default function getBufferedTime(currentTime: any, buffered: any) {
  const item = buffered.find(
    (item: any) => item.start <= currentTime && currentTime <= item.end
  )
  if (item) {
    return item.end
  }
  return 0
}
