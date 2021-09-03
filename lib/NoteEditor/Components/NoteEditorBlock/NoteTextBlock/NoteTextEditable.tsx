import { FC, useCallback, useEffect, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import sanitize from 'sanitize-html'

interface NoteTextEditableProps {
	focused?: boolean
	changeFocus?: (index: number) => void
	index: number
	text?: string
	onDeleteClick?: () => void
	onBackspaceWhenEmpty: () => void
	onTextChange: (text: string) => void
}

const NoteTextEditable: FC<NoteTextEditableProps> = (props) => {
	const html = useRef(props.text ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		html.current.length > 0
	)

	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (props.focused) {
			// Move element into view when it is focused
			ref.current?.focus()
		}
	}, [props.focused])

	const handleSelect = useCallback(() => {
		props.changeFocus?.(props.index)
	}, [props])

	return (
		<div className='relative group'>
			{!hidePlaceholder ? (
				<p className='absolute top-0 left-0 z-0 text-text-2 opacity-60'>
					Take a note
				</p>
			) : null}
			<ContentEditable
				innerRef={ref}
				tagName='div'
				html={html.current}
				className='relative z-10 outline-none'
				onClick={handleSelect}
				onKeyUp={(e) => {
					handleSelect()
					if (e.code === 'Backspace' && html.current.length === 0) {
						props.onBackspaceWhenEmpty?.()
					}
				}}
				onChange={(e) => {
					e.target.value.length > 0
						? setHidePlaceholder(true)
						: setHidePlaceholder(false)
					html.current = sanitize(
						e.target.value.replace(/<div>/g, '<br>').replace(/<\/div>/g, ''), {allowedTags : ['br']}
					)
					props.onTextChange(html.current)
				}}
				placeholder='Take a note'
			/>
			<button
				onClick={props.onDeleteClick}
				className='absolute right-0 z-20 p-1 text-xs text-opacity-75 transition-all rounded-md opacity-0 cursor-pointer group-hover:opacity-100 -top-1 text-accent-danger bg-bg-2'
			>
				Delete
			</button>
		</div>
	)
}

export default NoteTextEditable
