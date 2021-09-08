import clamp from 'lodash/clamp'

export default function calculatePercentage(value: any, total: any) {
  if (!total) {
    return `0%`
  }
  return `${clamp(value / total, 0, 1) * 100}%`
}
