import { DotsCircleHorizontalIcon, SearchIcon } from '@heroicons/react/outline'

const DashboardHeader = () => {
	return (
		<div className='flex items-center justify-between px-4 h-14'>
			<h3 className='text-xl font-bold'>Notes</h3>
			<div className='flex items-center gap-3'>
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

export default DashboardHeader
