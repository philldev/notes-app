import { CheckIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { CheckboxProps } from './types'

const Checkbox: FC<CheckboxProps> = (props) => (
	<button
		className={`w-4 h-4 rounded-full border border-text-1 flex items-center justify-center ${
			props.checked ? 'bg-text-1' : ''
		}`}
		{...props}
	>
		{props.checked && <CheckIcon className='w-3 h-3 text-text-button' />}
	</button>
)

export default Checkbox
