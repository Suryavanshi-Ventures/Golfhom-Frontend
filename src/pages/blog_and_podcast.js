import PodcastCss from "../styles/BlogsAndPodcasts.module.css";
import Image from "next/image";
import { Container, Row } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
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

      <div>
        <Image
          src="https://golf-hom-latest-assets.s3.amazonaws.com/images/topImage.png"
          fill
          className={PodcastCss.topImage}
          alt="Banner Image"
        ></Image>
      </div>

      {/*   ---------------------------         PODCAST MID CONTAINER           -----------------------    */}

      <Container className={PodcastCss.img_container}>
        <Row className={PodcastCss.mainRow}>
          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/bleav.webp"
              alt="Bleav"
              fill
              className={PodcastCss.imageChild}
            ></Image>
            <Link
              href="https://art19.com/shows/bleav-in-betting-chicago"
              target="_blank"
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Bleav in Betting chicgo</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/officialBlog.webp"
              alt="OfficialBlog"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link href="https://golfhom.com/blog" target="_blank">
              {" "}
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Golfhom Official Blog</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="Golfhom Official Blog"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>{" "}
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/shipStickks.svg"
              alt="ShipsSticks"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link href="https://www.shipsticks.com/blog/" target="_blank">
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Ship Sticks</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/allBf.webp"
              alt="Allbf"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link
              href="https://podcasts.apple.com/us/podcast/all-sorts-of-bs/id1538666278"
              target="_blank"
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>All Sorts of BS Podcast</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/golfWire.webp"
              alt="golfWire"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link href="https://thegolfwire.com/" target="_blank">
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>The Golf Wire</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/bears.webp"
              alt="Bears"
              fill
              className={PodcastCss.imageChild}
            ></Image>

            <Link href="https://art19.com/shows/bleav-in-bears" target="_blank">
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}>Bleav in Bears</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className={PodcastCss.img_Parent}>
            <Image
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/golfBeginners.webp"
              alt="GolfBeginners"
              fill
              className={PodcastCss.imageChild}
            ></Image>
            <Link
              href="https://golf-for-beginners.blogspot.com/"
              target="_blank"
            >
              <div className={PodcastCss.textImg}>
                <h4 className={PodcastCss.title}> Golf For Beginners</h4>
                <div className={PodcastCss.readNext}>
                  <p className={PodcastCss.read}>Read more</p>
                  <div className={PodcastCss.nextArrow}>
                    <Image
                      src="https://golf-hom-latest-assets.s3.amazonaws.com/images/vector/whiteNext.svg"
                      alt="WhiteNext"
                      fill
                      className={PodcastCss.arrow}
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
