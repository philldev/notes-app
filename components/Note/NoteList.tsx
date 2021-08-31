import { FC } from 'react'
import { Folder, Note } from '../../lib/types'
import { Button } from '../button'
import AddNoteButton from './AddNoteButton'
import NoteBox from './NoteBox'

interface NoteListProps {
	notes: Note[]
	onNoteBoxClick?: (note: Note) => void
	folder?: Folder
}

const NoteList: FC<NoteListProps> = (props) => {
	return (
		<div className='flex flex-col flex-1'>
			<AddNoteButton folder={props.folder} />
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
		</div>
	)
}

export default NoteList
