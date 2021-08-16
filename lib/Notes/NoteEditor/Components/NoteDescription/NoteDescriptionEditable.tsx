import { FC, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'

interface NoteDescriptionEditableProps {
	description?: string
	onUpdate?: (title: string) => void
	onBackspaceWhenEmpty?: () => void
}

const NoteDescriptionEditable: FC<NoteDescriptionEditableProps> = (props) => {
	const html = useRef(props.description ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		html.current.length > 0
	)
	return (
		<div className='relative'>
			{!hidePlaceholder ? (
				<p className='absolute top-0 left-0 z-0 text-xs text-text-1 opacity-60'>
					Note Description
				</p>
			) : null}
			<ContentEditable
				html={html.current}
				className='relative z-10 text-xs outline-none'
				onKeyUp={(e) => {
					if (e.code === 'Backspace' && html.current.length === 0) {
						props.onBackspaceWhenEmpty?.()
					}
				}}
				onChange={(e) => {
					e.target.value.length > 0
						? setHidePlaceholder(true)
						: setHidePlaceholder(false)
					html.current = e.target.value
					props.onUpdate?.(html.current)
				}}
				placeholder='Note description'
			/>
		</div>
	)
}

export default NoteDescriptionEditable
