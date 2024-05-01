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
