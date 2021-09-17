import {useRef} from 'react'

/**
 * Create immutable function ref
 */
const useHandler = <T extends (...args: any[]) => any>(handler: T) => {
  const handlerRef = useRef<T>(handler)
  handlerRef.current = handler
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useRef(((...args: any[]) => handlerRef.current(...args)) as T).current
}

export default useHandler
