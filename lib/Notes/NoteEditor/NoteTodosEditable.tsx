import { PlusIcon } from '@heroicons/react/outline'
import { FC, useMemo } from 'react'
import { Todo } from '../../../pages'
import NoteTodoItemEditable from './NoteTodoItemEditable'

interface NoteTodosEditableProps {
	todos: Todo[]
	onAddTodo: () => void
	onDeleteTodo: (todo: Todo) => void
	onUpdateTodo: (updatedTodo: Todo) => void
}

const NoteTodosEditable: FC<NoteTodosEditableProps> = (props) => {
	const todos = useMemo(() => props.todos, [props.todos])

	console.log('render todos')

	return (
		<div className='flex flex-col gap-2'>
			{todos.map((t) => (
				<NoteTodoItemEditable
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

export default NoteTodosEditable
