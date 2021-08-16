import { LocationMarkerIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { FC } from 'react'
import { Note } from '../../pages'
import NoteTodoItemEditable from './NoteEditor/Components/NoteEditorBlock/NoteTodoBlock/NoteTodoItemEditable'

interface NoteBoxProps {
	note: Note
}

const NoteBox: FC<NoteBoxProps> = (props) => {
	return (
		<div className='pb-3 rounded-2xl bg-bg-2'>
			{props.note.photoURL && (
				<div className='relative w-full h-20 mb-3'>
					<Image
						className='rounded-2xl'
						layout='fill'
						objectFit='cover'
						src={props.note.photoURL}
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
					{props.note.bodys?.map((body) =>
						body.type === 'todos' ? (
							<div className='mb-2'>
								{body.todos && (
									<div className='flex flex-col gap-3'>
										{body.todos.map((t, idx) => (
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
							<div className='mb-2 text-xs whitespace-pre-line'>
								{body.text}
							</div>
						)
					)}
				</div>
			)}
			<div className='flex justify-between px-3'>
				<p className='text-xs text-text-2'>{props.note.createdAt}</p>
				<p className='text-xs text-text-2'>{props.note.folder}</p>
			</div>
		</div>
	)
}

export default NoteBox
