import React from 'react'
import classes from './MButton.module.scss'

const MButton = ({ name, className, active, ...props }) => {
	return (
		<button {...props} className={`${classes.button} ${active && classes.active} ${className ?? ''}`}>
			{name}
		</button>
	)
}

export default MButton
