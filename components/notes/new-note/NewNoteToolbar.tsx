import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline"

const NewNoteToolbar = () => {
	return (
		<div className='flex px-2 transition-all opacity-20 hover:opacity-100'>
			<button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'>
				<EmojiHappyIcon className='w-4 h-4' />
				<span className='text-xs'>Add Emoji</span>
			</button>
			<button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2'>
				<PhotographIcon className='w-4 h-4' />
				<span className='text-xs'>Add Cover</span>
			</button>
		</div>
	)
}

export default NewNoteToolbar