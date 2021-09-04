import storage from '../storage'

describe('compatible storage', () => {
  it('storage set & get', () => {
    storage.set('object-storage', {a: 1})

    expect(storage.get('object-storage')).toEqual({a: 1})
  })

  it('storage remove', () => {
    storage.delete('object-storage')
    expect(storage.get('object-storage')).toBeNull()
  })
})
