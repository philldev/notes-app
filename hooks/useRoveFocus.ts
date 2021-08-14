import { useCallback, useState, useEffect } from 'react'

function useRoveFocus(size: number) {
	const [currentFocus, setCurrentFocus] = useState<null | number>(null)

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (currentFocus !== null)
				if (e.ctrlKey && e.key === 'ArrowUp') {
					// Down arrow
					e.preventDefault()
					setCurrentFocus(currentFocus === 0 ? size  : currentFocus - 1)
				} else if (e.ctrlKey && e.key === 'ArrowDown') {
					// Up arrow
					e.preventDefault()
					setCurrentFocus(currentFocus === size  ? 0 : currentFocus + 1)
				}
		},
		[size, currentFocus, setCurrentFocus]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, false)
		return () => {
			document.removeEventListener('keydown', handleKeyDown, false)
		}
	}, [handleKeyDown])

	const changeFocus = (index: number): void => {
		setCurrentFocus(index)
	}

	return { currentFocus, changeFocus }
}

export default useRoveFocus
