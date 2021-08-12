import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import NavigationItem from './NavigationItem'

const HomeNavigation = () => {
	return (
		<div className='flex mb-2'>
			<Tab className='flex justify-center flex-1'>
				{({ selected }) => (
					<NavigationItem active={selected}>All</NavigationItem>
				)}
			</Tab>
			<Tab className='flex justify-center flex-1'>
				{({ selected }) => (
					<NavigationItem active={selected}>Folder</NavigationItem>
				)}
			</Tab>
		</div>
	)
}

export default HomeNavigation
