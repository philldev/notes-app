import { FC } from 'react'
import { Note } from '../../lib/types'
import AddNoteButton from './AddNoteButton'
import NoteBox from './NoteBox'

interface NoteListProps {
	notes: Note[]
	onNoteBoxClick?: (note: Note) => void
}

const NoteList: FC<NoteListProps> = (props) => {
	return (
		<>
			<div className='grid flex-1 grid-cols-2 gap-4 px-4 pt-2 overflow-y-scroll'>
				<div className='flex flex-col flex-1 flex-grow-0 gap-4'>
					{props.notes
						.filter((t, idx) => idx % 2 === 0)
						.map((note) => (
							<NoteBox
								onClick={() => {
									props.onNoteBoxClick?.(note)
								}}
								key={note.id}
								note={note}
							/>
						))}
				</div>
				<div className='flex flex-col flex-1 flex-grow-0 gap-4'>
					{props.notes
						.filter((t, idx) => idx % 2 !== 0)
						.map((note) => (
							<NoteBox
								onClick={() => {
									props.onNoteBoxClick?.(note)
								}}
								key={note.id}
								note={note}
							/>
						))}
				</div>
			</div>
			<AddNoteButton />
		</>
	)
}

export default NoteList
