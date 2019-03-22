/**
 * 获得最大公约数
 * @param {number} a
 * @param {number} b
 */
export function getGCD(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('params must be interger number')
  }
  if (a === 0) {
    return Math.abs(b)
  }
  if (b === 0) {
    return Math.abs(a)
  }
  return getGCD(b, a % b)
}

/**
 * 约分
 * @param {number} a
 * @param {number} b
 */
export function reduce(a, b) {
  if (a === 0 || b === 0) {
    throw new Error('params must not be zero')
  }
  const gcd = getGCD(a, b)
  return [a / gcd, b / gcd]
}
