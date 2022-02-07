import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import {css} from 'aphrodite/no-important'
import styles from './Player.styles'
import Icon from './Icon'

type State = {
  label?: string
  icon?: React.ReactElement
}
type InternalState = {key: string} & State
export type ActionToastDispatch = (s: State) => void

const ActionToastStateContext = createContext<InternalState | void>(void 0)
export const ActionToastDispatchContext = createContext<ActionToastDispatch>(
  () => {
    // noop
  }
)

/** 触发操作反馈 */
export const useActionToastDispatch = () =>
  useContext(ActionToastDispatchContext)

/**
 * 操作反馈提示（主要提示用户热键或鼠标操作的结果）
 */
export const ActionToastProvider: React.FC = ({children}) => {
  const [state, setState] = useState<InternalState>()
  const lastKey = useRef(0)
  const dispatch = useCallback((state) => {
    // 每一次设定必定是创建一个新的提示，key 的变化让元素重新 mount，CSS 动画得以执行
    lastKey.current += 1
    setState({...state, key: String(lastKey.current)})
  }, [])

  return (
    <ActionToastStateContext.Provider value={state}>
      <ActionToastDispatchContext.Provider value={dispatch}>
        {children}
      </ActionToastDispatchContext.Provider>
    </ActionToastStateContext.Provider>
  )
}

/** 操作反馈提示的目标渲染位置 */
export const ActionToastOutlet = React.memo(() => {
  const state = useContext(ActionToastStateContext)
  if (!state) {
    return null
  }

  const {key, icon, label} = state

  return (
    <div className={css(styles.action, styles.actionToast)} key={key}>
      <div className={css(styles.actionButton, styles.actionButtonAnimated)}>
        {icon && <Icon icon={icon} styles={styles.actionIcon} />}
      </div>
      {label && (
        <div className={css(styles.actionLabel, styles.actionLabelAnimation)}>
          {label}
        </div>
      )}
    </div>
  )
})
