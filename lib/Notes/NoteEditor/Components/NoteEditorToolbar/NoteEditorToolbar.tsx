import { ChatAltIcon, PhotographIcon } from '@heroicons/react/outline'
import { useNoteEditor } from '../../Context/NoteEditorContext'

const NoteEditorToolbar = () => {
	const { state, dispatch } = useNoteEditor()

	return (
		<div className='relative flex px-2 transition-all opacity-20 hover:opacity-100'>
			{state.description === null  && (
				<button
					onClick={() => {
						dispatch({
							type: 'UPDATE_DESCRIPTION',
							payload: {
								text: '',
							},
						})
					}}
					tabIndex={1}
					className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
				>
					<ChatAltIcon className='w-4 h-4' />
					<span className='text-xs'>Add Description</span>
				</button>
			)}
			{!state.coverUrl && (
				<button
					onClick={() => {
						dispatch({
							type: 'UPDATE_COVER_URL',
							payload: {
								url: 'https://images.unsplash.com/photo-1607191917336-cbcb71b84ab7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
							},
						})
					}}
					tabIndex={2}
					className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
				>
					<PhotographIcon className='w-4 h-4' />
					<span className='text-xs'>Add Cover</span>
				</button>
			)}
		</div>
	)
}

export default NoteEditorToolbar
