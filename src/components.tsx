// TODO: Add tests for components

import * as React from 'react'

export function FormError({ value }: { value: string[] | undefined }) {
	if (!value || !value.length) return null
	return <div className='text-sm text-destructive'>{value[0]}</div>
}
