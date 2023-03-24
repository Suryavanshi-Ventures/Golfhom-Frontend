import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";

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
                    <Image
                        className={HomeCss.cardReview}
                        src={review.image}
                        alt={review.name}
                        width={380}
                        height={260}
                    ></Image>
                    <h6>{review.name}</h6>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Review;
