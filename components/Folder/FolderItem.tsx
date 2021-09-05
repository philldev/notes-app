import { FolderIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Folder } from '../../lib/types'

interface FolderItemProps {
	folder: Folder
	onClick: (folder: Folder) => void
}

const FolderItem: FC<FolderItemProps> = (props) => {
	const router = useRouter()
	return (
		<div
			onClick={() => {
				props.onClick(props.folder)
			}}
			style={{ paddingTop: '100%' }}
			className='relative flex items-end justify-center px-2 pt-f rounded-2xl bg-bg-2'
		>
			<FolderIcon className='absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 text-accent-primary top-1/2 left-1/2' />
			<div className='absolute truncate bottom-2'>{props.folder.name}</div>
		</div>
	)
}

export default FolderItem
