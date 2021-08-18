import { Dispatch, useContext, useReducer } from 'react'
import { createContext, FC } from 'react'
import { v4 } from 'uuid'
import { Note, NoteBlock, TextBlock, Todo, TodoBlock } from '../../types'

interface NoteEditorState extends Note {}

type NoteEditorContextValue = {
	state: NoteEditorState
	dispatch: Dispatch<NoteEditorActions>
}

type NoteEditorActions =
	| {
			type: 'UPDATE_TITLE'
			payload: { text: string }
	  }
	| {
			type: 'UPDATE_DESCRIPTION'
			payload: { text: string }
	  }
	| {
			type: 'UPDATE_COVER_URL'
			payload: { url: string }
	  }
	| {
			type: 'REMOVE_COVER_URL'
	  }
	| {
			type: 'REMOVE_DESCRIPTION'
	  }
	| {
			type: 'ADD_BLOCK'
			payload: { block: NoteBlock }
	  }
	| {
			type: 'DELETE_BLOCK'
			payload: { blockId: string }
	  }
	| {
			type: 'UPDATE_TEXT_BLOCK'
			payload: {
				blockId: string
				text: string
			}
	  }
	| {
			type: 'ADD_TODO_ITEM'
			payload: { blockId: string }
	  }
	| {
			type: 'DELETE_TODO_ITEM'
			payload: { blockId: string; todoId: string }
	  }
	| {
			type: 'UPDATE_TODO_ITEM'
			payload: { blockId: string; todoId: string; updatedTodo: Partial<Todo> }
	  }

const handleUpdateTitle = (
	text: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		title: text,
	}
}

const handleUpdateDescription = (
	text: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		description: text,
	}
}

const handleUpdateCoverUrl = (
	url: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		coverUrl: url,
	}
}

const handleRemoveCoverUrl = (state: NoteEditorState): NoteEditorState => {
	return {
		...state,
		coverUrl: null,
	}
}

const handleAddBlock = (
	newBlock: NoteBlock,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: [...state.blocks, newBlock],
	}
}

const handleUpdateTextBlock = (
	blockId: string,
	text: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: state.blocks.map((block) => {
			if (block.id === blockId)
				return {
					...block,
					text,
				}
			else return block
		}),
	}
}

const createTodoItem = (): Todo => {
	return {
		id: v4(),
		text: '',
		completed: false,
	}
}

export const createTextBlock = (): TextBlock => {
	return {
		id: v4(),
		text: '',
		type: 'text',
	}
}

export const createTodoBlock = (): TodoBlock => {
	return {
		id: v4(),
		todos: [createTodoItem()],
		type: 'todos',
	}
}

const handleAddTodoItem = (
	blockId: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: state.blocks.map((block) => {
			if (block.id === blockId) {
				const todoBlock = block as TodoBlock
				return {
					...todoBlock,
					todos: [...todoBlock.todos, createTodoItem()],
				}
			} else return block
		}),
	}
}

const handleDeleteTodoItem = (
	blockId: string,
	todoId: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: state.blocks.map((block) => {
			if (block.id === blockId) {
				const todoBlock = block as TodoBlock
				return {
					...todoBlock,
					todos: todoBlock.todos.filter((todo) => todo.id !== todoId),
				}
			} else return block
		}),
	}
}

const updateTodosItem = (
	todos: Todo[],
	todoId: string,
	updatedTodo: Partial<Todo>
): Todo[] => {
	return todos.map((todo) => {
		if (todo.id === todoId) {
			return {
				...todo,
				...updatedTodo,
			}
		} else return todo
	})
}

const handleUpdateTodoItem = (
	blockId: string,
	todoId: string,
	updatedTodo: Partial<Todo>,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: state.blocks.map((block) => {
			if (block.id === blockId) {
				const todoBlock = block as TodoBlock
				return {
					...todoBlock,
					todos: updateTodosItem(todoBlock.todos, todoId, updatedTodo),
				}
			} else return block
		}),
	}
}

const handleDeleteBlock = (
	blockId: string,
	state: NoteEditorState
): NoteEditorState => {
	return {
		...state,
		blocks: state.blocks.filter((b) => b.id !== blockId),
	}
}

const noteEditorReducer = (
	state: NoteEditorState,
	action: NoteEditorActions
): NoteEditorState => {
	switch (action.type) {
		case 'UPDATE_TITLE': {
			return handleUpdateTitle(action.payload.text, state)
		}
		case 'UPDATE_DESCRIPTION': {
			return handleUpdateDescription(action.payload.text, state)
		}
		case 'REMOVE_DESCRIPTION': {
			return {
				...state,
				description: null,
			}
		}
		case 'UPDATE_COVER_URL': {
			return handleUpdateCoverUrl(action.payload.url, state)
		}
		case 'REMOVE_COVER_URL': {
			return handleRemoveCoverUrl(state)
		}
		case 'ADD_BLOCK': {
			return handleAddBlock(action.payload.block, state)
		}
		case 'DELETE_BLOCK': {
			return handleDeleteBlock(action.payload.blockId, state)
		}
		case 'UPDATE_TEXT_BLOCK': {
			return handleUpdateTextBlock(
				action.payload.blockId,
				action.payload.text,
				state
			)
		}
		case 'ADD_TODO_ITEM': {
			return handleAddTodoItem(action.payload.blockId, state)
		}
		case 'DELETE_TODO_ITEM': {
			return handleDeleteTodoItem(
				action.payload.blockId,
				action.payload.todoId,
				state
			)
		}
		case 'UPDATE_TODO_ITEM': {
			return handleUpdateTodoItem(
				action.payload.blockId,
				action.payload.todoId,
				action.payload.updatedTodo,
				state
			)
		}
		default:
			throw new Error('Unknown Type')
	}
}

const NoteEditorContext = createContext<NoteEditorContextValue | undefined>(
	undefined
)

const initialState = (): NoteEditorState => ({
	id: v4(),
	title: '',
	description: null,
	coverUrl: null,
	blocks: [{ type: 'text', id: Date.now().toString(), text: '' }],
	createdAt: Date.now().toString(),
})

const createInitialState = (initialNote?: Note): NoteEditorState => {
	if (initialNote) {
		return {
			...initialNote,
		}
	}
	return initialState()
}

interface NoteEditorProviderProps {
	note?: Note
}

export const NoteEditorProvider: FC<NoteEditorProviderProps> = ({
	children,
	note,
}) => {
	const [state, dispatch] = useReducer(
		noteEditorReducer,
		createInitialState(note)
	)

	return (
		<NoteEditorContext.Provider
			value={{
				dispatch,
				state,
			}}
		>
			{children}
		</NoteEditorContext.Provider>
	)
}

export const useNoteEditor = () => {
	const ctx = useContext(NoteEditorContext)
	if (!ctx) throw new Error('Note Editor Context Provider Not Found')
	return ctx
}
