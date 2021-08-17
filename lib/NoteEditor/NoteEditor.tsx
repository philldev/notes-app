import React from 'react'
import NoteEditorContentWrapper from './Components/Layout/NoteEditorContentWrapper'
import NoteEditorWrapper from './Components/Layout/NoteEditorWrapper'
import NoteDescription from './Components/NoteDescription/NoteDescription'
import NoteEditorBlock from './Components/NoteEditorBlock/NoteEditorBlock'
import NoteEditorCover from './Components/NoteEditorCover/NoteEditorCover'
import NoteEditorToolbar from './Components/NoteEditorToolbar/NoteEditorToolbar'
import NoteTitle from './Components/NoteTitle/NoteTitle'
import { NoteEditorProvider } from './Context/NoteEditorContext'
import NoteEditorHeader from './NoteEditorHeader'

const NoteEditor = () => {
	return (
		<NoteEditorProvider>
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
