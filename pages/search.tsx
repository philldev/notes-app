import { useRouter } from 'next/router'
import DashboardHeader from '../components/Dashboard/DashboardHeader'
import Page from '../components/layout/Page'
import NoteList from '../components/Note/NoteList'
import { useNotes } from '../lib/NotesProvider/NotesProvider'

const SearchPage = () => {
	const router = useRouter()
	const query = router.query.query as string
	const { state } = useNotes()
	const notes = state.notes.filter((n) =>
		n.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
	)

	return (
		<Page>
			<DashboardHeader showBackButton search={router.query.query as string} />
			<p className='px-4 mb-2 text-2xl'>
				Searching for &quot;{query}&quot; notes
			</p>
			{notes.length > 0 ? (
				<NoteList hideAddButton notes={notes} />
			) : (
				<div className='flex flex-col items-center px-2 mt-4'>
					<span className='mb-2 text-center text-text-2'>Not Found.</span>
					<svg
						viewBox='0 0 24 30'
						x='0px'
						y='0px'
						className='w-20 h-20 text-text-2'
					>
						<title>{'icon/24/\u65E0\u6570\u636E'}</title>
						<desc>{'\n    Created with Sketch.\n  '}</desc>
						<g stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
							<path
								d='M21.6253439,15 L18.2349694,10 L5.76503062,10 L3.75128899,13 L3.76051114,13 L2.42416482,15 L9,15 C9,16.6568542 10.3431458,18 12,18 C13.6568542,18 15,16.6568542 15,15 L21.6253439,15 Z M24,15 L24,23 L0,23 L0,15 L4.69873047,8 L19.3012695,8 L24,15 Z M7.41604369,17 L2,17 L2,21 L22,21 L22,17 L16.5839563,17 C15.8123997,18.7659048 14.050319,20 12,20 C9.94968096,20 8.18760031,18.7659048 7.41604369,17 Z M13,6 L11,6 L11,2 L13,2 L13,6 Z M17.7779529,6.62832264 L16.2220471,5.37167736 L18.6450319,2.37167736 L20.2009376,3.62832264 L17.7779529,6.62832264 Z M7.77795287,5.37167736 L6.22204713,6.62832264 L3.7990624,3.62832264 L5.35496814,2.37167736 L7.77795287,5.37167736 Z'
								fill='currentColor'
							/>
						</g>
						<text
							x={0}
							y={39}
							fill='#000000'
							fontSize='5px'
							fontWeight='bold'
							fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
						>
							{'Created by jackie'}
						</text>
						<text
							x={0}
							y={44}
							fill='#000000'
							fontSize='5px'
							fontWeight='bold'
							fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
						>
							{'from the Noun Project'}
						</text>
					</svg>
				</div>
			)}
		</Page>
	)
}

export default SearchPage
