import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='min-h-screen font-sans bg-bg-1 text-text-1'>
			<Component {...pageProps} />
		</div>
	)
}
export default MyApp
