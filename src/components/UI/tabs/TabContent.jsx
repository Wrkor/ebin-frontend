import React from 'react'
import classes from './TabContent.module.scss'

const TabContent = ({ children, id, ...props }) => {
	return id ? (
		<div
			{...props}
			className={`tab-pane fade ${classes.content} ${props.active && 'show active'}`}
			id={`nav-${id}`}
			role='tabpanel'
			aria-labelledby={`nav-${id}-tab`}
		>
			{children}
		</div>
	) : (
		<></>
	)
}

export default TabContent
