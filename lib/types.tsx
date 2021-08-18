export type BlockTypes = 'text' | 'todos'

export interface BaseBlock {
	type: BlockTypes
	id: string
}

export interface TextBlock extends BaseBlock {
	text: string
	type: 'text'
}

export interface TodoBlock extends BaseBlock {
	todos: Todo[]
	type: 'todos'
}

export type NoteBlock = TodoBlock | TextBlock

export interface Todo {
	id: string
	completed: boolean
	text: string
}

export interface Note {
	id: string
	blocks: Array<NoteBlock>
	title: string
	description?: string | null
	location?: string
	coverUrl?: null | string
	secure?: boolean
	folder?: Folder
	createdAt?: string
}

export interface Folder {
	id: string
	name: string
}

export type AsyncStatus = 'Loading' | 'Loaded' | 'Error'
