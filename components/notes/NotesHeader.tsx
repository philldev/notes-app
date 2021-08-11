import { DotsCircleHorizontalIcon, SearchIcon } from '@heroicons/react/outline'

const NotesHeader = () => {
	return (
		<div className='flex justify-between px-4 mb-2'>
			<h3 className='text-xl font-bold'>Notes</h3>
			<div className='flex items-center gap-3'>
				<button className='text-text-2'>Edit</button>
				<button>
					<SearchIcon className='w-6 h-6 text-text-2' />
				</button>
				<button>
					<DotsCircleHorizontalIcon className='w-6 h-6 text-text-2' />
				</button>
			</div>
		</div>
	)
}

export default NotesHeader
