import { Tab } from '@headlessui/react'
import NavigationItem from './NavigationItem'

const HomeNavigation = () => {
	return (
		<div className='flex mb-2'>
			<div className='justify-center flex-1'>
				<Tab className='flex w-full'>
					{({ selected }) => (
						<NavigationItem active={selected}>All</NavigationItem>
					)}
				</Tab>
			</div>
			<div className='justify-center flex-1'>
				<Tab className='flex w-full'>
					{({ selected }) => (
						<NavigationItem active={selected}>Folder</NavigationItem>
					)}
				</Tab>
			</div>
		</div>
	)
}

export default HomeNavigation
