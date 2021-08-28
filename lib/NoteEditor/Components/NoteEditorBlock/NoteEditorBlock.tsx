import { useDebouncedCallback } from 'use-debounce'
import { useNotes } from '../../../NotesProvider/NotesProvider'
import { Note } from '../../../types'
import {
	createTextBlock,
	createTodoBlock,
	useNoteEditor,
} from '../../Context/NoteEditorContext'
import AddBlockButton from './AddBlockButton'
import NoteEditorBlocks from './NoteEditorBlocks'

const NoteEditorBlock = () => {
	const { state: note, dispatch } = useNoteEditor()
	const { updateNote } = useNotes()
	const debounce = useDebouncedCallback((note: Note) => {
		updateNote(note)
	}, 350)

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
					updateNote(note)
				}}
				onTodoItemDelete={(todo, todoBlock) => {
					dispatch({
						type: 'DELETE_TODO_ITEM',
						payload: {
							todoId: todo.id,
							blockId: todoBlock.id,
						},
					})
					updateNote(note)
				}}
				onTextBlockDelete={(textBlock) => {
					dispatch({
						type: 'DELETE_BLOCK',
						payload: {
							blockId: textBlock.id,
						},
					})
					updateNote(note)
				}}
				onTodoBlockDelete={(todoBlock) => {
					dispatch({
						type: 'DELETE_BLOCK',
						payload: {
							blockId: todoBlock.id,
						},
					})
					updateNote(note)
				}}
				onTextBlockUpdate={(textBlock) => {
					dispatch({
						type: 'UPDATE_TEXT_BLOCK',
						payload: {
							text: textBlock.text,
							blockId: textBlock.id,
						},
					})
					debounce(note)
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
					debounce(note)
				}}
				blocks={note.blocks}
			/>
			<AddBlockButton
				onBlockAdd={(type) => {
					dispatch({
						type: 'ADD_BLOCK',
						payload: {
							block: type === 'text' ? createTextBlock() : createTodoBlock(),
						},
					})
					updateNote(note)
				}}
			/>
		</>
	)
}

export default NoteEditorBlock
