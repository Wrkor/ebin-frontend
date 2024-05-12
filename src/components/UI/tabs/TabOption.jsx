import React, { forwardRef } from 'react'
import { LineSVG } from '../../SVG'
import './TabOption.scss'

const TabOption = forwardRef(({ id, ...props }, ref) => {
	return id ? (
		<button
			{...props}
			ref={ref}
			id={`nav-${id}-tab`}
			type='button'
			role='tab'
			data-bs-toggle='tab'
			data-bs-target={`#nav-${id}`}
			aria-controls={`nav-${id}`}
			aria-selected={props.active ? true : false}
			className={`nav-link d-flex flex-column align-items-center ${props.active && 'active'}`}
		>
			<h5 className='mb-2'>{props.name}</h5>
			<div className='d-flex align-items-end'>
				<LineSVG preserveAspectRatio='none' />
			</div>
		</button>
	) : (
		<></>
	)
})

export default TabOption
