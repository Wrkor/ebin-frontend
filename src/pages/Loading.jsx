import React from 'react'
import { useTheme } from '../hooks'

const Loading = () => {
	const { isBlackTheme } = useTheme()

	return (
		<div className='d-flex w-100 justify-content-center mt-5'>
			<div className={`spinner-border ${isBlackTheme ? 'text-light' : ''}`} role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default Loading
