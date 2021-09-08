import memoize from 'lodash/memoize'

const compatibleStorage = {
  store: {},
  setItem(key: any, value: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this.store[key] = value
  },
  removeItem(key: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return delete this.store[key]
  },
  getItem(key: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this.store[key]
  },
}

// @ts-expect-error ts-migrate(7022) FIXME: 'storage' implicitly has type 'any' because it doe... Remove this comment to see the full error message
const storage = {
  isSupported: memoize(() => {
    try {
      const testSupport = {
        key: '__test_support_key__',
        value: '__test_support_value__',
      }
      const supported = Boolean((global as any).localStorage)
      localStorage.setItem(testSupport.key, testSupport.value)
      localStorage.removeItem(testSupport.key)
      return supported
    } catch (err) {
      return false
    }
  }),

  getStorage: memoize(() =>
    storage.isSupported() ? localStorage : compatibleStorage
  ),

  set(key: any, value: any) {
    storage.getStorage().setItem(key, JSON.stringify(value))
  },

  get(key: any) {
    try {
      const value = storage.getStorage().getItem(key)
      return JSON.parse(value)
    } catch (error) {
      return null
    }
  },

  delete(key: any) {
    storage.getStorage().removeItem(key)
  },
}

export default storage
