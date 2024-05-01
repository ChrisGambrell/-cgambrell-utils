import { getURL } from '../src'

describe('getURL', () => {
	const OLD_ENV = process.env

	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterAll(() => {
		process.env = OLD_ENV
	})

	describe('local', () => {
		test('""', () => {
			const url = getURL('')
			expect(url).toBe('http://localhost:3000')
		})

		test('"/"', () => {
			const url = getURL('/')
			expect(url).toBe('http://localhost:3000')
		})

		test('"hello"', () => {
			const url = getURL('hello')
			expect(url).toBe('http://localhost:3000/hello')
		})

		test('"/hello"', () => {
			const url = getURL('/hello')
			expect(url).toBe('http://localhost:3000/hello')
		})
	})

	describe('vercel', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_VERCEL_URL = 'https://example.vercel.app'
		})

		test('""', () => {
			const url = getURL('')
			expect(url).toBe('https://example.vercel.app')
		})

		test('"/"', () => {
			const url = getURL('/')
			expect(url).toBe('https://example.vercel.app')
		})

		test('"hello"', () => {
			const url = getURL('hello')
			expect(url).toBe('https://example.vercel.app/hello')
		})

		test('"/hello"', () => {
			const url = getURL('/hello')
			expect(url).toBe('https://example.vercel.app/hello')
		})
	})

	describe('site url', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
		})

		test('""', () => {
			const url = getURL('')
			expect(url).toBe('https://example.com')
		})

		test('"/"', () => {
			const url = getURL('/')
			expect(url).toBe('https://example.com')
		})

		test('"hello"', () => {
			const url = getURL('hello')
			expect(url).toBe('https://example.com/hello')
		})

		test('"/hello"', () => {
			const url = getURL('/hello')
			expect(url).toBe('https://example.com/hello')
		})
	})
})
