import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import { Card } from "react-bootstrap";

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
                    <Card className={HomeCss.videoData}>
                        <iframe className={HomeCss.videoPlay} layout="fill" src="https://www.youtube.com/embed/vEw3dhAfCBA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Card>
                    <h6 className={HomeCss.titleShadow}>Video Title</h6>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Video;
