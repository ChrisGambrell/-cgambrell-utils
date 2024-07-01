import * as React from 'react'
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

const getToastRedirect = (
	path: string,
	type: keyof typeof toastKeyMap,
	message: string,
	disableButton: boolean = false,
	arbitraryParams: string = ''
) => {
	const key = toastKeyMap[type]

	let redirectPath = `${path}?${key}=${encodeURIComponent(message)}`
	if (disableButton) redirectPath += '&disable_button=true'
	if (arbitraryParams) redirectPath += `&${arbitraryParams}`

	return redirectPath
}

export const getBlankRedirect = (path: string, message: string = '', disableButton: boolean = false, arbitraryParams: string = '') =>
	getToastRedirect(path, 'blank', message, disableButton, arbitraryParams)

export const getErrorRedirect = (path: string, message: string = '', disableButton: boolean = false, arbitraryParams: string = '') =>
	getToastRedirect(path, 'error', message, disableButton, arbitraryParams)

export const getSuccessRedirect = (path: string, message: string = '', disableButton: boolean = false, arbitraryParams: string = '') =>
	getToastRedirect(path, 'success', message, disableButton, arbitraryParams)

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

export type Params = { [key: string]: string }
export type SearchParams = { [key: string]: string | string[] | undefined }
export type ServerProps = { params: Params; searchParams: SearchParams }
export type LayoutProps = { children: React.ReactNode; params: Params }

export const getSearchParam = (searchParam: SearchParams, key: string): string | undefined => {
	const value = searchParam[key]
	if (Array.isArray(value)) return value[0]
	return value
}
