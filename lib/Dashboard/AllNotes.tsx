import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import NoteList from '../../components/Note/NoteList'
import { Note } from '../types'
import { folders } from './Folders'

interface AllNotesProps {}

export const notes: Note[] = [
	{
		id: '1',
		title: 'Reminder',
		createdAt: 'Jan 17',
		folder: folders[0],
		blocks: [
			{
				id: '1',
				type: 'todos',
				todos: [
					{
						completed: true,
						text: 'Exploration Design',
						id: '1',
					},
					{
						completed: true,
						text: 'Kuliah',
						id: '2',
					},
					{
						completed: false,
						text: 'Learn 3D Model',
						id: '3',
					},
					{
						completed: false,
						text: 'Design Shots',
						id: '4',
					},
				],
			},
		],
	},
	{
		id: '2',
		title: 'Quote Today',
		createdAt: 'Jan 21',
		folder: folders[4],
		blocks: [
			{
				id: '1',
				type: 'text',
				text: '"The best preperation for tomorrow is doing your best today." \n \n -H. Jackson Brow, Jr.',
			},
		],
	},
	{
		id: '3',
		title: '',
		createdAt: 'Dec 24',
		folder: folders[0],
		location: 'Kuta Beach',
		coverUrl:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
		blocks: [
			{
				id: '1',
				text: 'I Stayed here for a big family vacation. This is agreate affordable hotel to stay in Bali ...',
				type: 'text',
			},
		],
	},
	{
		id: '4',
		title: '2021 Hope',
		createdAt: 'Jan 21',
		folder: folders[3],
		blocks: [
			{
				type: 'text',
				text: 'I have a dream that must come true !!',
				id: '1',
			},
			{
				id: '2',
				type: 'todos',
				todos: [
					{
						id: '1',
						text: 'GPA above 3.60',
						completed: true,
					},
					{
						id: '2',
						text: 'have an ipad',
						completed: true,
					},
					{
						id: '3',
						text: 'Holidays in japan ✈️',
						completed: false,
					},
				],
			},
		],
	},
	{
		id: '5',
		secure: true,
		title: 'My Diary >,<',
		createdAt: 'Jan 30',
		blocks: [],
		folder: folders[2],
	},
	{
		id: '6',
		createdAt: 'Jan 22',
		title: 'Statistika',
		folder: folders[2],
		blocks: [
			{
				id: '1',
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
	{
		id: '7',
		createdAt: 'Jan 22',
		folder: folders[2],
		title: 'Statistika',
		blocks: [
			{
				id: '1',
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
]

const AllNotes: FC<AllNotesProps> = () => {
	const router = useRouter()
	return (
		<Tab.Panel as={Fragment}>
			<NoteList
				onNoteBoxClick={(note) => {
					router.push(`/notes/${note.id}`)
				}}
				notes={notes}
			/>
		</Tab.Panel>
	)
}

export default AllNotes
