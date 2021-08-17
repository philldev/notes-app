import { useNoteEditor } from '../../Context/NoteEditorContext'
import NoteDescriptionEditable from './NoteDescriptionEditable'

const NoteDescription = () => {
	const {
		state: { description },
		dispatch,
	} = useNoteEditor()
	if (description === null) return null
	return (
		<NoteDescriptionEditable
			description={description}
			onBackspaceWhenEmpty={() => {
				dispatch({
					type: 'REMOVE_DESCRIPTION',
				})
			}}
			onUpdate={(descriptionText) => {
				dispatch({
					type: 'UPDATE_DESCRIPTION',
					payload: { text: descriptionText },
				})
			}}
		/>
	)
}

export default NoteDescription
