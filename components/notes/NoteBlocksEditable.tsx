import { FC } from 'react'
import NoteTextEditable from './NoteTextEditable'
import NoteTodosEditable from './NoteTodosEditable'
import { NoteBlock } from './types'

interface NoteBlocksEditableProps {
	blocks: NoteBlock[]
}

const NoteBlocksEditable: FC<NoteBlocksEditableProps> = (props) => {
	return (
		<>
			{props.blocks.map((block, idx) => {
				if (block.type === 'text') {
					return (
						<NoteTextEditable
							text={block.text}
							onBackspaceWhenEmpty={() => {}}
							onDeleteClick={() => {}}
							key={idx}
						/>
					)
				}
				if (block.type === 'todos') {
					return (
						<NoteTodosEditable
							onDeleteTodo={(id) => {}}
							onAddTodo={() => {}}
							key={idx}
							todos={block.todos}
						/>
					)
				}
				return null
			})}
		</>
	)
}

export default NoteBlocksEditable
