import { DocumentAddIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { Folder } from '../../lib/types'
import { Button } from '../button'

interface AddNoteButtonProps {
	folder?: Folder
}

const AddNoteButton: FC<AddNoteButtonProps> = (props) => {
	const newNoteRoute = '/notes/new'
	const href = props.folder
		? newNoteRoute + '?folder=' + props.folder.id
		: newNoteRoute
	return (
		<div className='px-4 my-4'>
			<Link href={href} passHref>
				<Button  as='a' className='flex items-center'>
					<span className='font-bold'>Take a note</span> <PlusIcon className='w-4 h-4 ml-auto' />
				</Button>
			</Link>
		</div>
	)
}

export default AddNoteButton
