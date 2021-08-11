import { Button } from "../../components";

export default function Buttons() {
	return (
		<div className='min-h-screen font-sans bg-bg-1 text-text-1'>
			<div className='flex flex-col items-start w-full max-w-2xl gap-4 py-4 mx-auto'>
				<div>
					<p className='self-start text-lg font-bold'>Solid Button</p>
					<div className='grid grid-cols-4 gap-2'>
						<div className='flex flex-col items-start gap-1'>
							<p>Small</p>
							<Button size='sm'>Primary</Button>
							<Button size='sm' color='secondary'>
								Secondary
							</Button>
							<Button size='sm' color='danger'>
								Danger
							</Button>
							<Button size='sm' color='warning'>
								Warning
							</Button>
							<Button size='sm' color='success'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<p>Base</p>
							<Button>Primary</Button>
							<Button color='secondary'>Secondary</Button>
							<Button color='danger'>Danger</Button>
							<Button color='warning'>Warning</Button>
							<Button color='success'>Success</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<p>Medium</p>
							<Button size='md'>Primary</Button>
							<Button size='md' color='secondary'>
								Secondary
							</Button>
							<Button size='md' color='danger'>
								Danger
							</Button>
							<Button size='md' color='warning'>
								Warning
							</Button>
							<Button size='md' color='success'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<p>Large</p>
							<Button size='lg'>Primary</Button>
							<Button size='lg' color='secondary'>
								Secondary
							</Button>
							<Button size='lg' color='danger'>
								Danger
							</Button>
							<Button size='lg' color='warning'>
								Warning
							</Button>
							<Button size='lg' color='success'>
								Success
							</Button>
						</div>
					</div>
				</div>
				<div>
					<p className='self-start text-lg font-bold'>Outlined Button</p>
					<div className='grid grid-cols-4 gap-2'>
						<div className='flex flex-col items-start gap-1'>
							<Button size='sm' variant='outlined'>
								Primary
							</Button>
							<Button size='sm' color='secondary' variant='outlined'>
								Secondary
							</Button>
							<Button size='sm' color='danger' variant='outlined'>
								Danger
							</Button>
							<Button size='sm' color='warning' variant='outlined'>
								Warning
							</Button>
							<Button size='sm' color='success' variant='outlined'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button variant='outlined'>Primary</Button>
							<Button color='secondary' variant='outlined'>
								Secondary
							</Button>
							<Button color='danger' variant='outlined'>
								Danger
							</Button>
							<Button color='warning' variant='outlined'>
								Warning
							</Button>
							<Button color='success' variant='outlined'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button size='md' variant='outlined'>
								Primary
							</Button>
							<Button size='md' color='secondary' variant='outlined'>
								Secondary
							</Button>
							<Button size='md' color='danger' variant='outlined'>
								Danger
							</Button>
							<Button size='md' color='warning' variant='outlined'>
								Warning
							</Button>
							<Button size='md' color='success' variant='outlined'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button size='lg' variant='outlined'>
								Primary
							</Button>
							<Button size='lg' color='secondary' variant='outlined'>
								Secondary
							</Button>
							<Button size='lg' color='danger' variant='outlined'>
								Danger
							</Button>
							<Button size='lg' color='warning' variant='outlined'>
								Warning
							</Button>
							<Button size='lg' color='success' variant='outlined'>
								Success
							</Button>
						</div>
					</div>
				</div>
				<div>
					<p className='self-start text-lg font-bold'>Transparent Button</p>
					<div className='grid grid-cols-4 gap-2'>
						<div className='flex flex-col items-start gap-1'>
							<Button size='sm' variant='transparent'>
								Primary
							</Button>
							<Button size='sm' color='secondary' variant='transparent'>
								Secondary
							</Button>
							<Button size='sm' color='danger' variant='transparent'>
								Danger
							</Button>
							<Button size='sm' color='warning' variant='transparent'>
								Warning
							</Button>
							<Button size='sm' color='success' variant='transparent'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button variant='transparent'>Primary</Button>
							<Button color='secondary' variant='transparent'>
								Secondary
							</Button>
							<Button color='danger' variant='transparent'>
								Danger
							</Button>
							<Button color='warning' variant='transparent'>
								Warning
							</Button>
							<Button color='success' variant='transparent'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button size='md' variant='transparent'>
								Primary
							</Button>
							<Button size='md' color='secondary' variant='transparent'>
								Secondary
							</Button>
							<Button size='md' color='danger' variant='transparent'>
								Danger
							</Button>
							<Button size='md' color='warning' variant='transparent'>
								Warning
							</Button>
							<Button size='md' color='success' variant='transparent'>
								Success
							</Button>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<Button size='lg' variant='transparent'>
								Primary
							</Button>
							<Button size='lg' color='secondary' variant='transparent'>
								Secondary
							</Button>
							<Button size='lg' color='danger' variant='transparent'>
								Danger
							</Button>
							<Button size='lg' color='warning' variant='transparent'>
								Warning
							</Button>
							<Button size='lg' color='success' variant='transparent'>
								Success
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
