import React from 'react'
import classes from './MForm.module.scss'

const MForm = ({ children, title, subtitle, className, ...props }) => {
	return (
		<div {...props} className={`${classes.form} ${className ?? ''}`}>
			<h5 className={`${classes.title} mb-3`}>{title || ''}</h5>
			<h6 className={`${classes.subtitle} mt-1 mb-3`}>{subtitle || ''}</h6>
			{children}
		</div>
	)
}

export default MForm
