import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import Green from "./utilities/golfhom_staff_silder";

const Review = ({ reviews }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      pagination={{ clickable: true }}
      onSlideChange={() => {}}
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
          spaceBetween: 40,
        },
        768: {
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
      {reviews.map((review) => (
        <SwiperSlide key={review.id} className={HomeCss.parentReview}>
          <Green review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Review;
