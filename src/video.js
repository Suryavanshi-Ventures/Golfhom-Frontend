import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import ReactPlayer from "react-player";


const Video = ({ videos }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3.5}
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
                    <Image
                        className={HomeCss.videoImg}
                        src={video.image}
                        alt={video.name}
                        width={400}
                        height={280} >
                    </Image>
                    <h6>{video.name}</h6>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Video;
