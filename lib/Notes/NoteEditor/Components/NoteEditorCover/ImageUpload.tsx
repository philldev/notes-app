import { ChangeEvent, FC } from 'react'
import { Button } from '../../../../../components'

interface ImageUploadProps {
	onChange: (file: File, url: string) => void
}

const ImageUpload : FC<ImageUploadProps> = (props) => {
	const handleChange = (e : ChangeEvent<HTMLInputElement>) => {

		if(e.target.files) {
			const file = e.target.files[0]
			const url = URL.createObjectURL(file)
			props.onChange(file, url)
		}

	}
	return (
		<Button size='sm' className='relative'>
			Choose an image
			<input type='file' onChange={handleChange} className='absolute inset-0 w-full opacity-0' />
		</Button>
	)
}

export default ImageUpload
