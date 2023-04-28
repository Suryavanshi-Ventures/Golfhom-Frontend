import Image from "next/image";
import React from "react";
import HomeCss from "../styles/Home.module.css";

const Green = ({ review }) => {
  return (
    <div className={HomeCss.parentOf_img_textCard}>
      <Image
        className={HomeCss.cardReview}
        src={review.image}
        alt={review.name}
        width={380}
        height={260}
      ></Image>

      <div className={HomeCss.cardTextParent}>
        <h6 className={HomeCss.card_title}>
          Golfhōm Gear Review – The Circle 15 Genesis Golf Glove...
        </h6>
        <div className={HomeCss.contact_div}>
          <Image
            src="/images/vector/contact.svg"
            alt="Contact Image"
            width={20}
            height={15}
          ></Image>{" "}
          <span className={HomeCss.byAdmin}>By T Admin</span>
        </div>

        <div className={HomeCss.bookmarkDiv}>
          <Image
            src="/images/vector/bookmark.svg"
            alt="Bookmark Image"
            width={15}
            height={15}
          ></Image>{" "}
          <span className={HomeCss.bookmark_text}>
            Golf, Golf Travel, Vacation Rentals
          </span>
        </div>

        <div className={HomeCss.learnbtn}>
          <h6 className={HomeCss.learnbtn_text}>Learn More</h6>
          <Image
            className={HomeCss.learnIcon}
            src="/images/vector/learnMore.svg"
            alt="learnMore"
            width={15}
            height={15}
          ></Image>{" "}
        </div>
      </div>
    </div>
  );
};

export default Green;
