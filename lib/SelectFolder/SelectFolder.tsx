import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { FC } from 'react'
import FolderList from '../../components/Folder/FolderList'
import { useNotes } from '../NotesProvider/NotesProvider'
import { Folder } from '../types'

interface SelectFolderProps {
	onFolderSelect: (folder: Folder) => void
}

const SelectFolder: FC<SelectFolderProps> = (props) => {
	const router = useRouter()
	const { state, addFolder } = useNotes()
	return (
		<div className='flex-col flex-1'>
			<div className='flex items-center justify-between px-4 h-14'>
				<div className='flex flex-1 gap-4'>
					<button
						className='p-2 rounded-md hover:bg-bg-2'
						onClick={() => {
							router.back()
						}}
					>
						<ArrowLeftIcon className='w-6 h-6 text-text-2' />
					</button>
					<h3 className='flex items-center flex-1 gap-2 text-text-2'>
						Select Folder
					</h3>
				</div>
				<button className='flex items-center justify-center p-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
					<PlusIcon className='w-6 h-6 text-text-2' />
				</button>
				<button className='flex items-center justify-center p-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
					<SearchIcon className='w-6 h-6 text-text-2' />
				</button>
			</div>
			<div className='flex flex-col flex-1'>
				<FolderList
					onFolderClick={(folder) => props.onFolderSelect(folder)}
					onFolderAdd={(folderName) => {
						addFolder(folderName)
					}}
					folders={state.folders}
				/>
			</div>
		</div>
	)
}

export default SelectFolder
