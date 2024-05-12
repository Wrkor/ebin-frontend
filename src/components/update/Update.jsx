import React from 'react'
import { DateFormatter } from '../../utils/'
import classes from './Update.module.scss'

const Update = ({ update }) => {
	return update?.version ? (
		<div className={`w-100 ${classes.update}`}>
			<h5 className={classes.version}>{update.version}</h5>
			<h6 className={classes.date}>Обновлен {update.date && DateFormatter(update.date)}</h6>
			<h6 className={classes.description}>{update.description}</h6>
		</div>
	) : (
		<></>
	)
}

export default Update
