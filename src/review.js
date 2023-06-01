import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const Review = ({ reviews }) => {
  const Router = useRouter();
  const [BlogData, setBlogData] = useState([{}]);

  useEffect(() => {
    const GetBlogData = async () => {
      try {
        const BlogAPIRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/blog`
        );
        if (BlogAPIRes.status === 200) {
          setBlogData(BlogAPIRes.data.data);
          console.log(BlogAPIRes.data.data);
        }
      } catch (error) {
        console.log("ERROR ", error);
      }
    };
    GetBlogData();
    return () => {
      GetBlogData();
    };
  }, []);

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
      {BlogData?.map((item, index) => {
        return (
          <SwiperSlide key={index.id} className={HomeCss.parentReview}>
            <div
              className={HomeCss.parentOf_img_textCard}
              onClick={(e) => {
                Router.push({
                  pathname: `blog/${encodeURIComponent(item.title)}`,
                  query: {
                    id: item.id,
                  },
                });
              }}
            >
              <Image
                className={HomeCss.cardReview}
                src={item.image}
                alt={item.name}
                width={380}
                height={260}
              ></Image>

              <div className={HomeCss.cardTextParent}>
                <h5 className={HomeCss.card_title}>{item.title}</h5>
                <div className={HomeCss.contact_div}>
                  <Image
                    src="/images/vector/contact.svg"
                    alt="Contact Image"
                    width={20}
                    height={15}
                  ></Image>{" "}
                  <span className={HomeCss.byAdmin}>
                    {item.createdBy ? item.createdBy : "N/A"}
                  </span>
                </div>

                <div className={HomeCss.bookmarkDiv}>
                  <span className={HomeCss.bookmark_text}>
                    {item.tag?.join(", ")}
                  </span>
                </div>

                <div className={HomeCss.learnbtn}>
                  <h6 className={HomeCss.learnbtn_text}>Learn More</h6>
                  <Image
                    className={HomeCss.learnIcon}
                    src="/images/vector/learnMore.svg"
                    alt="learnMore"
                    width={16}
                    height={16}
                  ></Image>{" "}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Review;
