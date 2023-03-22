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
      onSlideChange={() => { }}
      onSwiper={(swiper) => { }}
      lg={8}
      md={3}
      sm={2}
      xs={1}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
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