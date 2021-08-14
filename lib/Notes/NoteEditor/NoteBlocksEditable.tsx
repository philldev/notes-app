import { FC, useRef } from 'react'
import NoteTextEditable from './NoteTextEditable'
import NoteTodosEditable from './NoteTodosEditable'
import { NoteBlock, TextBlock, TodoBlock } from '../types'
import { Todo } from '../../../pages'
import ContentEditable from 'react-contenteditable'

interface NoteBlocksEditableProps {
	blocks: NoteBlock[]
	onTextBlockDelete: (textBlock: TextBlock) => void
	onTextBlockUpdate: (textBlock: TextBlock) => void
	onTodoItemDelete: (todo: Todo, todoBlock: TodoBlock) => void
	onTodoItemAdd: (todoBlock: TodoBlock) => void
	onTodoItemUpdate: (updatedTodo: Todo, todoBlock: TodoBlock) => void
}

const NoteBlocksEditable: FC<NoteBlocksEditableProps> = (props) => {
	const ref = useRef<ContentEditable>() 
	return (
		<>
			{props.blocks.map((block, idx) => {
				if (block.type === 'text') {
					return (
						<NoteTextEditable
							text={block.text}
							onTextChange={(text) => {
								props.onTextBlockUpdate({ ...block, text })
							}}
							onBackspaceWhenEmpty={() => {
								props.onTextBlockDelete(block)
							}}
							onDeleteClick={() => {
								props.onTextBlockDelete(block)
							}}
							key={idx}
						/>
					)
				}
				if (block.type === 'todos') {
					return (
						<NoteTodosEditable
							onDeleteTodo={(todo) => {
								props.onTodoItemDelete(todo, block)
							}}
							onAddTodo={() => {
								props.onTodoItemAdd(block)
							}}
							onUpdateTodo={(todo) => {
								props.onTodoItemUpdate(todo, block)
							}}
							key={idx}
							todos={block.todos}
						/>
					)
				}
				return null
			})}
		</>
	)
}

export default NoteBlocksEditable
