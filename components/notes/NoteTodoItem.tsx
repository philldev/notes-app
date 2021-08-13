import { FC, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { Checkbox } from '../checkbox'

interface NoteBoxTodoItemProps {
	completed?: boolean
	text?: string
	editing?: boolean
	onEditingEnd?: (text: string) => void
	onEnter?: () => void
	onBackspaceWhenEmpty?: () => void
}

const NoteBoxTodoItem: FC<NoteBoxTodoItemProps> = (props) => {
	const text = useRef<string>(props.text ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		text.current.length > 0
	)

	return (
		<div className='flex gap-2'>
			<Checkbox checked={props.completed} />
			<div className='relative flex-1'>
				{!hidePlaceholder ? (
					<p className='absolute top-0 left-0 z-0 text-xs text-text-2 opacity-60'>
						Walk the dog
					</p>
				) : null}
				<ContentEditable
					tagName='div'
					disabled={!props.editing}
					html={text.current}
					onKeyUp={(e) => {
						if (e.code === 'Enter') props.onEnter?.()
						if (e.code === 'Backspace' && text.current.length === 0)
							props.onBackspaceWhenEmpty?.()
					}}
					onBlur={() => props.onEditingEnd?.(text.current)}
					onChange={(e) => {
						e.target.value.length > 0
							? setHidePlaceholder(true)
							: setHidePlaceholder(false)
						text.current = e.target.value
					}}
					className={`flex-1 relative z-20 text-xs outline-none ${
						props.completed ? 'line-through text-text-2' : ''
					}`}
				/>
			</div>
		</div>
	)
}

export default NoteBoxTodoItem
