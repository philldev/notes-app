import { DocumentAddIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const AddNoteButton = () => {
	return (
		<Link href='/notes/new'>
			<a className='fixed flex items-center justify-center w-20 h-20 rounded-full bottom-8 right-4 bg-accent-primary text-text-1'>
				<DocumentAddIcon className='h-7 w-7' />
			</a>
		</Link>
	)
}

export default AddNoteButton
