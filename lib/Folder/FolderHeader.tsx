import { ArrowLeftIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { FolderIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

interface FolderHeaderProps {
	name : string;
}

const FolderHeader = (props : FolderHeaderProps) => {
	const router = useRouter()
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
					<span className='flex-1'>{props.name}</span>
				</h3>
			</div>
			<div className='flex items-center gap-3'>
				<button className='p-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
					<DotsHorizontalIcon className='w-4 h-4' />
				</button>
			</div>
		</div>
	)
}

export default FolderHeader
