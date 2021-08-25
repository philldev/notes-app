import React, { useState } from 'react'
import Page from '../../components/layout/Page'
import { createNewNote } from '../../lib/NoteEditor/Context/NoteEditorContext'
import NoteEditor from '../../lib/NoteEditor/NoteEditor'
import { useNotes } from '../../lib/NotesProvider/NotesProvider'
import SelectFolder from '../../lib/SelectFolder/SelectFolder'
import { Folder, Note } from '../../lib/types'

export default function NewNotePage() {
	const [selectedFolder, setSelectedFolder] = useState<null | Folder>(null)
	const [newNote, setNewNote] = useState<null | Note>(null)

	const { addNote } = useNotes()

	const handleFolderSelect = (folder: Folder) => {
		let note = createNewNote(folder)
		setSelectedFolder(folder)
		setNewNote(note)
		addNote(note)
	}

	return (
		<Page>
			{selectedFolder && newNote ? (
				<NoteEditor note={newNote} folder={selectedFolder} />
			) : (
				<SelectFolder onFolderSelect={handleFolderSelect} />
			)}
		</Page>
	)
}
