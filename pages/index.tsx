import React from 'react'
import AddNoteButton from '../components/notes/AddNoteButton'
import NoteList from '../components/notes/NoteList'
import NotesHeader from '../components/notes/NotesHeader'
import NotesNavigation from '../components/notes/NotesNavigation'

export interface Todo {
	id: string
	completed: boolean
	text: string
}

export interface Note {
	id: string
	secure?: boolean
	title?: string
	location?: string
	photoURL?: string
	bodys?: Array<
		{ todos: Todo[]; type: 'todos' } | { text: string; type: 'text' }
	>
	createdAt?: string
	folder?: string
}

const notes: Note[] = [
	{
		id: '1',
		title: 'Reminder',
		createdAt: 'Jan 17',
		folder: 'ToDo',
		bodys: [
			{
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
		folder: 'Quote',
		bodys: [
			{
				type: 'text',
				text: '"The best preperation for tomorrow is doing your best today." \n \n -H. Jackson Brow, Jr.',
			},
		],
	},
	{
		id: '3',
		createdAt: 'Dec 24',
		folder: 'Daily Life',
		location: 'Kuta Beach',
		photoURL:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
		bodys: [
			{
				text: 'I Stayed here for a big family vacation. This is agreate affordable hotel to stay in Bali ...',
				type: 'text',
			},
		],
	},
	{
		id: '4',
		title: '2021 Hope',
		createdAt: 'Jan 21',
		folder: 'My Targets',
		bodys: [
			{
				type: 'text',
				text: 'I have a dream that must come true !!',
			},
			{
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
		folder: 'Diary Projects',
	},
	{
		id: '6',
		createdAt: 'Jan 22',
		title: 'Statistika',
		bodys: [
			{
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
	{
		id: '7',
		createdAt: 'Jan 22',
		title: 'Statistika',
		bodys: [
			{
				type: 'text',
				text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere deleniti in voluptatem illo quaerat consequatur, vero eos repudiandae quo ab!',
			},
		],
	},
]

export default function Home() {
	return (
		<div className='flex flex-col h-screen pt-4 overflow-hidden'>
			<NotesHeader />
			<NotesNavigation />
			<NoteList notes={notes} />
			<AddNoteButton />
		</div>
	)
}
