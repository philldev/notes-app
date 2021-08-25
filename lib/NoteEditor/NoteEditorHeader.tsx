import { Menu } from '@headlessui/react'
import {
	ArrowLeftIcon,
	DotsHorizontalIcon,
	DuplicateIcon,
	TrashIcon,
} from '@heroicons/react/outline'
import { FolderIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import PopoverTransition from '../../components/transitions/PopoverTransition'
import { useNotes } from '../NotesProvider/NotesProvider'
import { useNoteEditor } from './Context/NoteEditorContext'

const NoteEditorHeader = () => {
	const router = useRouter()
	const { state: note } = useNoteEditor()
	const { deleteNote } = useNotes()
	return (
		<div className='flex items-center justify-between px-4 h-14'>
			<div className='flex flex-1 gap-4'>
				<button
					className='p-2 rounded-md hover:bg-bg-2'
					onClick={() => {
						router.back()
					}}
				>
					<ArrowLeftIcon className='w-4 h-4 text-text-2' />
				</button>
				<h3 className='flex items-center flex-1 gap-2 text-text-2'>
					<FolderIcon className='w-5 h-5' />
					<span className='flex-1'>{note.folder?.name}</span>
				</h3>
			</div>
			<Menu as='div' className='relative flex items-center gap-3'>
				<Menu.Button className='flex items-center justify-center w-8 h-8 text-sm rounded-md text-text-2 hover:bg-bg-2'>
					<DotsHorizontalIcon className='w-5 h-5' />
				</Menu.Button>
				<PopoverTransition>
					<Menu.Items className='absolute right-0 z-50 mt-2 overflow-x-hidden border rounded w-44 bg-bg-2 top-full border-border-1'>
						<Menu.Item>
							<button
								onClick={() => {
									deleteNote(note)
									router.push('/')
									console.log('object')
								}}
								className='flex items-center w-full px-4 py-2 '
							>
								<TrashIcon className='flex-shrink-0 w-4 h-4 mr-2' />{' '}
								<span>Delete Note</span>
							</button>
						</Menu.Item>
						<Menu.Item>
							<button className='flex items-center w-full px-4 py-2 '>
								<DuplicateIcon className='flex-shrink-0 w-4 h-4 mr-2' />{' '}
								<span>Duplicate Note</span>
							</button>
						</Menu.Item>
					</Menu.Items>
				</PopoverTransition>
			</Menu>
		</div>
	)
}

export default NoteEditorHeader
