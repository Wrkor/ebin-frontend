import React from 'react'
import { DateFormatter } from '../../../utils'
import { ProfileSVG, StarSVG } from "../../SVG/"
import classes from './Review.module.scss';

const Review = ({...props}) => {
  const review = props.review || {};

  return (
    <div className={`${classes.review} w-100`}>
      <div className={`${classes.author} d-flex align-items-center`}>
        <ProfileSVG className={classes.img}/>
        <h6 className={classes.name}>{review.name} {review.lastname}</h6>
      </div>

      <div className={`${classes.info} d-flex align-items-center`}>
        <div className={`${classes.marks} d-flex`}>
          <StarSVG className={classes.active}/>
          <StarSVG className={`${review.mark >= 1.5 ? classes.active : ""}`}/>
          <StarSVG className={`${review.mark >= 2.5 ? classes.active : ""}`}/>
          <StarSVG className={`${review.mark >= 3.5 ? classes.active : ""}`}/>
          <StarSVG className={`${review.mark >= 4.5 ? classes.active : ""}`}/>
        </div>
        <h6 className={classes.date}>{review.date && DateFormatter(review.date)}</h6>
      </div>

      <h6 className={classes.description}>{review.description}</h6>
    </div>
  )
}

export default Review