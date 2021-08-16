import { FC, FormEvent, useRef, useState } from 'react'
import { Button } from '../../../../components'

interface FromImageLinkProps {
	onSubmit: (imageUrl: string) => void
}

const FromImageLink: FC<FromImageLinkProps> = (props) => {
	const inputRef = useRef<null | HTMLInputElement>(null)
	const [errorMsg, setErrorMsg] = useState<null | string>(null)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const inputVal = inputRef.current?.value ?? ''
		const valid = validateInput(inputVal)
		if (inputVal.length === 0) setErrorMsg('Image link cannot be empty')
		else if (!valid) setErrorMsg('Image link is invalid!')
		else {
			props.onSubmit(inputVal)
			setErrorMsg(null)
		}
	}

	const validateInput = (url: string) => {
		const regex = /https?:\/\/.*\.(?:png|jpg)/
		return regex.test(url)
	}
	
	return (
		<form className='flex flex-col gap-2 p-2' onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				className='pl-2 text-sm border rounded-md outline-none h-7 bg-bg-2 border-border-1'
				placeholder='Paste an image link'
			/>
			{errorMsg && <p className='text-sm text-accent-danger'>{errorMsg}</p>}
			<Button size='sm' className='self-start'>
				Submit
			</Button>
		</form>
	)
}

export default FromImageLink
