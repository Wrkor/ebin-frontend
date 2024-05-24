import React from 'react'
import { DateFormatter } from '../../utils/'
import { ProfileSVG, StarSVG } from '../SVG/'
import classes from './Review.module.scss'

const Review = ({ review }) => {
	const rating = !!review?.rating
		? typeof review.rating === 'number'
			? review.rating
			: parseInt(review.rating, 10)
		: 0

	return review.user.name ? (
		<div className={`w-100 ${classes.review}`}>
			<div className={`d-flex align-items-center ${classes.author}`}>
				<ProfileSVG className={classes.img} />
				<h6 className={classes.name}>{review?.user?.name}</h6>
			</div>

			<div className={`d-flex align-items-center ${classes.info}`}>
				<div className={`d-flex ${classes.marks}`}>
					<StarSVG className={classes.active} />
					<StarSVG className={`${rating >= 1.5 && classes.active}`} />
					<StarSVG className={`${rating >= 2.5 && classes.active}`} />
					<StarSVG className={`${rating >= 3.5 && classes.active}`} />
					<StarSVG className={`${rating >= 4.5 && classes.active}`} />
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
