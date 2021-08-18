import { useRouter } from 'next/router'
import Page from '../../components/layout/Page'
import Folder from '../../lib/Folder/Folder'

const FolderPage = () => {
	const router = useRouter()
	const { id } = router.query
	return (
		<Page>
			<Folder folderId={id as string} />
		</Page>
	)
}

export default FolderPage
