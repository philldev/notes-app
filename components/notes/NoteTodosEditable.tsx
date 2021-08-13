import { PlusIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { Todo } from '../../pages'
import NoteBoxTodoItem from './NoteTodoItem'

interface NoteTodosEditableProps {
	todos: Todo[]
	onAddTodo: () => void
	onDeleteTodo: (id: string) => void
}

const NoteTodosEditable: FC<NoteTodosEditableProps> = (props) => {
	return (
		<div className='flex flex-col gap-2'>
			{props.todos.map((t) => (
				<NoteBoxTodoItem
					editing
					key={t.id}
					text={t.text}
					completed={t.completed}
					onBackspaceWhenEmpty={() => {
						console.log('delete todo')
						props.onDeleteTodo(t.id)
					}}
				/>
			))}
			<button
				onClick={props.onAddTodo}
				className='flex items-center text-xs opacity-50 h-7 hover:opacity-80'
			>
				<PlusIcon className='w-4 h-4 mr-2' />
				New Todo
			</button>
		</div>
	)
}

export default NoteTodosEditable
