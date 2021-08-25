import React, { FC } from 'react'
import { Folder, Note } from '../types'
import { NoteEditorProvider } from './Context/NoteEditorContext'
import NoteEditorContentWrapper from './Components/Layout/NoteEditorContentWrapper'
import NoteEditorWrapper from './Components/Layout/NoteEditorWrapper'
import NoteDescription from './Components/NoteDescription/NoteDescription'
import NoteEditorBlock from './Components/NoteEditorBlock/NoteEditorBlock'
import NoteEditorCover from './Components/NoteEditorCover/NoteEditorCover'
import NoteEditorToolbar from './Components/NoteEditorToolbar/NoteEditorToolbar'
import NoteTitle from './Components/NoteTitle/NoteTitle'
import NoteEditorHeader from './NoteEditorHeader'
import { Button } from '../../components'
import NoteEditorActions from './NoteEditorActions'

interface NoteEditorProps{
	note : Note
	folder? : Folder
}

const NoteEditor : FC<NoteEditorProps> = ({note, folder}) => {
	return (
		<NoteEditorProvider note={note} folder={folder}>
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
