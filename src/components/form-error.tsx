import * as React from 'react'
import toast from 'react-hot-toast'

export function FormError({ hidden = false, value }: { hidden?: boolean; value: string[] | undefined }) {
	React.useEffect(() => {
		if (!hidden) return
		if (value?.length && value.length > 0) toast.error(`FATAL: ${value[0]}`)
	}, [hidden, value])

	if (hidden || !value || !value.length) return null
	return <div className='text-sm text-destructive'>{value[0]}</div>
}
