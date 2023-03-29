import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";

const Video = ({ videos }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            onSlideChange={() => { }}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                280: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }}
        >
            {videos.map((video) => (
                <SwiperSlide key={video.id} className={HomeCss.parentVideo}>
                    <iframe src="https://www.youtube.com/embed/UDVtMYqUAyw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <h6>{video.name}</h6>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Video;
