import React, { forwardRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import classes from './MSwiper.module.scss'

const MSwiper = forwardRef(({ className, images, ...props }, ref) => {
	return !!images && Array.isArray(images) && images.length > 0 ? (
		<Swiper
			{...props}
			slidesPerView={4}
			spaceBetween={20}
			navigation
			ref={ref}
			modules={[Navigation]}
			className={`${classes.swiper} ${className ?? ''}`}
		>
			{images.map((image, index) => (
				<SwiperSlide className={classes.swiperSlide} key={index}>
					<img src={image} alt='Фотографии приложения' />
				</SwiperSlide>
			))}
		</Swiper>
	) : (
		<></>
	)
})

export default MSwiper
