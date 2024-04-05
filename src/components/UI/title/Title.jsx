import React from 'react'
import classes from './Title.module.scss';

const Title = ({...props}) => {
  return (
    <div className='mb-5'>
        <h4 className={`${classes.title} mb-4`}>{props.title}</h4>
        <h6 className={`${classes.subtitle} m-0`}>{props.subtitle}</h6>
    </div>
  )
}

export default Title