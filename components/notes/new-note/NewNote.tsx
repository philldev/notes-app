import React, { useState } from 'react'
import AddBlockButton from '../AddBlockButton'
import NoteBlocksEditable from '../NoteBlocksEditable'
import NoteTitleEditable from '../NoteTitleEditable'
import { NoteBlock } from '../types'
import NewNoteHeader from './Header'
import NewNoteToolbar from './NewNoteToolbar'

const NewNote = () => {
	const [blocks, setBlocks] = useState<NoteBlock[]>([
		{ type: 'text', id: Date.now().toString(), text: '' },
	])
	return (
		<div className='flex flex-col flex-1'>
			<NewNoteHeader />
			<NewNoteToolbar />
			<div className='flex flex-col flex-1 gap-2 px-4 pt-2'>
				<NoteTitleEditable />
				<NoteBlocksEditable blocks={blocks} />
				<AddBlockButton onAdd={() => {}} />
			</div>
		</div>
	)
}

export default NewNote
