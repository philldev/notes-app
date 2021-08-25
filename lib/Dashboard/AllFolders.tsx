import { useRouter } from 'next/router'
import { FC } from 'react'
import FolderList from '../../components/Folder/FolderList'
import { useNotes } from '../NotesProvider/NotesProvider'

interface FoldersProps {}

const AllFolders: FC<FoldersProps> = () => {
	const { state } = useNotes()
	const router = useRouter()
	const { addFolder } = useNotes()
	return (
		<FolderList
			onFolderAdd={(folderName) => {
				addFolder(folderName)
			}}
			onFolderClick={(folder) => {
				router.push(`/folders/${folder.id}`)
			}}
			folders={state.folders}
		/>
	)
}

export default AllFolders
