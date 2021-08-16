import NoteDescriptionEditable from './NoteDescriptionEditable'

const NoteDescription = () => {
	return (
		<NoteDescriptionEditable
			description={''}
			onBackspaceWhenEmpty={() => {}}
			onUpdate={(descriptionText) => {}}
		/>
	)
}

export default NoteDescription
