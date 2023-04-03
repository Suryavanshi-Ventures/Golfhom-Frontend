import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import Image from "next/image";
import GirlGroupBannerImage from "../../../public/images/group_girls_banner.svg";
import { Tabs } from "antd";
import TabContentOverview from "./tab_content_overview";
import Carousel from "react-bootstrap/Carousel";
import CarouselGalleryImg from "../../../public/images/view_prop_gallery_img_1.svg";

const ViewProperty = () => {
  const onTabChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `Overview`,
      children: <TabContentOverview />,
    },
    {
      key: "2",
      label: `Gallery`,
      children: (
        <>
          <h1>yoo</h1>
        </>
      ),
    },
    {
      key: "3",
      label: `Features`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <>
      <Head>
        <title>Golfhom | View Property</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* VIEW PROPERTY PAGE STARTED HERE */}
      <main className={ViewPropertyCss.view_prop_bannerimg_section}>
        <div className={ViewPropertyCss.view_prop_bannerimg_container}>
          <Image
            alt="Golf group"
            className={ViewPropertyCss.view_prop_bannerimg}
            src={GirlGroupBannerImage}
            fill
          ></Image>
        </div>

        {/* PROP AMENITITES SECTION START HERE */}
        <Container>
          <Row>
            <Col md={8}>
              <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
        {/* PROP AMENITITES SECTION END HERE */}

        {/* CARASOUL SECTION STARTS HERE */}
        <section>
          <Carousel>
            <Carousel.Item>
              <Image
                className={ViewPropertyCss.carasoul_images}
                fill
                src={CarouselGalleryImg}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className={ViewPropertyCss.carasoul_images}
                fill
                src={CarouselGalleryImg}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className={ViewPropertyCss.carasoul_images}
                fill
                src={CarouselGalleryImg}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </section>
      </main>
    </>
  );
};

export default ViewProperty;
