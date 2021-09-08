import {
	ArrowLeftIcon,
	DotsCircleHorizontalIcon,
	SearchIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

interface DashboardHeaderProps {
	search?: string
	showBackButton?: boolean
}

const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
	console.log(props.search)

	const [searchQuery, setSearchQuery] = useState(props.search ?? '')

	const router = useRouter()

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault()
		router.push({ query: { query: searchQuery }, pathname: '/search' })
	}

	return (
		<div className='relative flex items-center justify-between px-4 h-14'>
			{props.showBackButton && (
				<button className='mr-3' onClick={router.back}>
					<ArrowLeftIcon className='w-6 h-6' />
				</button>
			)}
			<h3 className='text-xl font-bold'>Notes</h3>
			<div className='flex items-center flex-1 gap-3 ml-3'>
				<form onSubmit={onSearch} className='relative flex items-center flex-1'>
					<input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search'
						className={`w-full pl-4 pr-10 h-8 bg-bg-2 rounded outline-none`}
					/>
					<button className={`absolute right-2`}>
						<SearchIcon className='w-6 h-6 text-text-2' />
					</button>
				</form>
				<button>
					<DotsCircleHorizontalIcon className='w-6 h-6 text-text-2' />
				</button>
			</div>
		</div>
	)
}

export default DashboardHeader
