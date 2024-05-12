import React, { forwardRef } from 'react'
import classes from './MInput.module.scss'

const MInput = forwardRef(({ onBlur, onEdited, error, message, className, ...props }, ref) => {
	return (
		<>
			<input
				{...props}
				ref={ref}
				onBlur={e => {
					onBlur(e)
					onEdited && onEdited(e.target.value)
				}}
				className={`${classes.input} ${className ?? ''}`}
				type='text'
			/>
			{error && <p className='error-msg'>{message}</p>}
		</>
	)
})

export default MInput
