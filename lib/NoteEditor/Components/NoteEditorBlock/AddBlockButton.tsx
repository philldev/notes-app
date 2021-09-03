import { PlusIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { BlockTypes } from '../../../types'
import BlockCount from './BlockCount'

interface AddBlockButtonProps {
	onBlockAdd: (type: BlockTypes) => void
}

const AddBlockButton: FC<AddBlockButtonProps> = (props) => {
	const handleAddTextClick = () => {
		props.onBlockAdd('text')
	}
	const handleAddTodoListClick = () => {
		props.onBlockAdd('todos')
	}

	return (
		<div className='relative flex flex-col'>
			<button
				onClick={handleAddTextClick}
				className='flex items-center h-8 gap-2 px-2 text-sm rounded-md text-text-2 hover:bg-bg-2'
			>
				<PlusIcon className='w-4 h-4' />
				<span>Add Text</span>
			</button>
			<button
				onClick={handleAddTodoListClick}
				className='flex items-center h-8 gap-2 px-2 mb-2 text-sm rounded-md text-text-2 hover:bg-bg-2'
			>
				<PlusIcon className='w-4 h-4' />
				<span>Add Todo List</span>
			</button>
			<BlockCount />
		</div>
	)
}

export default AddBlockButton
