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
	secure?: boolean
	title?: string
	location?: string
	coverUrl?: string
	bodys?: Array<NoteBlock>
	createdAt?: string
	folder?: string
}

export interface Folder {
	id: string
	name: string
}
