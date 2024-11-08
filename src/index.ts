import { endOfMonth, startOfMonth, subMonths } from 'date-fns'
import { z } from 'zod'

export function add(a: number, b: number): number {
	return a + b
}

export const getURL = (path: string = '') => {
	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_SITE_URL
			: process?.env?.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_VERCEL_URL
			: 'http://localhost:3000/'

	// Trim the URL and remove trailing slash if exists.
	url = url.replace(/\/+$/, '')
	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`
	// Ensure path starts without a slash to avoid double slashes in the final URL.
	path = path.replace(/^\/+/, '')

	// Concatenate the URL and the path.
	return path ? `${url}/${path}` : url
}

const toastKeyMap = {
	blank: 'message',
	error: 'error',
	success: 'success',
} as const

const getToastRedirect = (path: string, type: keyof typeof toastKeyMap, message: string, arbitraryParams: string = '') => {
	const key = toastKeyMap[type]

	let redirectPath = `${path}?${key}=${encodeURIComponent(message)}`
	if (arbitraryParams) redirectPath += `&${arbitraryParams}`

	return redirectPath
}

export const getBlankRedirect = (path: string, message: string = '', arbitraryParams: string = '') =>
	getToastRedirect(path, 'blank', message, arbitraryParams)

export const getErrorRedirect = (path: string, message: string = '', arbitraryParams: string = '') =>
	getToastRedirect(path, 'error', message, arbitraryParams)

export const getSuccessRedirect = (path: string, message: string = '', arbitraryParams: string = '') =>
	getToastRedirect(path, 'success', message, arbitraryParams)

// TODO: Need to add testing
export const parseFormData = <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
): { data: z.infer<T>; errors?: undefined } | { data?: undefined; errors: z.inferFlattenedErrors<T>['fieldErrors'] } => {
	const data = Object.fromEntries(formData)
	const parsedData = schema.safeParse(data)

	if (!parsedData.success) return { errors: parsedData.error.flatten().fieldErrors }
	return { data: parsedData.data }
}

export function parseSubFormData(formData: FormData, prefix: string) {
	const rawData = Object.fromEntries(formData)
	const data = new FormData()

	for (const [key, value] of Object.entries(rawData)) {
		if (key.startsWith(`${prefix}.`)) data.set(key.replace(`${prefix}.`, ''), value)
	}

	return data
}

export function parseSubData(formData: FormData, prefix: string) {
	const rawData = Object.fromEntries(formData)
	const data = new FormData()

	for (const [key, value] of Object.entries(rawData)) {
		if (key.startsWith(`${prefix}.`)) data.set(key.replace(`${prefix}.`, ''), value)
	}

	return Object.fromEntries(data)
}

export type Params = Promise<{ [key: string]: string }>
// BUG: There might be an issue with the SearchParams type and being undefined
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type ServerProps = { params: Params; searchParams: SearchParams }
export type LayoutProps = { children: React.ReactNode; params: Params }

export const getSearchParam = async (searchParam: SearchParams, key: string): Promise<string | undefined> => {
	const value = (await searchParam)?.[key]
	if (Array.isArray(value)) return value[0]
	return value
}

export const getSearchParamDates = async (searchParams: SearchParams, months: number) => {
	const startDateSearchParam = await getSearchParam(searchParams, 'startDate')
	const endDateSearchParam = await getSearchParam(searchParams, 'endDate')

	const startDate = !!startDateSearchParam ? new Date(startDateSearchParam) : startOfMonth(subMonths(new Date(), months))
	const endDate = endDateSearchParam ? new Date(endDateSearchParam) : endOfMonth(new Date())

	return { startDate, endDate }
}
