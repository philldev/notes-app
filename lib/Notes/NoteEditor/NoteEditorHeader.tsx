import { ArrowLeftIcon } from '@heroicons/react/outline'

const NoteEditorHeader = () => {
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

export default NoteEditorHeader
