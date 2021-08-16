import { PlusIcon } from '@heroicons/react/outline'
import { FC, useMemo } from 'react'
import { Todo } from '../../../../../../pages'
import NoteTodoItemEditable from './NoteTodoItemEditable'

interface NoteTodoBlocksProps {
	index: number
	focused?: boolean
	currentFocus: number | null
	changeFocus?: (index: number) => void
	todos: Todo[]
	onAddTodo: () => void
	onDeleteTodo: (todo: Todo) => void
	onUpdateTodo: (updatedTodo: Todo) => void
}

const NoteTodoBlock: FC<NoteTodoBlocksProps> = (props) => {
	const todos = useMemo(() => props.todos, [props.todos])

	return (
		<div className='flex flex-col gap-2'>
			{todos.map((t, idx) => (
				<NoteTodoItemEditable
					changeFocus={props.changeFocus}
					focused={props.index + idx === props.currentFocus}
					index={props.index + idx}
					editing
					key={t.id}
					text={t.text}
					completed={t.completed}
					onChecked={() => {
						props.onUpdateTodo({
							...t,
							completed: !t.completed,
						})
					}}
					onTextChange={(text) => {
						if (text !== '') {
							props.onUpdateTodo({
								...t,
								text,
							})
						}
					}}
					onBackspaceWhenEmpty={() => {
						props.onDeleteTodo(t)
						props.changeFocus?.(props.index + idx - 1)
					}}
					onDeleteClick={() => props.onDeleteTodo(t)}
				/>
			))}
			{props.todos[props.todos.length - 1]?.text !== '' && (
				<button
					onClick={props.onAddTodo}
					className='flex items-center text-xs opacity-50 h-7 hover:opacity-80'
				>
					<PlusIcon className='w-4 h-4 mr-2' />
					New Todo
				</button>
			)}
		</div>
	)
}

export default NoteTodoBlock
