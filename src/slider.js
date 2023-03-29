import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";

const Slider = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={3.5}
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
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className={HomeCss.parentImage}>
          <Image
            className={HomeCss.sliderImage}
            src={slide.image}
            alt={slide.name}
            width={360}
            height={280}
          ></Image>
          <h4 className={HomeCss.countryName}>{slide.name}</h4>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
