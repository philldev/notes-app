import { PlusIcon } from "@heroicons/react/outline"
import { FC } from "react"
import { BlockTypes } from "./types"

interface AddBlockButtonProps {
	onAdd?: (type: BlockTypes) => void
}

const AddBlockButton: FC<AddBlockButtonProps> = (props) => {
	return (
		<div className='relative flex flex-col'>
			<button className='flex items-center h-8 gap-2 px-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
				<PlusIcon className='w-4 h-4' />
				<span>Add Text</span>
			</button>
			<button className='flex items-center h-8 gap-2 px-2 text-sm rounded-md text-text-2 hover:bg-bg-2'>
				<PlusIcon className='w-4 h-4' />
				<span>Add Todo List</span>
			</button>
		</div>
	)
}

export default AddBlockButton