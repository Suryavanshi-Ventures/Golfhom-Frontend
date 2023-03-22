import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Image from "next/image"


const Advertise = ({ ads }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={5}
            pagination={{ clickable: true }}
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
        >
            {ads.map((ads) => (
                <SwiperSlide key={ads.id}>
                    <Image width={150}
                        height={150} src={ads.image} alt={ads.name}></Image>
                </SwiperSlide>
            ))}
        </Swiper>
    )

}

export default Advertise;