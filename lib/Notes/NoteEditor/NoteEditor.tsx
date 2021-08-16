import React, { useState } from 'react'
import { v4 } from 'uuid'
import { Todo } from '../../../pages'
import { BlockTypes, NoteBlock, TextBlock, TodoBlock } from '../types'
import NoteEditorBlock from './Components/NoteEditorBlock/NoteEditorBlock'
import NoteDescription from './Components/NoteDescription/NoteDescription'
import NoteEditorContentWrapper from './Components/Layout/NoteEditorContentWrapper'
import NoteEditorCover from './Components/NoteEditorCover/NoteEditorCover'
import NoteEditorHeader from './NoteEditorHeader'
import NoteEditorToolbar from './Components/NoteEditorToolbar/NoteEditorToolbar'
import NoteTitle from './Components/NoteTitle/NoteTitle'
import NoteEditorWrapper from './Components/Layout/NoteEditorWrapper'

const NoteEditor = () => {
	const [title, setTitle] = useState('')
	const [coverUrl, setCoverUrl] = useState<string | null>(null)
	const [description, setDescription] = useState('')
	const [showDescription, setShowDescription] = useState(false)
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
				b.id === todoBlock.id && b.type === 'todos'
					? {
							...b,
							todos: b.todos.filter((t) => t.id !== todo.id),
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

	const updateTextBlock = (updatedTextBlock: TextBlock) => {
		setBlocks((p) => {
			return p.map((b) => (b.id === updatedTextBlock.id ? updatedTextBlock : b))
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

	const handleTextBlockUpdate = (textBlock: TextBlock) => {
		updateTextBlock(textBlock)
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
		<NoteEditorWrapper>
			<NoteEditorHeader />
			<NoteEditorCover />
			<NoteEditorToolbar />
			<NoteEditorContentWrapper>
				<NoteTitle />
				<NoteDescription />
				<NoteEditorBlock />
			</NoteEditorContentWrapper>
		</NoteEditorWrapper>
	)
}

export default NoteEditor
