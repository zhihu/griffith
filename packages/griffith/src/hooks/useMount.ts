import React, {useEffect} from 'react'

/**
 * Mount callback
 */
export default function useMount(effect: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
