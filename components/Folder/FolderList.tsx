import { FC } from 'react'
import { Folder } from '../../lib/types'
import FolderItem from './FolderItem'
import NewFolder from './NewFolder'

interface FolderListProps {
	folders: Folder[]
	onFolderClick: (folder: Folder) => void
	onFolderAdd: (folderName: string) => void
}

const FolderList: FC<FolderListProps> = (props) => {
	return (
		<div className='grid flex-1 grid-cols-2 gap-4 px-4 pt-2 overflow-y-scroll auto-rows-max'>
			{props.folders.map((f) => (
				<FolderItem
					onClick={(folder) => props.onFolderClick(folder)}
					folder={f}
					key={f.id}
				/>
			))}
			<NewFolder onFolderAdd={props.onFolderAdd} />
		</div>
	)
}

export default FolderList
