import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import HomeCss from '../styles/Home.module.css'

export const Advertise = ({ ads }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={5}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {ads.map((ads) => (
                <SwiperSlide key={ads.id}>
                    <img src={ads.image} alt={ads.name}></img>
                </SwiperSlide>
            ))}
        </Swiper>
    )

}