import React, { useState } from 'react'
import Page from '../../components/layout/Page'
import NoteEditor from '../../lib/NoteEditor/NoteEditor'
import SelectFolder from '../../lib/SelectFolder/SelectFolder'
import { Folder } from '../../lib/types'

export default function NewNotePage() {
	const [selectedFolder, setSelectedFolder] = useState<null | Folder>()
	
	const handleFolderSelect = (folder: Folder) => {
		setSelectedFolder(folder)
	}

	return (
		<Page>
			{selectedFolder ? (
				<NoteEditor folder={selectedFolder} />
			) : (
				<SelectFolder onFolderSelect={handleFolderSelect} />
			)}
		</Page>
	)
}
