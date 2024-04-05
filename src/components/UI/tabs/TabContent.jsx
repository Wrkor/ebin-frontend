import React from 'react'
import classes from './TabContent.module.scss';

const TabContent = ({children, ...props}) => {
  return (
    <div {...props} className={`${classes.content} tab-pane fade ${props.active && "show active"}`} id={`nav-${props.id}`} role="tabpanel" aria-labelledby={`nav-${props.id}-tab`}>
      {children}
    </div>
  )
}

export default TabContent