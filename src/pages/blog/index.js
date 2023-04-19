import React from "react";
import Head from "next/head";
import BlogCss from "../../styles/Blog.module.css";
import ViewAllProps from "../../../public/images/viewAllProps.png";
import Image from "next/image";
import BottomSection from "../../../common components/bottomGroup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Pagination } from "antd";
import blogs from "../blogs.json";

const index = ({ cards }) => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <>
      <Head>
        <title>Golfhom | Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      {/* TOP IMAGE OF VIEW ALL PROPERTY PAGE */}
      <section className={BlogCss.headImage}>
        <Image
          src={ViewAllProps}
          alt="View All Property Image"
          fill
          className={BlogCss.imageChild}
        ></Image>
      </section>

      {/* NINE CARDS CONTAINER */}

      <Container className={BlogCss.cardsParent}>

        <h2 className={BlogCss.cardsTitle}>From the Golfhōm Staff and Guest Writers</h2>

        <Row>
          {blogs.blogs?.map((item, index) => {
            return <Col md={4} xs={12} key={index} className={BlogCss.columnParent}>
              <div className={BlogCss.parentOf_img_textCard}>
                <div className={BlogCss.imageChild}>
                  <Image
                    src={item.img}
                    fill
                    className={BlogCss.blog_img}
                    alt={item.naming}>
                  </Image>
                </div>

                <div className={BlogCss.cardTextParent}>
                  <h6 className={BlogCss.card_title}>
                    {item.heading}
                  </h6>
                  <div className={BlogCss.contact_div}>
                    <Image
                      src="/images/vector/contact.svg"
                      alt="Contact Image"
                      width={20}
                      height={15}
                      className={BlogCss.contact}
                    ></Image>{" "}
                    <span className={BlogCss.byAdmin}>{item.name}</span>
                  </div>

                  <div className={BlogCss.bookmarkDiv}>
                    <span className={BlogCss.bookmark_text}>
                      {item.golfline}
                    </span>
                  </div>

                  <div className={BlogCss.learnbtn}>
                    <h6 className={BlogCss.learnbtn_text}>Learn More</h6>
                    <Image
                      className={BlogCss.learnIcon}
                      src="/images/vector/learnMore.svg"
                      alt="learnMore"
                      width={15}
                      height={15}
                    ></Image>{" "}
                  </div>
                </div>
              </div></Col>
          })}
        </Row>
      </Container>

      {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
      <div className={BlogCss.pagination_container} >
        <Pagination
          colorText="#FF0000"
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
          className={BlogCss.pagination}
        />
      </div>


      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default index;
