import { Menu } from "@headlessui/react"
import { DotsHorizontalIcon } from "@heroicons/react/outline"
import { FC, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import MenuItems from "../../../components/menu/MenuItems"

interface NoteTextEditableProps {
	text?: string
	onDeleteClick?: () => void
	onBackspaceWhenEmpty: () => void
}

const NoteTextEditable: FC<NoteTextEditableProps> = (props) => {
	const html = useRef(props.text ?? '')

	const [hidePlaceholder, setHidePlaceholder] = useState(
		html.current.length > 0
	)

	return (
		<div className='relative group'>
			{!hidePlaceholder ? (
				<p className='absolute top-0 left-0 z-0 text-text-2 opacity-60'>
					Take a note
				</p>
			) : null}
			<ContentEditable
				html={html.current}
				className='relative z-10 outline-none'
				onKeyUp={(e) => {
					if (e.code === 'Backspace') props.onBackspaceWhenEmpty?.()
				}}
				onChange={(e) => {
					e.target.value.length > 0
						? setHidePlaceholder(true)
						: setHidePlaceholder(false)
					html.current = e.target.value
				}}
				placeholder='Take a note'
			/>
			<Menu>
				<Menu.Button className='absolute right-0 z-20 opacity-0 top-2 group-hover:opacity-80'>
					<DotsHorizontalIcon className='w-4 h-4 ' />
				</Menu.Button>
				<MenuItems>
					<Menu.Item>
						<button
							onClick={() => props.onDeleteClick && props.onDeleteClick()}
							className='flex items-center pl-2 text-sm h-9'
						>
							Delete
						</button>
					</Menu.Item>
				</MenuItems>
			</Menu>
		</div>
	)
}

export default NoteTextEditable