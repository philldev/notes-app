import { useRouter } from 'next/router'
import Page from '../../components/layout/Page'
import NoteEdit from '../../lib/NoteEdit/NoteEdit'
import NoteEditor from '../../lib/NoteEditor/NoteEditor'

export default function NewNotePage() {
	const router = useRouter()
	const {id} = router.query
	return (
		<Page>
			<NoteEdit noteId={id as string}  />
		</Page>
	)
}
