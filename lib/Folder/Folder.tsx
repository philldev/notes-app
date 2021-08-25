import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import NoteList from '../../components/Note/NoteList'
import { useNotes } from '../NotesProvider/NotesProvider'
import { AsyncStatus, Folder as FolderType, Note } from '../types'
import FolderHeader from './FolderHeader'

interface FolderProps {
	folderId: string
}

type FolderState = {
	status: AsyncStatus | 'Not_Found'
	folder: FolderType | null
	notes: Note[] | null
}

const initialState: FolderState = {
	status: 'Loading',
	folder: null,
	notes: null,
}

const useFolder = ({ folderId }: FolderProps) => {
	const [state, setState] = useState(initialState)

	const {
		state: { folders, notes },
	} = useNotes()

	useEffect(() => {
		const fetchFolder = () => {
			const folder = folders.find((n) => n.id === folderId)
			if (folder) {
				const folderNotes = notes.filter((n) => n.folder?.id === folder.id)
				setState({
					status: 'Loaded',
					folder,
					notes: folderNotes ?? [],
				})
			} else {
				setState({
					status: 'Not_Found',
					notes: null,
					folder: null,
				})
			}
		}

		fetchFolder()
	}, [folderId, folders, notes ])

	return {
		isLoading: state.status === 'Loading',
		isError: state.status === 'Error',
		isNotFound: state.status === 'Not_Found',
		folder: state.folder,
		folderNotes: state.notes,
	}
}

const Folder: FC<FolderProps> = (props) => {
	const { folderId } = props
	const { folderNotes, folder, isLoading, isError, isNotFound } = useFolder({
		folderId,
	})
	const router = useRouter()
	if (isLoading || folder === null) return <div>loading...</div>
	if (isError) return <div>Something went wrong</div>
	if (isNotFound) return <div>Note not found!</div>

	return (
		<>
			<FolderHeader name={folder.name} />
			<NoteList
				notes={folderNotes!}
				onNoteBoxClick={(note) => {
					router.push(`/notes/${note.id}`)
				}}
			/>
		</>
	)
}

export default Folder
