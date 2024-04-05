import React from 'react'
import { DateFormatter } from '../../../utils'
import classes from './Update.module.scss';

const Update = ({...props}) => {
  const update = props.update || {};

  return (
    <div className={`${classes.update} w-100`}>
      <h5 className={classes.version}>{update.version}</h5>
      <h6 className={classes.date}>Обновлен {update.date && DateFormatter(update.date)}</h6>
      <h6 className={classes.description}>{update.description}</h6>
    </div>
  )
}

export default Update