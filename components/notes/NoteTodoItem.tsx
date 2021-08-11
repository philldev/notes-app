import { FC } from 'react'
import { Checkbox } from '../checkbox'

interface NoteBoxTodoItemProps {
	completed?: boolean
	text?: string
}

const NoteBoxTodoItem: FC<NoteBoxTodoItemProps> = (props) => {
	return (
		<div className='flex gap-2'>
			<Checkbox checked={props.completed} />
			<p className={`flex-1 text-xs ${props.completed ? 'line-through text-text-2' : ''}`}>{props.text}</p>
		</div>
	)
}

export default NoteBoxTodoItem
