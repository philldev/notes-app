import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react'
import { Folder, Note } from '../types'
import { v4 } from 'uuid'

export const folders: Folder[] = [
	{
		id: '1',
		name: 'ToDo',
	},
	{
		id: '2',
		name: 'Freelancer',
	},
	{
		id: '3',
		name: 'Daily Life',
	},
	{
		id: '4',
		name: 'My Targets',
	},
	{
		id: '5',
		name: 'Quote',
	},
]

export const notes: Note[] = [
	{
		id: '1',
		title: 'Reminder',
		createdAt: 'Jan 17',
		folder: folders[0],
		blocks: [
			{
				id: '1',
				type: 'todos',
				todos: [
					{
						completed: true,
						text: 'Exploration Design',
						id: '1',
					},
					{
						completed: true,
						text: 'Kuliah',
						id: '2',
					},
					{
						completed: false,
						text: 'Learn 3D Model',
						id: '3',
					},
					{
						completed: false,
						text: 'Design Shots',
						id: '4',
					},
				],
			},
		],
	},
	{
		id: '2',
		title: 'Quote Today',
		createdAt: 'Jan 21',
		folder: folders[4],
		blocks: [
			{
				id: '1',
				type: 'text',
				text: '<div>"The best preperation for tomorrow is doing your best today."</div><br/><div> -H. Jackson Brow, Jr.</div>',
			},
		],
	},
	{
		id: '3',
		title: '',
		createdAt: 'Dec 24',
		folder: folders[0],
		location: 'Kuta Beach',
		coverUrl:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
		blocks: [
			{
				id: '1',
				text: 'I Stayed here for a big family vacation. This is agreate affordable hotel to stay in Bali ...',
				type: 'text',
			},
		],
	},
	{
		id: '4',
		title: '2021 Hope',
		createdAt: 'Jan 21',
		folder: folders[3],
		blocks: [
			{
				type: 'text',
				text: 'I have a dream that must come true !!',
				id: '1',
			},
			{
				id: '2',
				type: 'todos',
				todos: [
					{
						id: '1',
						text: 'GPA above 3.60',
						completed: true,
					},
					{
						id: '2',
						text: 'have an ipad',
						completed: true,
					},
					{
						id: '3',
						text: 'Holidays in japan ✈️',
						completed: false,
					},
				],
			},
		],
	},
	{
		id: '5',
		secure: true,
		title: 'My Diary >,<',
		createdAt: 'Jan 30',
		blocks: [],
		folder: folders[2],
	},
	{
		id: '6',
		createdAt: 'Jan 22',
		title: 'Statistika',
		folder: folders[2],
		blocks: [
			{
				id: '1',
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
	{
		id: '7',
		createdAt: 'Jan 22',
		folder: folders[2],
		title: 'Statistika',
		blocks: [
			{
				id: '1',
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
]

type State = {
	notes: Note[]
	folders: Folder[]
}

type Action =
	| {
			type: 'FROM_LS'
			payload: { state: State }
	  }
	| {
			type: 'ADD_NOTE'
			payload: { note: Note }
	  }
	| {
			type: 'UPDATE_NOTE'
			payload: { noteId: string; updatedNote: Note }
	  }
	| {
			type: 'DELETE_NOTE'
			payload: { noteId: string }
	  }
	| {
			type: 'ADD_FOLDER'
			payload: { folderName: string }
	  }
	| {
			type: 'UPDATE_FOLDER'
			payload: { folderId: string; updatedFolder: Folder }
	  }
	| {
			type: 'DELETE_FOLDER'
			payload: { folderId: string }
	  }

const handleAddNote = (state: State, newNote: Note): State => {
	return {
		...state,
		notes: [...state.notes, newNote],
	}
}

const handleDeleteNote = (state: State, noteId: string): State => {
	return {
		...state,
		notes: state.notes.filter((note) => note.id !== noteId),
	}
}

const handleUpdateNote = (
	state: State,
	noteId: string,
	updatedNote: Note
): State => {
	return {
		...state,
		notes: state.notes.map((note) => (note.id === noteId ? updatedNote : note)),
	}
}

const handleAddFolder = (state: State, folderName: string): State => {
	return {
		...state,
		folders: [...state.folders, { id: v4(), name: folderName }],
	}
}

const handleDeleteFolder = (state: State, folderId: string): State => {
	return {
		...state,
		folders: state.folders.filter((note) => note.id !== folderId),
	}
}

const handleUpdateFolder = (
	state: State,
	folderId: string,
	updatedFolder: Folder
): State => {
	return {
		...state,
		folders: state.folders.map((folder) =>
			folder.id === folderId ? updatedFolder : folder
		),
	}
}

const notesReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FROM_LS':
			return action.payload.state
		case 'ADD_NOTE':
			return handleAddNote(state, action.payload.note)
		case 'UPDATE_NOTE':
			return handleUpdateNote(
				state,
				action.payload.noteId,
				action.payload.updatedNote
			)
		case 'DELETE_NOTE':
			return handleDeleteNote(state, action.payload.noteId)
		case 'ADD_FOLDER':
			return handleAddFolder(state, action.payload.folderName)
		case 'UPDATE_FOLDER':
			return handleUpdateFolder(
				state,
				action.payload.folderId,
				action.payload.updatedFolder
			)
		case 'DELETE_FOLDER':
			return handleDeleteFolder(state, action.payload.folderId)
		default:
			throw new Error(`Action type is not handled : ${action}`)
	}
}

type ContextValue = {
	state: State
	addNote: (note: Note) => void
	updateNote: (note: Note) => void
	deleteNote: (note: Note) => void
	addFolder: (folderName: string) => void
}

const NotesContext = createContext<undefined | ContextValue>(undefined)

export const NotesProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(notesReducer, { notes: [], folders: [] })

	const addFolder = (folderName: string) => {
		dispatch({
			type: 'ADD_FOLDER',
			payload: { folderName },
		})
	}

	const addNote = useMemo(
		() => (note: Note) => {
			dispatch({
				type: 'ADD_NOTE',
				payload: { note },
			})
		},
		[]
	)

	const updateNote = useMemo(
		() => (note: Note) => {
			console.log(note.title)
			dispatch({
				type: 'UPDATE_NOTE',
				payload: { updatedNote: note, noteId: note.id },
			})
		},
		[]
	)

	const deleteNote = (note: Note) => {
		dispatch({
			type: 'DELETE_NOTE',
			payload: { noteId: note.id },
		})
	}

	const [isInit, setIsInit] = useState(false)
	
	useEffect(() => {
		if (isInit && window.localStorage) {
			const lsState = window.localStorage.getItem('notes')
			if (lsState) {
				const initialState = JSON.parse(lsState) as State
				dispatch({
					type: 'FROM_LS',
					payload: { state: initialState },
				})
			}
		}
	}, [isInit])
	
	useEffect(() => {
		if (isInit && window.localStorage) {
			const stringifyState = JSON.stringify(state)
			window.localStorage.setItem('notes', stringifyState)
		}
	}, [state, isInit])


	useEffect(() => {
		setIsInit(true)
	}, [])

	return (
		<NotesContext.Provider
			value={{ state, deleteNote, updateNote, addNote, addFolder }}
		>
			{children}
		</NotesContext.Provider>
	)
}

export const useNotes = () => {
	const ctx = useContext(NotesContext)
	if (!ctx) throw new Error('No Context provided')
	return ctx
}
