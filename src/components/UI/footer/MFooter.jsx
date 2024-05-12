import React from 'react'
import classes from './MFooter.module.scss'

const MFooter = ({ children }) => {
	return (
		<footer>
			<div className={classes.fit}></div>
			<div className={`d-flex align-items-center justify-content-end fixed-bottom ${classes.container}`}>
				{children}
			</div>
		</footer>
	)
}

export default MFooter
