import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import NoteList from '../../components/Note/NoteList'
import { useNotes } from '../NotesProvider/NotesProvider'

interface AllNotesProps {}

const AllNotes: FC<AllNotesProps> = () => {
	const router = useRouter()
	const { state } = useNotes()
	return (
		<NoteList
			onNoteBoxClick={(note) => {
				router.push(`/notes/${note.id}`)
			}}
			notes={state.notes}
		/>
	)
}

export default AllNotes
