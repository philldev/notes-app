import { Menu } from '@headlessui/react'
import {
	ArrowLeftIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	PlusIcon,
} from '@heroicons/react/outline'
import { PhotographIcon } from '@heroicons/react/solid'
import { FC, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { Todo } from '.'
import Page from '../components/layout/Page'
import MenuItems from '../components/menu/MenuItems'
import NoteBoxTodoItem from '../components/notes/NoteTodoItem'

interface NoteTextEditableProps {
	text?: string
	onDeleteClick?: () => void
	onBackspaceWhenEmpty: () => void
}

const NoteTextEditable: FC<NoteTextEditableProps> = (props) => {
	const html = useRef(props.text ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		html.current.length > 0
	)

	return (
		<div className='relative group'>
			{!hidePlaceholder ? (
				<p className='absolute top-0 left-0 z-0 text-text-2 opacity-60'>
					Take a note
				</p>
			) : null}
			<ContentEditable
				html={html.current}
				className='relative z-10 outline-none'
				onKeyUp={(e) => {
					if (e.code === 'Backspace') props.onBackspaceWhenEmpty?.()
				}}
				onChange={(e) => {
					e.target.value.length > 0
						? setHidePlaceholder(true)
						: setHidePlaceholder(false)
					html.current = e.target.value
				}}
				placeholder='Take a note'
			/>
			<Menu>
				<Menu.Button className='absolute right-0 z-20 opacity-0 top-2 group-hover:opacity-80'>
					<DotsHorizontalIcon className='w-4 h-4 ' />
				</Menu.Button>
				<MenuItems>
					<Menu.Item>
						<button
							onClick={() => props.onDeleteClick && props.onDeleteClick()}
							className='flex items-center pl-2 text-sm h-9'
						>
							Delete
						</button>
					</Menu.Item>
				</MenuItems>
			</Menu>
		</div>
	)
}

const NoteTitleEditable = () => {
	const [html, setHtml] = useState('')

	return (
		<div className='relative'>
			{html.length === 0 ? (
				<p className='absolute top-0 left-0 z-0 text-lg font-bold text-text-1 opacity-60'>
					Note Title
				</p>
			) : null}
			<ContentEditable
				html={html}
				className='relative z-10 text-lg font-bold outline-none'
				onChange={(e) => setHtml(e.target.value)}
				placeholder='Take a note'
			/>
		</div>
	)
}

const NewNoteHeader = () => {
	return (
		<div className='flex justify-between px-4 mb-2'>
			<div className='flex gap-4'>
				<button>
					<ArrowLeftIcon className='w-4 h-4 text-text-2' />
				</button>
				<h3 className='text-text-2'>New Note</h3>
			</div>
			<div className='flex items-center gap-3'>
				<button className='text-text-2'>Done</button>
			</div>
		</div>
	)
}

type BlockTypes = 'text' | 'todos'

interface BaseBlock {
	type: BlockTypes
	id: string
}

interface TextBlock extends BaseBlock {
	text: string
	type: 'text'
}

interface TodoBlock extends BaseBlock {
	todos: Todo[]
	type: 'todos'
}

type NoteBlock = TodoBlock | TextBlock

const noteBlocks: Array<{ type: BlockTypes; label: string }> = [
	{ type: 'text', label: 'Text' },
	{ type: 'todos', label: 'Todo' },
]

interface AddBlockButtonProps {
	onAdd?: (type: BlockTypes) => void
}

const AddBlockButton: FC<AddBlockButtonProps> = (props) => {
	return (
		<div className='relative flex flex-col'>
			<button className='flex items-center h-8 gap-2 px-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
				<PlusIcon className='w-4 h-4' />
				<span>Add Text</span>
			</button>
			<button className='flex items-center h-8 gap-2 px-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
				<PlusIcon className='w-4 h-4' />
				<span>Add Todo List</span>
			</button>
		</div>
	)
}

const createBlock = (type: BlockTypes): NoteBlock => {
	switch (type) {
		case 'text':
			return {
				id: Date.now().toString(),
				type: 'text',
				text: '',
			}
		case 'todos':
			return {
				id: Date.now().toString(),
				type: 'todos',
				todos: [
					{
						id: '1',
						text: '',
						completed: false,
					},
				],
			}
		default:
			throw new Error('Something went wrong')
	}
}

interface NoteTodosProps {
	todos: Todo[]
	onAddTodo: () => void
	onDeleteTodo: (id: string) => void
}

const NoteTodos: FC<NoteTodosProps> = (props) => {
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

const NewNoteToolbar = () => {
	return (
		<div className='flex px-2 transition-all opacity-20 hover:opacity-100'>
			<button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'>
				<EmojiHappyIcon className='w-4 h-4' />
				<span className='text-xs'>Add Emoji</span>
			</button>
			<button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'>
				<PhotographIcon className='w-4 h-4' />
				<span className='text-xs'>Add Cover</span>
			</button>
		</div>
	)
}

interface NoteBlocksEditableProps {
	blocks: NoteBlock[]
}

const NoteBlocksEditable: FC<NoteBlocksEditableProps> = (props) => {
	return (
		<>
			{props.blocks.map((block, idx) => {
				if (block.type === 'text') {
					return (
						<NoteTextEditable
							text={block.text}
							onBackspaceWhenEmpty={() => {}}
							onDeleteClick={() => {}}
							key={idx}
						/>
					)
				}
				if (block.type === 'todos') {
					return (
						<NoteTodos
							onDeleteTodo={(id) => {}}
							onAddTodo={() => {}}
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

export default function NewNote() {
	const [blocks, setBlocks] = useState<NoteBlock[]>([
		{ type: 'text', id: Date.now().toString(), text: '' },
	])
	return (
		<Page>
			<NewNoteHeader />
			<NewNoteToolbar />
			<div className='flex flex-col flex-1 gap-2 px-4 pt-2'>
				<NoteTitleEditable />
				<NoteBlocksEditable blocks={blocks} />
				<AddBlockButton
					onAdd={(type) => setBlocks([...blocks, createBlock(type)])}
				/>
			</div>
		</Page>
	)
}
