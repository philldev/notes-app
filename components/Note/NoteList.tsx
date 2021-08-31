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
		<>
			<AddNoteButton folder={props.folder} />
			{props.notes.length > 0 ? (
				<div className='grid flex-1 grid-cols-2 gap-4 px-4 pt-2 overflow-y-scroll'>
					<div className='flex flex-col flex-1 flex-grow-0 gap-4 pb-2'>
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
					<div className='flex flex-col flex-1 flex-grow-0 gap-4 pb-2'>
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
			) : (
				<div className='flex flex-col items-center px-2 mt-4'>
					<span className='mb-2 text-center text-text-2'>
						Oops your notes is empty.
					</span>
					<svg
						viewBox='0 0 24 30'
						x='0px'
						y='0px'
						className='w-20 h-20 text-text-2'
					>
						<title>{'icon/24/\u65E0\u6570\u636E'}</title>
						<desc>{'\n    Created with Sketch.\n  '}</desc>
						<g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
							<path
								d='M21.6253439,15 L18.2349694,10 L5.76503062,10 L3.75128899,13 L3.76051114,13 L2.42416482,15 L9,15 C9,16.6568542 10.3431458,18 12,18 C13.6568542,18 15,16.6568542 15,15 L21.6253439,15 Z M24,15 L24,23 L0,23 L0,15 L4.69873047,8 L19.3012695,8 L24,15 Z M7.41604369,17 L2,17 L2,21 L22,21 L22,17 L16.5839563,17 C15.8123997,18.7659048 14.050319,20 12,20 C9.94968096,20 8.18760031,18.7659048 7.41604369,17 Z M13,6 L11,6 L11,2 L13,2 L13,6 Z M17.7779529,6.62832264 L16.2220471,5.37167736 L18.6450319,2.37167736 L20.2009376,3.62832264 L17.7779529,6.62832264 Z M7.77795287,5.37167736 L6.22204713,6.62832264 L3.7990624,3.62832264 L5.35496814,2.37167736 L7.77795287,5.37167736 Z'
								fill='currentColor'
							/>
						</g>
						<text
							x={0}
							y={39}
							fill='#000000'
							fontSize='5px'
							fontWeight='bold'
							fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
						>
							{'Created by jackie'}
						</text>
						<text
							x={0}
							y={44}
							fill='#000000'
							fontSize='5px'
							fontWeight='bold'
							fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
						>
							{'from the Noun Project'}
						</text>
					</svg>
				</div>
			)}
		</>
	)
}

export default NoteList
