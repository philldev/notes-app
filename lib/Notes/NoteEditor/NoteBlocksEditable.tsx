import { FC, useRef } from 'react'
import NoteTextEditable from './NoteTextEditable'
import NoteTodosEditable from './NoteTodosEditable'
import { NoteBlock, TextBlock, TodoBlock } from '../types'
import { Todo } from '../../../pages'
import ContentEditable from 'react-contenteditable'
import useRoveFocus from '../../../hooks/useRoveFocus'

interface NoteBlocksEditableProps {
	blocks: NoteBlock[]
	onTextBlockDelete: (textBlock: TextBlock) => void
	onTextBlockUpdate: (textBlock: TextBlock) => void
	onTodoItemDelete: (todo: Todo, todoBlock: TodoBlock) => void
	onTodoItemAdd: (todoBlock: TodoBlock) => void
	onTodoItemUpdate: (updatedTodo: Todo, todoBlock: TodoBlock) => void
}

const NoteBlocksEditable: FC<NoteBlocksEditableProps> = (props) => {
	const focusLength = () => {
		let length = 0
		props.blocks.forEach((b) => {
			if (b.type === 'text') {
				length++
			} else if (b.type === 'todos') {
				length = length + b.todos.length
			}
		})

		return length
	}
	const { currentFocus, changeFocus } = useRoveFocus(focusLength())

	return (
		<>
			{props.blocks.map((block, idx) => {
				if (block.type === 'text') {
					// let index =
					// 	props.blocks[idx - 1]?.type === 'todos'
					// 		? (props.blocks[idx - 1] as TodoBlock).todos.length + idx
					// 		: idx
					return (
						<NoteTextEditable
							index={idx}
							focused={currentFocus === idx}
							text={block.text}
							onTextChange={(text) => {
								props.onTextBlockUpdate({ ...block, text })
							}}
							changeFocus={changeFocus}
							onBackspaceWhenEmpty={() => {
								props.onTextBlockDelete(block)
								changeFocus(idx - 1)
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
							index={idx}
							currentFocus={currentFocus}
							changeFocus={changeFocus}
							focused={idx === currentFocus}
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
