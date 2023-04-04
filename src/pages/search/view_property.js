import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Button, Dropdown } from "react-bootstrap";
import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import Image from "next/image";
import GirlGroupBannerImage from "../../../public/images/group_girls_banner.svg";
import { Tabs } from "antd";
import TabContentOverview from "./tab_content_overview";
import Carousel from "react-bootstrap/Carousel";
import CarouselGalleryImg from "../../../public/images/view_prop_gallery_img_1.svg";
import { DatePicker } from "antd";

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

  const { RangePicker } = DatePicker;

  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [decrement, setDecrement] = useState(1);

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
          <Row className={ViewPropertyCss.parentRow}>
            <Col md={8}>
              <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
            </Col>

            {/*  ------------    Total price box    ----------   */}
            <Col md={4} className={ViewPropertyCss.backgroundWhite}>
              <div className={ViewPropertyCss.totalParent}>
                <div col-md-5 className={ViewPropertyCss.totalPrice}>
                  <div className={ViewPropertyCss.totalTitle}><h4>Total <br />  Price</h4></div>
                  <div className={ViewPropertyCss.amount}><h5>$0.00</h5></div>
                </div>

                <div col-md-7 className={ViewPropertyCss.bookParent}><Button className={ViewPropertyCss.bookNow}>Book now</Button></div>
              </div>
              <hr className={ViewPropertyCss.horizonaline} />
              <div className={ViewPropertyCss.inner_input_date_picker}>
                <RangePicker
                  size="large"
                  className={ViewPropertyCss.inner_input_date_picker}
                />
              </div>
              <hr />

              <Dropdown>
                <Dropdown.Toggle className={ViewPropertyCss.guest} id="dropdown-basic">
                  Guest
                </Dropdown.Toggle>

                <Dropdown.Menu className={ViewPropertyCss.adultChild}>
                  <div className={ViewPropertyCss.increase}>
                    <div><Dropdown.Item href="#/action-1">  <span>{adult}</span> Adults</Dropdown.Item></div>
                    <div>
                      <Button className={ViewPropertyCss.increaseAdult} onClick={() => {
                        if (adult === 0) {
                          setIncrement(1);
                        } else if (adult === 10) {
                          setDecrement(-1);
                        }
                        setAdult(adult + increment);
                      }}>
                        {increment > 0 ? '+' : '-'}
                      </Button>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.increase}>
                    <div><Dropdown.Item href="#/action-2">  <span>{child}</span> Children</Dropdown.Item></div>
                    <div><Button className={ViewPropertyCss.increaseChild} onClick={() => {
                      if (child === 0) {
                        setIncrement(1);
                      } else if (child === 10) {
                        setIncrement(-1);
                      }
                      setChild(child + increment);
                    }}>
                      {increment > 0 ? '+' : '-'}
                    </Button>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.applyParent}><Button className={ViewPropertyCss.apply}>Apply</Button></div>

                </Dropdown.Menu>
              </Dropdown>
              <hr />

              <div className={ViewPropertyCss.checkParent}><Button className={ViewPropertyCss.check}>Check availability</Button></div>

            </Col>
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
