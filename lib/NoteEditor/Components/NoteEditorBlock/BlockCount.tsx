import { FC } from 'react'
import { MAX_BLOCK, useNoteEditor } from '../../Context/NoteEditorContext'

interface ComponentProps {}

const BlockCount: FC<ComponentProps> = () => {
	const { state } = useNoteEditor()
	return <div className='pl-2 text-xs text-left text-text-2'>{state.blocks.length}/{MAX_BLOCK} blocks</div>
}

export default BlockCount
