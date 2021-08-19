import { FC, useCallback, useEffect, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { Checkbox } from '../../../../../components/checkbox'

interface NoteTodoItemEditableProps {
	completed?: boolean
	text?: string
	editing?: boolean
	onEditingEnd?: (text: string) => void
	onEnter?: () => void
	onBackspaceWhenEmpty?: () => void
	onChecked?: () => void
	onTextChange?: (text: string) => void
	onDeleteClick?: () => void
	focused?: boolean
	changeFocus?: (index: number) => void
	index: number
}

const NoteTodoItemEditable: FC<NoteTodoItemEditableProps> = (props) => {
	const text = useRef<string>(props.text ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		text.current.length > 0
	)
	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (props.focused) {
			// Move element into view when it is focused
			ref.current?.focus()
		}
	}, [props.focused])

	const { index, changeFocus } = props

	const handleSelect = useCallback(() => {
		changeFocus?.(index)
	}, [index, changeFocus])

	return (
		<div className='flex items-center gap-2'>
			<Checkbox onClick={props.onChecked} checked={props.completed} />
			<div className='relative flex-1 group'>
				{!hidePlaceholder ? (
					<p className='absolute top-0 left-0 z-0 text-xs text-text-2 opacity-60'>
						Walk the dog
					</p>
				) : null}
				<ContentEditable
					contentEditable={props.editing}
					innerRef={ref}
					tagName='div'
					disabled={!props.editing}
					html={text.current}
					onClick={handleSelect}
					onKeyUp={(e) => {
						handleSelect()
						if (e.code === 'Enter') props.onEnter?.()
						if (e.code === 'Backspace' && text.current.length === 0)
							props.onBackspaceWhenEmpty?.()
					}}
					onBlur={() =>
						props.text !== text.current && props.onEditingEnd?.(text.current)
					}
					onChange={(e) => {
						e.target.value.length > 0
							? setHidePlaceholder(true)
							: setHidePlaceholder(false)
						text.current = e.target.value
							.replace(/<div>/g, '<br>')
							.replace(/<\/div>/g, '')
						props.onTextChange?.(text.current)
					}}
					className={`flex-1 relative z-20 text-xs outline-none ${
						props.completed ? 'line-through text-text-2' : ''
					}`}
				/>
				<button
					onClick={props.onDeleteClick}
					className='absolute right-0 z-20 p-1 text-xs text-opacity-75 transition-all rounded-md opacity-0 cursor-pointer group-hover:opacity-100 -top-1 text-accent-danger bg-bg-2'
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default NoteTodoItemEditable
