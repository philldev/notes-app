import { FC } from 'react'

const Page: FC = (props) => (
	<div className='flex flex-col h-screen overflow-hidden'>
		{props.children}
	</div>
)

export default Page