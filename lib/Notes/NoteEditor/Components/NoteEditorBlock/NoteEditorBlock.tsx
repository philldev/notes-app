import AddBlockButton from './AddBlockButton'
import NoteEditorBlocks from './NoteEditorBlocks'

const NoteEditorBlock = () => {
	return (
		<>
			<NoteEditorBlocks
				onTodoItemAdd={() => {}}
				onTodoItemDelete={() => {}}
				onTextBlockUpdate={() => {}}
				onTextBlockDelete={() => {}}
				onTodoItemUpdate={() => {}}
				blocks={[]}
			/>
			<AddBlockButton onBlockAdd={() => {}} />
		</>
	)
}

export default NoteEditorBlock
