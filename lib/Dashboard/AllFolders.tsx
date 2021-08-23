import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import FolderList from '../../components/Folder/FolderList'
import { useNotes } from '../NotesProvider/NotesProvider'

interface FoldersProps {}


const AllFolders: FC<FoldersProps> = () => {
	const {state} = useNotes()
	const router = useRouter()
	return (
		<Tab.Panel as={Fragment}>
			<FolderList onFolderClick={(folder) => {router.push(`/folders/${folder.id}`)}} folders={state.folders} />
		</Tab.Panel>
	)
}

export default AllFolders
