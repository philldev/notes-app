import { BlockTypes, NoteBlock } from "../../types"

export const createBlock = (type: BlockTypes): NoteBlock => {
	switch (type) {
		case 'text':
			return {
				id: Date.now().toString(),
				type: 'text',
				text: '',
			}
		case 'todos':
			return {
				id: Date.now().toString(),
				type: 'todos',
				todos: [
					{
						id: '1',
						text: '',
						completed: false,
					},
				],
			}
		default:
			throw new Error('Something went wrong')
	}
}