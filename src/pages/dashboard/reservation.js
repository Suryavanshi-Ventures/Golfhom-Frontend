import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import ReservationCss from "../../styles/dashboard/Reservation.module.css";
import Image from 'next/image';

const Reservation = () => {
    return (
        <>
            {/* BANNER IMAGE FAQ */}
            <div className={ReservationCss.banner_img_container}>
                <Image
                    fill
                    className={ReservationCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Reservation
