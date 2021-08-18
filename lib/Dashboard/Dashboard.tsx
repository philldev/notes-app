import { Tab } from '@headlessui/react'
import { FC, Fragment } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import DashboardNavigation from '../../components/Dashboard/DashboardNavigation'
import AllNotes from './AllNotes'
import AllFolders from './AllFolders'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = (props) => {
	return (
		<>
			<DashboardHeader />
			<Tab.Group as={Fragment}>
				<Tab.List>
					<DashboardNavigation />
				</Tab.List>
				<Tab.Panels as={Fragment}>
					<AllNotes />
					<AllFolders />
				</Tab.Panels>
			</Tab.Group>
		</>
	)
}

export default Dashboard
