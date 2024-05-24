import React from 'react'
import classes from './Title.module.scss'

const Title = ({ title, subtitle, className }) => {
	return (
		<div className={`mb-5 ${!!className ? className : ''}`}>
			<h4 className={`mb-4 ${classes.title}`}>{title || ''}</h4>
			<h6 className={`m-0 ${classes.subtitle}`}>{subtitle || ''}</h6>
		</div>
	)
}

export default Title
