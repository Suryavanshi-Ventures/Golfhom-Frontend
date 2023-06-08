import React from "react";
import PodcastCss from "../styles/BlogsAndPodcasts.module.css";
import TopImage from "../../public/images/topImage.png";
import Image from "next/image";
import BottomSection from "../../common components/bottomGroup";
import { Col, Container, Row } from "react-bootstrap";
import OfficialBlog from "../../public/images/officialBlog.webp";
import ShipsSticks from "../../public/images/shipStickks.svg";
import Allbf from "../../public/images/allBf.webp";
import golfWire from "../../public/images/golfWire.webp";
import Bears from "../../public/images/bears.webp";
import GolfBeginners from "../../public/images/golfBeginners.webp";
import Bleav from "../../public/images/bleav.webp";
import WhiteNext from "../../public/images/vector/whiteNext.svg";
import Head from "next/head";
import Link from "next/link";

const BlogsAndPodcasts = () => {
  return (
    <>
      <Head>
        <title>Golfhom | Blog & Podcast</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              src={Bleav}
              alt=" Bleav"
              fill
              className={PodcastCss.imageChild}
            ></Image>
            <Link
              href="https://art19.com/shows/bleav-in-betting-chicago"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Bleav in Betting chicgo</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={OfficialBlog}
              alt="OfficialBlog"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href="https://golfhom.com/blog"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              {" "}
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Golfhom Official Blog</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="Golfhom Official Blog"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>{" "}
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={ShipsSticks}
              alt="ShipsSticks"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href="https://www.shipsticks.com/blog/"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Ship Sticks</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={Allbf}
              alt="Allbf"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href="https://podcasts.apple.com/us/podcast/all-sorts-of-bs/id1538666278"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>All Sorts of BS Podcast</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={golfWire}
              alt="golfWire"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href="https://thegolfwire.com/"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>The Golf Wire</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={Bears}
              alt="Bears"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href=" https://art19.com/shows/bleav-in-bears"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Bleav in Bears</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.imageParent}>
            <Image
              src={GolfBeginners}
              alt="GolfBeginners"
              fill
              className={PodcastCss.imageChild}
            ></Image>
            <Link
              href="https://golf-for-beginners.blogspot.com/"
              target="_blank"
              className={PodcastCss.textImg_link}
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}> Golf For Beginners</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextparent}>
                    <Image
                      src={WhiteNext}
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.whitenext}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </Row>
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default BlogsAndPodcasts;
