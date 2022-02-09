import {useCallback, useState} from 'react'

const useSetState = <T extends Record<string, unknown>>(
  initialState: T = {} as T
) => {
  const [state, setState] = useState<T>(initialState)
  const setPartial = useCallback(
    (nextState: Partial<T>) =>
      setState((prevState) => ({...prevState, ...nextState})),
    []
  )
  return [state, setPartial] as const
}

export default useSetState
