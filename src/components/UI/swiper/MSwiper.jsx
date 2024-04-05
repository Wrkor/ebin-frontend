import React from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './MSwiper.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

const MSwiper = ({...props}) => {
    return (
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation
          modules={[Navigation]}
          loop={props.images.length >= 4}
          {...props}
          className={`${classes.swiper} ${props.className || ""}`}
          >
          {
            props.images.map(image => 
              <SwiperSlide className={classes.swiperSlide} key={image}><img src={image} alt="" /></SwiperSlide>
            )
          }
        </Swiper>
    );
};

export default MSwiper;
