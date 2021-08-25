import { FolderIcon, PlusIcon } from '@heroicons/react/outline'
import { FC, useEffect, useRef, useState } from 'react'

interface NewFolderProps {
	onFolderAdd: (folderName: string) => void
}

const NewFolder: FC<NewFolderProps> = (props) => {
	const [isAdding, setIsAdding] = useState(false)

	const folderNameRef = useRef<null | HTMLInputElement>(null)

	const addFolder = () => {
		if (folderNameRef.current?.value) {
			const folderName = folderNameRef.current?.value
			props.onFolderAdd(folderName)
			setIsAdding(false)
		}
	}

	if (isAdding) {
		return (
			<div className='relative flex items-end justify-center h-44 rounded-2xl bg-bg-2'>
				<FolderIcon className='absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 text-accent-primary top-1/2 left-1/2' />
				<input
					autoFocus
					ref={folderNameRef}
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							addFolder()
						}
						if (e.key === 'Escape') {
							setIsAdding(false)
						}
					}}
					onBlur={() => {
						addFolder()
					}}
					placeholder='Folder Name'
					className='w-full pb-2 text-sm text-center bg-transparent outline-none'
				/>
			</div>
		)
	}

	return (
		<div style={{ paddingTop: '100%' }} className='relative w-full'>
			<button
				onClick={() => setIsAdding(true)}
				className='absolute inset-0 flex flex-col items-center justify-center w-full border rounded-2xl border-border-1'
			>
				<PlusIcon className='w-10 h-10' />
				<span className='absolute text-sm bottom-2 text-text-2'>
					Add Folder
				</span>
			</button>
		</div>
	)
}

export default NewFolder
