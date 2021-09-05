import { FC } from 'react'

const Page: FC = (props) => (
	<div className='flex flex-col w-full h-screen max-w-3xl mx-auto overflow-hidden sm:border-r sm:border-l sm:border-border-1'>
		{props.children}
	</div>
)

export default Page
