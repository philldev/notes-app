import NoteTodoItemEditable from '../../lib/NoteEditor/Components/NoteEditorBlock/NoteTodoBlock/NoteTodoItemEditable'
import Image from 'next/image'
import { FolderIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { Note } from '../../lib/types'
import dayjs from 'dayjs'

interface NoteBoxProps {
	note: Note
	onClick?: () => void
}

const NoteBox: FC<NoteBoxProps> = (props) => {
	return (
		<div onClick={props.onClick} className='pb-3 rounded-2xl bg-bg-2'>
			{props.note.coverUrl && (
				<div className='relative w-full h-20 mb-3'>
					<Image
						className='rounded-2xl'
						layout='fill'
						objectFit='cover'
						src={props.note.coverUrl}
						alt='photo header'
					/>
				</div>
			)}
			{props.note.title && (
				<h4 className='px-3 pt-3 mb-4 font-bold'>{props.note.title}</h4>
			)}
			{props.note.location && (
				<h4 className='flex gap-3 px-3 mb-3 text-xs text-text-2'>
					<LocationMarkerIcon className='w-4 h-4' />
					<span className='flex-1'>{props.note.location}</span>
				</h4>
			)}
			{props.note.secure ? (
				<div className='grid h-24 place-items-center'>
					<LockClosedIcon className='relative w-9 h-9 -top-3' />
				</div>
			) : (
				<div className='px-3 mb-4'>
					{props.note.blocks?.slice(0, 2).map((body) =>
						body.type === 'todos' ? (
							<div key={body.id} className='mb-2'>
								{body.todos && (
									<div className='flex flex-col gap-3'>
										{body.todos.slice(0, 3).map((t, idx) => (
											<NoteTodoItemEditable
												index={idx}
												key={t.id}
												completed={t.completed}
												text={t.text}
											/>
										))}
									</div>
								)}
							</div>
						) : (
							<div className='mb-2'>
								<div
									className='overflow-hidden text-xs'
									dangerouslySetInnerHTML={{ __html: body.text }}
								/>
							</div>
						)
					)}
				</div>
			)}
			<div className='flex w-full px-3 overflow-hidden'>
				<p className='flex-1 mr-2 text-xs text-text-2'>
					{dayjs(props.note.createdAt).format('DD/MM/YYYY')}
				</p>
				<p className='flex items-center text-xs truncate text-text-2'>
					<FolderIcon className='flex-shrink-0 w-4 h-4 mr-1' />{' '}
					<span className='truncate'>{props.note.folder?.name}</span>
				</p>
			</div>
		</div>
	)
}

export default NoteBox
