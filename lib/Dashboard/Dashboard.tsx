import { Tab } from '@headlessui/react'
import { FC, Fragment } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation'
import AllNotes from './AllNotes'
import AllFolders from './AllFolders'
import { useRouter } from 'next/router'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = (props) => {
	const router = useRouter()
	const defaultTab = router.query?.tab === 'folders' ? 1 : 0
	return (
		<>
			<DashboardHeader />
			<Tab.Group
				onChange={(index) => {
					if (index === 0) router.push({ query: { tab: 'notes' } })
					else if (index === 1) router.push({ query: { tab: 'folders' } })
				}}
				defaultIndex={defaultTab}
				as={Fragment}
			>
				<Tab.List>
					<DashboardNavigation />
				</Tab.List>
				<Tab.Panels as={Fragment}>
					<Tab.Panel as={Fragment}>
						<AllNotes />
					</Tab.Panel>
					<Tab.Panel>
						<AllFolders />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</>
	)
}

export default Dashboard
