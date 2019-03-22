import memoize from 'lodash/memoize'

const compatibleStorage = {
  store: {},
  setItem(key, value) {
    this.store[key] = value
  },
  removeItem(key) {
    return delete this.store[key]
  },
  getItem(key) {
    return this.store[key]
  },
}

const storage = {
  isSupported: memoize(() => {
    try {
      const testSupport = {
        key: '__test_support_key__',
        value: '__test_support_value__',
      }
      const supported = Boolean(global.localStorage)
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

  set(key, value) {
    storage.getStorage().setItem(key, JSON.stringify(value))
  },

  get(key) {
    try {
      const value = storage.getStorage().getItem(key)
      return JSON.parse(value)
    } catch (error) {
      return null
    }
  },

  delete(key) {
    storage.getStorage().removeItem(key)
  },
}

export default storage
