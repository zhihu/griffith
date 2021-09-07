import memoize from 'lodash/memoize'

type CustomStorage = {
  store: {[key: string]: any}
  getItem(key: string): string
  setItem(key: string, value: any): void
  removeItem(key: string): boolean
}

type Storage = {
  isSupported(): boolean
  get(key: string): Object
  set(key: string, value: any): void
  delete(key: string): void
  getStorage(): CustomStorage | typeof localStorage
}

const compatibleStorage: CustomStorage = {
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

const storage: Storage = {
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

  get(key) {
    try {
      const value = storage.getStorage().getItem(key)
      return JSON.parse(value!)
    } catch (error) {
      return null
    }
  },

  delete(key) {
    storage.getStorage().removeItem(key)
  },
}

export default storage
