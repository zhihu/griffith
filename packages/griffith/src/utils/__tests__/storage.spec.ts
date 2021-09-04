import 'jest-localstorage-mock'
import storage from '../storage'

describe('storage', () => {
  it('storage set & get', () => {
    storage.set('object-storage', {a: 1})
    storage.set('array-storage', [1, 2])
    storage.set('string-storage', '1')
    storage.set('number-storage', 1)
    storage.set('null-storage', null)
    storage.set('undefined-storage', undefined)

    expect(storage.get('object-storage')).toEqual({a: 1})
    expect(storage.get('array-storage')).toEqual([1, 2])
    expect(storage.get('string-storage')).toEqual('1')
    expect(storage.get('number-storage')).toEqual(1)
    expect(storage.get('null-storage')).toBeNull()
    expect(storage.get('undefined-storage')).toBeNull()
  })

  it('storage delete', () => {
    storage.set('object-storage', {a: 1})
    storage.delete('object-storage')
    expect(storage.get('object-storage')).toBeNull()
  })
})
