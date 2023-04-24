import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import FavoritesCss from "../../styles/dashboard/Favorites.module.css";
import Image from 'next/image';

const Favorites = () => {
    return (
        <>
            {/* BANNER IMAGE FAQ */}
            <div className={FavoritesCss.banner_img_container}>
                <Image
                    fill
                    className={FavoritesCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Favorites
