import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

const Slider = ({ slides }) => {
  return (
    <Swiper
      // modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      // pagination={{ clickable: true }}
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
          spaceBetween: 40,
        },
        540: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 2.3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className={HomeCss.parentImage}>
          <Link
            href={`/search?latitude=${encodeURIComponent(
              slide?.lat
            )}&longitude=${encodeURIComponent(
              slide?.lng
            )}&location_name=${encodeURIComponent(slide?.name)}&limit=10`}
          >
            {" "}
            <div className={HomeCss.image_Parent}>
              <Image
                className={HomeCss.sliderImage}
                src={slide.src}
                alt={slide.name}
                fill
              ></Image>
            </div>
          </Link>

          <h4 className={HomeCss.countryName}>{slide.name}</h4>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
