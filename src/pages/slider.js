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
                    <img className={style.sliderImage} src={slide.image} alt={slide.name}></img>
                    <h4 className={style.countryName}>{slide.name}</h4>
                    <img className={style.nextArrow} src={slide.next} alt={slide.arrow}></img>
                </SwiperSlide>
            ))}
        </Swiper>
    )

}