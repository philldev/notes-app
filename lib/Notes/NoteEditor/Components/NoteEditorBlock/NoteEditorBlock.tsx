import AddBlockButton from './AddBlockButton'
import NoteEditorBlocks from './NoteEditorBlocks'

const NoteEditorBlock = () => {
	return (
		<>
			<NoteEditorBlocks
				onTextBlockUpdate={() => {}}
				onTextBlockDelete={() => {}}
				onTodoItemDelete={() => {}}
				onTodoItemAdd={() => {}}
				onTodoItemUpdate={() => {}}
				blocks={[]}
			/>
			<AddBlockButton onBlockAdd={() => {}} />
		</>
	)
}

export default NoteEditorBlock
