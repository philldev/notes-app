import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Page from '../../components/layout/Page'
import { createNewNote } from '../../lib/NoteEditor/Context/NoteEditorContext'
import NoteEditor from '../../lib/NoteEditor/NoteEditor'
import { useNotes } from '../../lib/NotesProvider/NotesProvider'
import SelectFolder from '../../lib/SelectFolder/SelectFolder'
import { Folder, Note } from '../../lib/types'

export default function NewNotePage() {
	const [selectedFolder, setSelectedFolder] = useState<null | Folder>(null)
	const [newNote, setNewNote] = useState<null | Note>(null)

	const { addNote, state } = useNotes()

	const handleFolderSelect = (folder: Folder) => {
		let note = createNewNote(folder)
		setSelectedFolder(folder)
		setNewNote(note)
		addNote(note)
	}

	const router = useRouter()
	const folderId = router.query.folder

	useEffect(() => {
		if (folderId) {
			const folders = state.folders
			const folder = folders.find((folder) => folder.id === folderId)
			if (folder) {
				let note = createNewNote(folder)
				setSelectedFolder(folder)
				setNewNote(note)
				addNote(note)
			} else {
				router.replace('/notes/new')
			}
		}
	}, [folderId, state.folders, addNote, router])

	if (folderId) {
		return (
			<Page>
				{selectedFolder && newNote ? (
					<NoteEditor note={newNote} folder={selectedFolder} />
				) : null}
			</Page>
		)
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
