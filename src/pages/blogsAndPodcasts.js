import React from 'react'
import PodcastCss from "../styles/BlogsAndPodcasts.module.css";
import TopImage from "../../public/images/topImage.svg"
import Image from 'next/image';
import BottomSection from "../../common components/bottomGroup";

const blogsAndPodcasts = () => {
    return (
        <>
            <div className={PodcastCss.topImageParent}>
                <Image
                    src={TopImage}
                    fill
                    className={PodcastCss.topImage}
                    alt="Banner Image"
                ></Image>
            </div>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default blogsAndPodcasts

