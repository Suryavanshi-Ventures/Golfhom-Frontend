import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import HomeCss from './styles/Home.module.css'
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
            className={HomeCss.bigDiv}
        >
            {ads.map((ads) => (
                <SwiperSlide key={ads.id} className={HomeCss.parentAds}>
                    <Image className={HomeCss.adsImage} width={146} height={146} src={ads.image} alt={ads.name}></Image>
                    {/* <Image className={HomeCss.logo} width={50} height={50} src="/images/vector/logo.svg"></Image> */}
                </SwiperSlide>
            ))}
        </Swiper>
    )

}

export default Advertise;