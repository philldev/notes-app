import { Tab } from '@headlessui/react'
import { FC, Fragment } from 'react'
import FolderList from '../../components/Folder/FolderList'
import { Folder } from '../types'

interface FoldersProps {}

export const folders: Folder[] = [
	{
		id: '1',
		name: 'ToDo',
	},
	{
		id: '2',
		name: 'Freelancer',
	},
	{
		id: '3',
		name: 'Daily Life',
	},
	{
		id: '4',
		name: 'My Targets',
	},
	{
		id: '5',
		name: 'Quote',
	},
]

const Folders: FC<FoldersProps> = () => {
	return (
		<Tab.Panel as={Fragment}>
			<FolderList folders={folders} />
		</Tab.Panel>
	)
}

export default Folders
