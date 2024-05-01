import { getBlankRedirect, getErrorRedirect, getSuccessRedirect, getURL } from '../src'

describe('getToastRedirect', () => {
	test('getBlankRedirect', () => {
		const message = 'Hello, world!'
		const encodedMessage = encodeURIComponent(message)

		const url = getBlankRedirect('/', message)
		expect(url).toContain(`message=${encodedMessage}`)
	})

	test('getErrorRedirect', () => {
		const message = 'Hello, world!'
		const encodedMessage = encodeURIComponent(message)

		const url = getErrorRedirect('/', message)
		expect(url).toContain(`error=${encodedMessage}`)
	})

	test('getSuccessRedirect', () => {
		const message = 'Hello, world!'
		const encodedMessage = encodeURIComponent(message)

		const url = getSuccessRedirect('/', message)
		expect(url).toContain(`success=${encodedMessage}`)
	})

	test('disable button', () => {
		const message = 'Hello, world!'

		const url = getBlankRedirect('/', message, true)
		expect(url).toContain('disable_button=true')
	})

	test('arbitrary params', () => {
		const message = 'Hello, world!'
		const arbitraryParams = 'foo=bar&baz=qux'

		const url = getBlankRedirect('/', message, false, arbitraryParams)
		expect(url).toContain(arbitraryParams)
	})
})
