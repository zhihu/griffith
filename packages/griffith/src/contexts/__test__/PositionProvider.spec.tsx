import React, {useContext, useEffect, useRef} from 'react'
import {act, render} from '@testing-library/react'
import PositionContext, {PositionContextValue} from '../PositionContext'
import PositionProvider from '../PositionProvider'

const waitRAF = () => new Promise(requestAnimationFrame)

test('PositionProvider', async () => {
  let ctx!: PositionContextValue
  const MyComponent = () => {
    const ref = useRef<HTMLDivElement>(null)
    const value = (ctx = useContext(PositionContext))
    useEffect(() => {
      Object.defineProperties(ref.current?.parentNode, {
        getBoundingClientRect: {
          value() {
            return {width: 100, height: 100}
          },
        },
      })
      value.updateVideoSize({videoWidth: 100, videoHeight: 100})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div ref={ref} />
  }

  await act(async () => {
    render(
      <PositionProvider>
        <MyComponent />
      </PositionProvider>
    )
    expect(ctx).toMatchInlineSnapshot(`
    Object {
      "helperImageSrc": null,
      "isFullWidth": false,
      "updateVideoSize": [Function],
    }
    `)
    // Provider 内使用了 raf 延迟更新状态
    await waitRAF()
    expect(ctx).toMatchInlineSnapshot(`
    Object {
      "helperImageSrc": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'></svg>",
      "isFullWidth": true,
      "updateVideoSize": [Function],
    }
    `)
  })
})
