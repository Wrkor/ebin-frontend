import React from 'react'
import { DateFormatter } from '../../utils/'
import { ProfileSVG, StarSVG } from '../SVG/'
import classes from './Review.module.scss'

const Review = ({ review }) => {
	const mark = !!review?.mark ? (typeof review.mark === 'number' ? review.mark : parseInt(review.mark, 10)) : 0

	return review.name ? (
		<div className={`w-100 ${classes.review}`}>
			<div className={`d-flex align-items-center ${classes.author}`}>
				<ProfileSVG className={classes.img} />
				<h6 className={classes.name}>
					{review?.name} {review?.lastname}
				</h6>
			</div>

			<div className={`d-flex align-items-center ${classes.info}`}>
				<div className={`d-flex ${classes.marks}`}>
					<StarSVG className={classes.active} />
					<StarSVG className={`${mark >= 1.5 && classes.active}`} />
					<StarSVG className={`${mark >= 2.5 && classes.active}`} />
					<StarSVG className={`${mark >= 3.5 && classes.active}`} />
					<StarSVG className={`${mark >= 4.5 && classes.active}`} />
				</div>
				<h6 className={classes.date}>{review.date && DateFormatter(review.date)}</h6>
			</div>

			<h6 className={classes.description}>{review.description}</h6>
		</div>
	) : (
		<></>
	)
}

export default Review
