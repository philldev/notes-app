import NoteTitleEditable from './NoteTitleEditable'
import { useNoteEditor } from '../../Context/NoteEditorContext'
import { useMemo } from 'react'

const NoteTitle = () => {
	const {
		state: { title: stateTitle },
		dispatch,
	} = useNoteEditor()

	const title = useMemo(() => stateTitle, [stateTitle])
	return (
		<NoteTitleEditable
			title={title}
			onUpdate={(titleText) => {
				dispatch({ type: 'UPDATE_TITLE', payload: { text : titleText } })
			}}
		/>
	)
}

export default NoteTitle
