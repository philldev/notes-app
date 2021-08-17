import { FC } from 'react'
import useRoveFocus from '../../../../../hooks/useRoveFocus'
import { Todo } from '../../../../../pages'
import { NoteBlock, TextBlock, TodoBlock } from '../../../types'
import NoteTextEditable from './NoteTextBlock/NoteTextEditable'
import NoteTodoBlock from './NoteTodoBlock/NoteTodoBlock'

interface NoteBlocksEditableProps {
	blocks: NoteBlock[]
	onTextBlockDelete: (textBlock: TextBlock) => void
	onTextBlockUpdate: (textBlock: TextBlock) => void
	onTodoBlockDelete: (todoBlock: TodoBlock) => void
	onTodoItemDelete: (todo: Todo, todoBlock: TodoBlock) => void
	onTodoItemAdd: (todoBlock: TodoBlock) => void
	onTodoItemUpdate: (updatedTodo: Todo, todoBlock: TodoBlock) => void
}

const NoteEditorBlocks: FC<NoteBlocksEditableProps> = (props) => {
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
						<NoteTodoBlock
							index={idx}
							currentFocus={currentFocus}
							changeFocus={changeFocus}
							focused={idx === currentFocus}
							onDeleteTodo={(todo) => {
									if(block.todos.length === 1) {
										props.onTodoBlockDelete(block)
										}else {

										props.onTodoItemDelete(todo, block)
									}
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

export default NoteEditorBlocks
