import React, { FC, useEffect, useState } from 'react'
import { notes } from '../Dashboard/AllNotes'
import NoteEditor from '../NoteEditor/NoteEditor'
import { AsyncStatus, Note } from '../types'

interface NoteEditProps {
	noteId: string
}

type NoteEditState = {
	status: AsyncStatus | 'Not_Found'
	note: Note | null
}

const initialState: NoteEditState = {
	status: 'Loading',
	note: null,
}

const useNoteEdit = ({ noteId }: NoteEditProps) => {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		const fetchNote = () => {
			const note = notes.find((n) => n.id === noteId)
			if (note) {
				setState({
					status: 'Loaded',
					note,
				})
			} else {
				setState({
					status: 'Not_Found',
					note: null,
				})
			}
		}

		fetchNote()
	}, [noteId])

	return {
		isLoading: state.status === 'Loading',
		isError: state.status === 'Error',
		isNotFound: state.status === 'Not_Found',
		note: state.note,
	}
}

const NoteEdit: FC<NoteEditProps> = (props) => {
	const { noteId } = props
	const { note, isLoading, isError, isNotFound } = useNoteEdit({ noteId })

	if (isLoading) return <div>loading...</div>
	if (isError) return <div>Something went wrong</div>
	if (isNotFound) return <div>Note not found!</div>

	return <NoteEditor note={note!} />
}

export default NoteEdit
