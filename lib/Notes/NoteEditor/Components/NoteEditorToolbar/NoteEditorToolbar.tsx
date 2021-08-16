import { ChatAltIcon, PhotographIcon } from '@heroicons/react/outline'

const NoteEditorToolbar = () => {
	return (
		<div className='relative flex px-2 transition-all opacity-20 hover:opacity-100'>
			<button
				tabIndex={1}
				className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
			>
				<ChatAltIcon className='w-4 h-4' />
				<span className='text-xs'>Add Description</span>
			</button>
			<button
				tabIndex={2}
				className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'
			>
				<PhotographIcon className='w-4 h-4' />
				<span className='text-xs'>Add Cover</span>
			</button>
		</div>
	)
}

export default NoteEditorToolbar
