import React from 'react'
import PodcastCss from "../styles/BlogsAndPodcasts.module.css";
import TopImage from "../../public/images/topImage.svg"
import Image from 'next/image';
import BottomSection from "../../common components/bottomGroup";
import { Col, Container, Row } from 'react-bootstrap';
import OfficialBlog from "../../public/images/officialBlog.svg";
import ShipsSticks from "../../public/images/shipStickks.svg";
import Allbf from "../../public/images/allBf.svg";
import golfWire from "../../public/images/golfWire.svg";
import Bears from "../../public/images/bears.svg";
import GolfBeginners from "../../public/images/golfBeginners.svg";


const blogsAndPodcasts = () => {
    return (
        <>

            {/*   --------------------------   TOP IMAGE SECTION       ------------------------    */}

            <div className={PodcastCss.topImageParent}>
                <Image
                    src={TopImage}
                    fill
                    className={PodcastCss.topImage}
                    alt="Banner Image"
                ></Image>
            </div>

            {/*   ---------------------------         PODCAST MID CONTAINER           -----------------------    */}

            <Container className={PodcastCss.imageGrand}>

                <Row className={PodcastCss.mainRow}>
                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={OfficialBlog}
                            alt='OfficialBlog'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>

                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={ShipsSticks}
                            alt='ShipsSticks'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>

                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={Allbf}
                            alt='Allbf'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>

                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={golfWire}
                            alt='golfWire'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>

                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={Bears}
                            alt='Bears'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>

                    <div className={PodcastCss.imageParent}>
                        <Image
                            src={GolfBeginners}
                            alt='GolfBeginners'
                            fill className={PodcastCss.imageChild}>
                        </Image>
                    </div>
                </Row>

            </Container>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default blogsAndPodcasts
