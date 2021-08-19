import { Tab } from '@headlessui/react'
import { FC, Fragment } from 'react'
import FolderList from '../../components/Folder/FolderList'
import { useNotes } from '../NotesProvider/NotesProvider'

interface FoldersProps {}


const AllFolders: FC<FoldersProps> = () => {
	const {state} = useNotes()
	return (
		<Tab.Panel as={Fragment}>
			<FolderList folders={state.folders} />
		</Tab.Panel>
	)
}

export default AllFolders
