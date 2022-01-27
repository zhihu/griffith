import {useRef} from 'react'

/**
 * Get last changed value (useful for object comparison)
 */
const useChanged = <T extends any>(value: T) => {
  const ref = useRef<T>(value)
  if (
    value !== ref.current &&
    JSON.stringify(value) !== JSON.stringify(ref.current)
  ) {
    ref.current = value
  }
  return ref.current
}

export default useChanged
