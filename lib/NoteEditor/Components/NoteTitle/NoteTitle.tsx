import NoteTitleEditable from './NoteTitleEditable'
import { useNoteEditor } from '../../Context/NoteEditorContext'
import React, { useEffect, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useNotes } from '../../../NotesProvider/NotesProvider'
import { Note } from '../../../types'

const NoteTitle = () => {
	const { state, dispatch } = useNoteEditor()
	const { updateNote } = useNotes()
	const handleUpdateTitle = (titleText: string) => {
		dispatch({ type: 'UPDATE_TITLE', payload: { text: titleText } })
	}
	return <NoteTitleEditable title={state.title} onUpdate={handleUpdateTitle} />
}

export default NoteTitle
