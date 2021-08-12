import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'

const MenuItems: FC = (props) => {
	return (
		<Transition
			as={Fragment}
			leave='transition ease-in duration-100'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
		>
			<Menu.Items className='absolute right-0 z-30 mt-1 border rounded-md shadow-lg border-border-1 top-4 w-44 bg-bg-2'>
				<div className='flex flex-col'>{props.children}</div>
			</Menu.Items>
		</Transition>
	)
}

export default MenuItems