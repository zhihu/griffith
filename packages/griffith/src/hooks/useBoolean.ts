import {useCallback, useState} from 'react'

/**
 * Create a boolean value and switches for changing it
 *
 * ```js
 * const [isOpen, isOpenSwitch] = useBoolean()
 *
 * <Button onClick={isOpenSwitch.on} label="Open" />
 * <Button onClick={isOpenSwitch.off} label="Close" />
 * <Button onClick={isOpenSwitch.toggle} label="Toggle" />
 * ```
 */
const useBoolean = (initialState: boolean | (() => boolean) = false) => {
  const [value, setValue] = useState(initialState)
  const valueSwitch = {
    on: useCallback(() => setValue(true), []),
    off: useCallback(() => setValue(false), []),
    toggle: useCallback(() => setValue((v) => !v), []),
  } as const
  return [value, valueSwitch] as const
}

export default useBoolean
