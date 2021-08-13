import { Todo } from "../../pages"


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