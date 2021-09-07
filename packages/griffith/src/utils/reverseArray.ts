/**
 * reverse an array without mutating the original one
 */
export default <T extends Array<any>>(arr: T) => arr.slice().reverse() as T
