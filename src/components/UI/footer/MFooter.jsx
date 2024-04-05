import React from 'react'
import classes from './MFooter.module.scss';

const MFooter = ({children}) => {
  
  return (
      <footer>
        <div className={classes.fit}></div>
        <div className={`${classes.container} d-flex align-items-center justify-content-end fixed-bottom`}>
          {children}
        </div>
      </footer>
  )
}

export default MFooter