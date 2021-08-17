import PopoverTransition from '../../../../components/transitions/PopoverTransition'
import Image from 'next/image'
import { Popover, Tab } from '@headlessui/react'
import { ChatAltIcon } from '@heroicons/react/outline'
import { FromImageLink, ImageUpload } from '.'
import { useNoteEditor } from '../../Context/NoteEditorContext'

const NoteEditorCover = () => {
	const {
		state: { coverUrl },
	} = useNoteEditor()
	if (!coverUrl) return null
	return (
		<div>
			<div className='relative w-full h-40 mb-3'>
				<Image
					className=''
					layout='fill'
					objectFit='cover'
					src={coverUrl}
					alt='photo header'
				/>
				<div className='absolute bottom-0 right-0 pb-1 pr-1'>
					<Popover>
						<Popover.Button className='flex items-center h-8 gap-2 px-2 transition-all rounded-md text-text-2 hover:bg-bg-2 hover:bg-opacity-70'>
							<ChatAltIcon className='w-4 h-4' />
							<span className='text-xs'>Change cover</span>
						</Popover.Button>
						<PopoverTransition>
							<Popover.Panel className='absolute right-0 z-50 w-screen max-w-sm p-1'>
								{(props) => (
									<div className='w-full border rounded-md bg-bg-1 border-border-1'>
										<Tab.Group>
											<Tab.List className='flex gap-2 px-1 py-1 border-b border-border-1'>
												<Tab className='relative px-2 h-9'>
													{({ selected }) => (
														<>
															<span>Upload</span>
															{selected && (
																<div className='absolute bottom-0 left-0 right-0 h-1 bg-accent-primary' />
															)}
														</>
													)}
												</Tab>
												<Tab className='relative px-2 h-9'>
													{({ selected }) => (
														<>
															<span>From Image Link</span>
															{selected && (
																<div className='absolute bottom-0 left-0 right-0 h-1 bg-accent-primary' />
															)}
														</>
													)}
												</Tab>
											</Tab.List>
											<Tab.Panels>
												<Tab.Panel className='p-2'>
													<ImageUpload
														onChange={(file, url) => {
															console.log(file, url)
															props.close()
														}}
													/>
												</Tab.Panel>
												<Tab.Panel>
													<FromImageLink
														onSubmit={(url) => {
															console.log(url)
															props.close()
														}}
													/>
												</Tab.Panel>
											</Tab.Panels>
										</Tab.Group>
									</div>
								)}
							</Popover.Panel>
						</PopoverTransition>
					</Popover>
				</div>
			</div>
		</div>
	)
}

export default NoteEditorCover
