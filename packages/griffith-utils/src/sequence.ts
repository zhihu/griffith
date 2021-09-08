/* eslint-disable @typescript-eslint/no-unsafe-return */
type AnyFunction = (...args: any[]) => any

export default function sequence(...fns: AnyFunction[]) {
  return (...args: any[]) => fns.reduce((_, fn) => fn(...args), null)
}
