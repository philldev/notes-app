import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NotesProvider } from '../lib/NotesProvider/NotesProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NotesProvider>
			<div className='min-h-screen font-sans bg-bg-1 text-text-1'>
				<Component {...pageProps} />
			</div>
		</NotesProvider>
	)
}
export default MyApp
