import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import Green from "./utilities/green";

const Review = ({ reviews }) => {
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
            {reviews.map((review) => (
                <SwiperSlide key={review.id} className={HomeCss.parentReview}>
                    <Green review={review} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Review;
