import {
	createTextBlock,
	createTodoBlock,
	useNoteEditor,
} from '../../Context/NoteEditorContext'
import AddBlockButton from './AddBlockButton'
import NoteEditorBlocks from './NoteEditorBlocks'

const NoteEditorBlock = () => {
	const { state, dispatch } = useNoteEditor()
	return (
		<>
			<NoteEditorBlocks
				onTodoItemAdd={(block) => {
					dispatch({
						type: 'ADD_TODO_ITEM',
						payload: {
							blockId: block.id,
						},
					})
				}}
				onTodoItemDelete={(todo, todoBlock) => {
					dispatch({
						type: 'DELETE_TODO_ITEM',
						payload: {
							todoId: todo.id,
							blockId: todoBlock.id,
						},
					})
				}}
				onTextBlockUpdate={(textBlock) => {
					dispatch({
						type: 'UPDATE_TEXT_BLOCK',
						payload: {
							text: textBlock.text,
							blockId: textBlock.id,
						},
					})
				}}
				onTextBlockDelete={(textBlock) => {
					dispatch({
						type: 'DELETE_BLOCK',
						payload: {
							blockId: textBlock.id,
						},
					})
				}}
				onTodoBlockDelete={(todoBlock) => {
					dispatch({
						type: 'DELETE_BLOCK',
						payload: {
							blockId: todoBlock.id,
						},
					})
				}}
				onTodoItemUpdate={(updatedTodo, todoBlock) => {
					dispatch({
						type: 'UPDATE_TODO_ITEM',
						payload: {
							updatedTodo,
							todoId: updatedTodo.id,
							blockId: todoBlock.id,
						},
					})
				}}
				blocks={state.blocks}
			/>
			<AddBlockButton
				onBlockAdd={(type) => {
					dispatch({
						type: 'ADD_BLOCK',
						payload: {
							block: type === 'text' ? createTextBlock() : createTodoBlock(),
						},
					})
				}}
			/>
		</>
	)
}

export default NoteEditorBlock
