import { FC } from 'react'
import { Note } from '../../types'
import AddNoteButton from './AddNoteButton'
import NoteBox from './NoteBox'

interface NoteListProps {
	notes: Note[]
}

const NoteList: FC<NoteListProps> = (props) => {
	return (
		<>
			<div className='flex flex-1 gap-4 px-4 pt-2 overflow-y-scroll'>
				<div className='flex flex-col flex-1 gap-4'>
					{props.notes
						.filter((t, idx) => idx % 2 === 0)
						.map((note) => (
							<NoteBox key={note.id} note={note} />
						))}
				</div>
				<div className='flex flex-col flex-1 gap-4'>
					{props.notes
						.filter((t, idx) => idx % 2 !== 0)
						.map((note) => (
							<NoteBox key={note.id} note={note} />
						))}
				</div>
			</div>
			<AddNoteButton />
		</>
	)
}

export default NoteList
