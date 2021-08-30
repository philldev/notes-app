import { DocumentAddIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { Folder } from '../../lib/types'

interface AddNoteButtonProps {
	folder?: Folder
}

const AddNoteButton: FC<AddNoteButtonProps> = (props) => {
	const newNoteRoute = '/notes/new'
	const href = props.folder
		? newNoteRoute + '?folder=' + props.folder.id
		: newNoteRoute
	return (
		<Link href={href}>
			<a className='fixed flex flex-col items-center justify-center w-20 h-20 border-2 rounded-full bottom-8 right-4 bg-bg-2 border-border-1 text-text-1'>
				<DocumentAddIcon className='w-5 h-5 text-accent-primary' />
				<span className='text-xs font-bold text-accent-primary'>New Note</span>
			</a>
		</Link>
	)
}

export default AddNoteButton
