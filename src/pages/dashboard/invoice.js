import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import InvoiceCss from "../../styles/dashboard/Invoices.module.css";
import Image from 'next/image';

const Invoice = () => {
    return (
        <>
            {/* BANNER IMAGE FAQ */}
            <div className={InvoiceCss.banner_img_container}>
                <Image
                    fill
                    className={InvoiceCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Invoice
