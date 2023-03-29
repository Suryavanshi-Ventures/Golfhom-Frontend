import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";

const Video = ({ videos }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={2}
            pagination={{ clickable: true }}
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
            lg={8}
            md={3}
            sm={2}
            xs={1}
        >
            {videos.map((video) => (
                <SwiperSlide key={video.id} className={HomeCss.parentVideo}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/UDVtMYqUAyw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <h6>Title</h6>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Video;
