import { FC } from 'react'

const NoteEditorContentWrapper: FC = ({ children }) => {
	return <div className='flex flex-col flex-1 gap-2 px-4 pt-2'>{children}</div>
}

export default NoteEditorContentWrapper
