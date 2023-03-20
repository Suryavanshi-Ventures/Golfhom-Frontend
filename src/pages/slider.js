import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import style from '../styles/Home.module.css'

export const Slider = ({ slides }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3.5}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.image}>
                    <img className={style.slider_image} src={slide.image} alt={slide.name}></img>
                    <h3 className={style.country_name}>{slide.name}</h3>
                    <img className={style.next_arrow} src={slide.next} alt={slide.arrow}></img>
                </SwiperSlide>
            ))}
        </Swiper>
    )

}