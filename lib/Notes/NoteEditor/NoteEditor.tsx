import React, { useState } from 'react'
import AddBlockButton from './AddBlockButton'
import NoteBlocksEditable from './NoteBlocksEditable'
import NoteTitleEditable from './NoteTitleEditable'
import { BlockTypes, NoteBlock, TextBlock, TodoBlock } from '../types'
import NoteEditorHeader from './NoteEditorHeader'
import NoteEditorToolbar from './NoteEditorToolbar'
import { Todo } from '../../../pages'
import { v4 } from 'uuid'

const NoteEditor = () => {
	const [blocks, setBlocks] = useState<NoteBlock[]>([
		{ type: 'text', id: Date.now().toString(), text: '' },
	])

	const addNewTodoBlock = () => {
		setBlocks((p) => {
			return [
				...p,
				{
					id: v4(),
					type: 'todos',
					todos: [
						{
							id: v4(),
							text: '',
							completed: false,
						},
					],
				},
			]
		})
	}

	const addNewTextBlock = () => {
		setBlocks((p) => {
			return [
				...p,
				{
					id: v4(),
					type: 'text',
					text: '',
				},
			]
		})
	}

	const deleteTodoBlockItem = (todoBlock: TodoBlock, todo: Todo) => {
		setBlocks((p) => {
			return p.map((b) =>
				b.id === todoBlock.id
					? {
							...todoBlock,
							todos: todoBlock.todos.filter((t) => t.id !== todo.id),
					  }
					: b
			)
		})
	}

	const addTodoBlockItem = (todoBlock: TodoBlock) => {
		setBlocks((p) => {
			return p.map((b) =>
				b.id === todoBlock.id
					? {
							...todoBlock,
							todos: [
								...todoBlock.todos,
								{
									id: v4(),
									text: '',
									completed: false,
								},
							],
					  }
					: b
			)
		})
	}

	const updateTodoBlockItem = (updatedTodo: Todo, todoBlock: TodoBlock) => {
		setBlocks((p) => {
			return p.map((b) =>
				b.id === todoBlock.id
					? {
							...todoBlock,
							todos: todoBlock.todos.map((t) =>
								t.id === updatedTodo.id ? updatedTodo : t
							),
					  }
					: b
			)
		})
	}

	const deleteBlock = (id: string) => {
		setBlocks((p) => {
			return p.filter((b) => b.id !== id)
		})
	}

	const handleBlockAdd = (type: BlockTypes) => {
		switch (type) {
			case 'text':
				addNewTextBlock()
				break
			case 'todos':
				addNewTodoBlock()
				break
			default:
				throw new Error('Unknown type')
		}
	}

	const handleTextBlockDelete = (textBlock: TextBlock) => {
		deleteBlock(textBlock.id)
	}
	const handleTodoItemDelete = (todo: Todo, todoBlock: TodoBlock) => {
		if (todoBlock.todos.length === 1) {
			deleteBlock(todoBlock.id)
		} else {
			deleteTodoBlockItem(todoBlock, todo)
		}
	}
	const handleTodoItemAdd = (todoBlock: TodoBlock) => {
		addTodoBlockItem(todoBlock)
	}

	const handleTodoItemUpdate = (updatedTodo: Todo, todoBlock: TodoBlock) => {
		updateTodoBlockItem(updatedTodo, todoBlock)
	}

	return (
		<div className='flex flex-col flex-1'>
			<NoteEditorHeader />
			<NoteEditorToolbar />
			<div className='flex flex-col flex-1 gap-2 px-4 pt-2'>
				<NoteTitleEditable />
				<NoteBlocksEditable
					onTextBlockDelete={handleTextBlockDelete}
					onTodoItemDelete={handleTodoItemDelete}
					onTodoItemAdd={handleTodoItemAdd}
					onTodoItemUpdate={handleTodoItemUpdate}
					blocks={blocks}
				/>
				<AddBlockButton onBlockAdd={handleBlockAdd} />
			</div>
		</div>
	)
}

export default NoteEditor
