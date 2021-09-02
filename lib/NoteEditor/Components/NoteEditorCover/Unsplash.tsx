import { FC, useEffect, useState } from 'react'
import { createApi } from 'unsplash-js'
import Image from 'next/image'

const unsplashApi = createApi({
	// TODO: update accessKey to env
	accessKey: '3ctZ3wkOncfF-F00YqcAFuKkJfnGewIXrAupIMHzu-M',
})

type UnsplashPhoto = {
	alt_description: string
	blur_hash: string
	categories: string[]
	color: string
	created_at: string
	current_user_collections: object[]
	description: string
	downloads: number
	exif: object
	height: number
	id: string
	liked_by_user: boolean
	likes: number
	links: {
		self: string
		html: string
		download: string
		download_location: string
	}
	location: {
		title: string
		name: string
		city: string
		country: 'United States'
		position: object
	}
	promoted_at: string
	sponsorship: null | string
	topic_submissions: object
	updated_at: string
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		thumb: string
	}
	user: {
		id: string
		updated_at: string
		username: string
		name: string
		first_name: string
	}
	views: 197475
	width: 6336
}

let cachedImages : null | UnsplashPhoto[] = null

const useUnsplash = () => {
	const [state, setState] = useState<{
		isLoading: boolean
		isError: boolean
		photos: UnsplashPhoto[]
	}>({
		isLoading: false,
		photos: [],
		isError: false,
	})

	const toggleError = () =>
		setState((prevState) => ({ ...prevState, isError: !prevState.isError }))
	const toggleLoading = () =>
		setState((prevState) => ({ ...prevState, isError: !prevState.isLoading }))
	const updatePhotos = (photos: UnsplashPhoto[]) =>
		setState((prevState) => ({ ...prevState, photos }))

	const { isLoading, isError, photos } = state

	useEffect(() => {
		
		const fetchImages = () => {
			unsplashApi.photos.getRandom({ count: 6 }).then((result) => {
				toggleLoading()
				if (result.type === 'success') {
					let photos = result.response as any
					updatePhotos(photos)
					cachedImages = photos
					toggleLoading()
				} else if (result.type === 'error') {
					toggleError()
				}
			})
		}

		if(cachedImages) {
			updatePhotos(cachedImages)
		} else {
			fetchImages()
		}

	}, [])

	return { isLoading, photos, isError }
}

interface UnsplashPhotosProps {
	onPhotoSelect : (url : string) => void
}

const UnsplashPhotos: FC<UnsplashPhotosProps> = (props) => {
	const { isError, isLoading, photos } = useUnsplash()
	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='grid grid-cols-2 gap-1 p-2'>
			{photos.map((p, i) => (
				<div className='relative h-20 cursor-pointer' key={i} onClick={() => props.onPhotoSelect(p.urls.small)}>
					<Image
						className=''
						layout='fill'
						objectFit='cover'
						src={p.urls.thumb}
						alt='photo header'
					/>
				</div>
			))}
		</div>
	)
}

export default UnsplashPhotos
