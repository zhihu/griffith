import clamp from 'lodash/clamp'

export default function calculatePercentage(value: number, total?: number) {
  if (!total) {
    return `0%`
  }
  return `${clamp(value / total, 0, 1) * 100}%`
}
