import React, { FC } from 'react'
import { Note } from '../types'
import { NoteEditorProvider } from './Context/NoteEditorContext'
import NoteEditorContentWrapper from './Components/Layout/NoteEditorContentWrapper'
import NoteEditorWrapper from './Components/Layout/NoteEditorWrapper'
import NoteDescription from './Components/NoteDescription/NoteDescription'
import NoteEditorBlock from './Components/NoteEditorBlock/NoteEditorBlock'
import NoteEditorCover from './Components/NoteEditorCover/NoteEditorCover'
import NoteEditorToolbar from './Components/NoteEditorToolbar/NoteEditorToolbar'
import NoteTitle from './Components/NoteTitle/NoteTitle'
import NoteEditorHeader from './NoteEditorHeader'

interface NoteEditorProps{
	note? : Note
}

const NoteEditor : FC<NoteEditorProps> = ({note}) => {
	return (
		<NoteEditorProvider note={note}>
			<NoteEditorWrapper>
				<NoteEditorHeader />
				<NoteEditorCover />
				<NoteEditorToolbar />
				<NoteEditorContentWrapper>
					<NoteTitle />
					<NoteDescription />
					<NoteEditorBlock />
				</NoteEditorContentWrapper>
			</NoteEditorWrapper>
		</NoteEditorProvider>
	)
}

export default NoteEditor
