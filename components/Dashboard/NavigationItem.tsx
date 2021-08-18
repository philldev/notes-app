import { FC } from 'react'

interface NavigationItemProps {
	active: boolean
}

const NavigationItem: FC<NavigationItemProps> = (props) => {
	return (
		<div
			className={`relative flex justify-center flex-1 py-3 ${
				props.active ? 'text-accent-primary' : 'text-text-2'
			}`}
		>
			{props.children}
			{props.active && (
				<div className='absolute bottom-0 w-12 h-1 rounded-full bg-accent-primary' />
			)}
		</div>
	)
}

export default NavigationItem
