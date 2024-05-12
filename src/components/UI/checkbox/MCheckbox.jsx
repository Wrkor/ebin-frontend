import React, { forwardRef } from 'react'
import { useTheme } from '../../../hooks'
import classes from './MCheckbox.module.scss'

const MCheckbox = forwardRef(({ text, onChange, onEdited, className, value, ...props }, ref) => {
	const { isBlackTheme } = useTheme()

	return (
		<div className={`d-flex mb-3 align-items-center ${classes.check} ${className ?? ''}`}>
			<label className={`${classes.check} ${isBlackTheme && classes.black}`}>
				<input
					{...props}
					ref={ref}
					onChange={e => {
						onChange(e)
						onEdited && onEdited(e.target.checked)
					}}
					checked={value}
					type='checkbox'
				/>
			</label>
			<h6 className='ms-2'>{text}</h6>
		</div>
	)
})

export default MCheckbox
