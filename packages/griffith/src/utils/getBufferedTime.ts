export default function getBufferedTime(
  currentTime: number,
  buffered: {start: number; end: number}[]
): number {
  const item = buffered.find(
    (item) => item.start <= currentTime && currentTime <= item.end
  )
  if (item) {
    return item.end
  }
  return 0
}
