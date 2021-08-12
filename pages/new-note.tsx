import { Menu } from '@headlessui/react'
import {
	ArrowLeftIcon,
	DotsHorizontalIcon,
	PlusIcon,
} from '@heroicons/react/outline'
import { FC, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { Todo } from '.'
import Page from '../components/layout/Page'
import MenuItems from '../components/menu/MenuItems'
import NoteBoxTodoItem from '../components/notes/NoteTodoItem'

interface NoteTextEditableProps {
	onDelete?: () => void
	text?: string
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
							onClick={() => props.onDelete && props.onDelete()}
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
		<div className='relative'>
			<Menu>
				<Menu.Button className='flex items-center w-full gap-2 py-2 outline-none opacity-50 hover:opacity-100'>
					<PlusIcon className='w-4 h-4' />
					<span className='self-start flex-1 text-sm font-bold text-left'>
						Add New
					</span>
					<DotsHorizontalIcon className='w-4 h-4' />
				</Menu.Button>
				<MenuItems>
					{noteBlocks.map((block, idx) => (
						<Menu.Item key={idx}>
							<button
								onClick={() => props.onAdd && props.onAdd(block.type)}
								className='flex items-center pl-2 text-sm h-9'
							>
								{block.label}
							</button>
						</Menu.Item>
					))}
				</MenuItems>
			</Menu>
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
				todos: [],
			}
		default:
			throw new Error('Something went wrong')
	}
}

export default function NewNote() {
	const [blocks, setBlocks] = useState<NoteBlock[]>([
		{ type: 'text', id: Date.now().toString(), text: '' },
	])
	return (
		<Page>
			<NewNoteHeader />
			<div className='flex flex-col flex-1 gap-2 px-4 pt-4'>
				<NoteTitleEditable />
				{blocks.map((block, idx) => {
					if (block.type === 'text') {
						return (
							<NoteTextEditable
								text={block.text}
								onDelete={() => {
									setBlocks(blocks.filter((b) => b.id !== block.id))
								}}
								key={idx}
							/>
						)
					}
					if (block.type === 'todos') {
						return (
							<div>
								<NoteBoxTodoItem text='' editing />
							</div>
						)
					}
					return null
				})}
				<AddBlockButton
					onAdd={(type) => setBlocks([...blocks, createBlock(type)])}
				/>
			</div>
		</Page>
	)
}
