/**
 * @jest-environment jsdom
 */

import createMessageHelper from '../createMessageHelper'

const waitMessage = () => new Promise((r) => setTimeout(r))

test('calls helper', async () => {
  const helper = createMessageHelper('myId')
  const handler = jest.fn()
  const disposer = helper.subscribeMessage(handler)
  const type = 'foo'
  const data = {foo: 1}
  helper.dispatchMessage(window, type, data)
  await waitMessage()
  expect(handler).toHaveBeenCalledWith(type, data, null)

  disposer.unsubscribe()
  helper.dispatchMessage(window, type, data)
  await waitMessage()
  expect(handler).toHaveBeenCalledTimes(1)
})
