const NotesNavigation = () => {
	return (
		<div className='flex mb-2'>
			<button className='relative flex justify-center flex-1 py-3 text-accent-primary'>
				All
				<div className='absolute bottom-0 w-12 h-1 rounded-full bg-accent-primary' />
			</button>
			<button className='flex-1 text-text-2'>Folder</button>
		</div>
	)
}
export default NotesNavigation
