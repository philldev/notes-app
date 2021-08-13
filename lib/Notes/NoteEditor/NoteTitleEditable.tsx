import { FC, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'

interface NoteTitleEditableProps {
	title?: string
}

const NoteTitleEditable: FC<NoteTitleEditableProps> = (props) => {
	const html = useRef(props.title ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		html.current.length > 0
	)

	return (
		<div className='relative'>
			{!hidePlaceholder ? (
				<p className='absolute top-0 left-0 z-0 text-lg font-bold text-text-1 opacity-60'>
					Note Title
				</p>
			) : null}
			<ContentEditable
				html={html.current}
				className='relative z-10 text-lg font-bold outline-none'
				onChange={(e) => {
					e.target.value.length > 0
						? setHidePlaceholder(true)
						: setHidePlaceholder(false)
					html.current = e.target.value
				}}
				placeholder='Take a note'
			/>
		</div>
	)
}

export default NoteTitleEditable
