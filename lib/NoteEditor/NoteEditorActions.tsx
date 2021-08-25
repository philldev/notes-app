import { FC } from 'react'
import { Button } from '../../components'
import { useNotes } from '../NotesProvider/NotesProvider'
import { useNoteEditor } from './Context/NoteEditorContext'

interface NoteEditorActionsProps {}

const NoteEditorActions: FC<NoteEditorActionsProps> = () => {
	const { state: note } = useNoteEditor()
	const {
		state: { notes },
		updateNote,
		addNote,
	} = useNotes()

	const isDisabled = note.title === ''

	const handleSaveNote = () => {
		const isInNotes = notes.includes(note)

		if (isInNotes) {
			updateNote(note)
		} else {
			addNote(note)
		}
	}
	return (
		<div className='fixed bottom-0 left-0 right-0 p-2 border-t border-border-1'>
			<Button onClick={handleSaveNote} className='w-full' disabled={isDisabled}>
				Save
			</Button>
		</div>
	)
}

export default NoteEditorActions
