import React, {useContext, useEffect} from 'react'
import {act, render, RenderResult} from '@testing-library/react'
import ObjectFitContext, {
  ObjectFit,
  ObjectFitContextValue,
} from '../ObjectFitContext'
import ObjectFitProvider from '../ObjectFitProvider'

test('ObjectFitProvider', () => {
  let ctx!: ObjectFitContextValue
  const values: ObjectFit[] = []
  const MyComponent = () => {
    const value = (ctx = useContext(ObjectFitContext))
    useEffect(() => {
      values.push(value.objectFit)
    }, [value])
    return null
  }

  let result!: RenderResult
  act(() => {
    result = render(
      <ObjectFitProvider>
        <MyComponent />
      </ObjectFitProvider>
    )
  })

  act(() => {
    ctx.setObjectFit('fill')
  })

  act(() => {
    result.rerender(
      <ObjectFitProvider initialObjectFit="cover">
        <MyComponent />
      </ObjectFitProvider>
    )
  })

  expect(values).toMatchInlineSnapshot(`
  Array [
    "contain",
    "fill",
    "cover",
  ]
  `)
})
