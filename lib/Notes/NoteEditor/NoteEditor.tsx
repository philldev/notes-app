import { ChatAltIcon, PhotographIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { v4 } from 'uuid'
import { Todo } from '../../../pages'
import { BlockTypes, NoteBlock, TextBlock, TodoBlock } from '../types'
import AddBlockButton from './AddBlockButton'
import NoteBlocksEditable from './NoteBlocksEditable'
import NoteEditorHeader from './NoteEditorHeader'
import NoteTitleEditable from './NoteTitleEditable'
import Image from 'next/image'
import NoteDescEditable from './NoteDescEditable'

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
		<div className='flex flex-col flex-1'>
			<NoteEditorHeader />
			{coverUrl && (
				<div>
					<div className='relative w-full h-40 mb-3'>
						<Image
							className=''
							layout='fill'
							objectFit='cover'
							src={coverUrl}
							alt='photo header'
						/>
						<div className='absolute bottom-1 right-1'>
							<button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2 hover:bg-opacity-70'>
								<ChatAltIcon className='w-4 h-4' />
								<span className='text-xs'>Change cover</span>
							</button>
						</div>
					</div>
				</div>
			)}
			<div className='relative flex px-2 transition-all opacity-20 hover:opacity-100'>
				{!showDescription && (
					<button
					tabIndex={1}
						onClick={() => setShowDescription(true)}
						className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
					>
						<ChatAltIcon className='w-4 h-4' />
						<span className='text-xs'>Add Description</span>
					</button>
				)}
				{!coverUrl && (
					<button
					tabIndex={2}
						onClick={() =>
							setCoverUrl(
								'https://images.unsplash.com/photo-1628847022112-822475a94a78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
							)
						}
						className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
					>
						<PhotographIcon className='w-4 h-4' />
						<span className='text-xs'>Add Cover</span>
					</button>
				)}
			</div>
			<div className='flex flex-col flex-1 gap-4 px-4 pt-2'>
				<NoteTitleEditable
					title={title}
					onUpdate={(titleText) => {
						setTitle(titleText)
					}}
				/>
				{showDescription && (
					<NoteDescEditable
						description={description}
						onBackspaceWhenEmpty={() => {
							setShowDescription(false)
						}}
						onUpdate={(descriptionText) => {
							setDescription(descriptionText)
						}}
					/>
				)}
				<NoteBlocksEditable
					onTextBlockUpdate={handleTextBlockUpdate}
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
