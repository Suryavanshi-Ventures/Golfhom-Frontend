import React from "react";
import Head from "next/head";
import { Container, Col, Row, Card, Carousel } from "react-bootstrap";
import Index from "../../styles/SearchIndex.module.css";
import { Input } from "antd";
import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Typography } from "antd";
import Image from "next/image";
import { Pagination } from "antd";
import Link from "next/link";
import Buildings from "../../../public/images/buildings.png"
import Grouptalk from "../../../public/images/grouptalk.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Autoplay } from "swiper/core";
import HotelA from "../../../public/images/hotelA.svg";
import HotelB from "../../../public/images/hotelB.svg";
import HotelC from "../../../public/images/hotelC.svg";
import HotelD from "../../../public/images/hotelD.svg";
import beachView from "../../../public/images/beachView.svg";
import Heart from "../../../public/images/vector/heart.svg";
import Dot from "../../../public/images/vector/dot.svg";
// // Import Swiper styles
// import "swiper/css/swiper.css";
// import "swiper/css/autoplay.css";

// Initialize SwiperCore with required modules
// SwiperCore.use([Autoplay]);


const { RangePicker } = DatePicker;

const index = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Head>
        <title>Golfhom | Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/********** EDIT DETAILS SECTION  ***********/}
      <section>
        <main className={Index.edit_details_main_section}>
          <Container>
            <div className={Index.edit_details_main_container}>
              <Row className={Index.edit_details_container_row}>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>Destination</p>

                    <div className={Index.edit_details_inputs_container}>
                      <Input
                        size="large"
                        className={Index.edit_details_inputs}
                        placeholder="Basic usage"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>
                      Stay Dates (1 Night)
                    </p>

                    <div className={Index.edit_details_inputs_container}>
                      <RangePicker
                        size="large"
                        className={Index.edit_details_date_picker}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>Room & Guests</p>
                    <div className={Index.edit_details_inputs_container}>
                      <Dropdown menu={menuProps}>
                        <Button
                          size="large"
                          className={Index.edit_room_dropdown_btn}
                        >
                          <Space className={Index.edit_room_dropdown_btn_space}>
                            Button Drop Down
                            <DownOutlined
                              className={Index.edit_room_dropdown_icon}
                            />
                          </Space>
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_btn_parent_container}>
                    <div className={Index.edit_details_btn_child_container}>
                      <Button size="large" className={Index.edit_details_btn}>
                        Edit
                      </Button>


                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </main>
      </section>

      {/* -----------------------           HEAD IMAGE SECTION             ---------------------  */}

      <section>
        <div className={Index.buildings}>
          <Image className={Index.buildingImg} src={Buildings} alt="buildings" fill></Image>
        </div>
      </section>

      {/* -----------------------            ORLANDO SECTION             ---------------------  */}


      <section className={Index.search_main_section}>
        <Container>
          <Row>
            <h4 className={Index.orlandoHead}>Orlando</h4>

            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={Index.orlandParent}>
                <div className={Index.sortSection} >
                  <h5 className={Index.rental}>150 Rentals</h5>

                  <div className={Index.sortdiv}>
                    <h6 className={Index.sort}>Sort By:</h6>

                    <Dropdown menu={menuProps} className={Index.default}>
                      <Button size="large">
                        <Space>
                          Default order
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                <Row>
                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Link href="/search/view_property">
                          <Image
                            src={HotelA}
                            alt="Hotel View"
                            fill
                            className={Index.carouselImage}
                          >
                          </Image>
                        </Link>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>

                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelA}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelA}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>

                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelB}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelB}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelB}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>

                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>

                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>

                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelC}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>

                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={beachView}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>

                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={beachView}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={beachView}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>

                  <Col md={6} className={Index.carouselBlock}>
                    <Carousel className={Index.carouselParent}>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={Index.imageGap}>
                        <Image
                          src={HotelD}
                          alt="Hotel View"
                          fill
                          className={Index.carouselImage}
                        >
                        </Image>

                        <div className={Index.heartParent}>
                          <Image
                            src={Heart}
                            alt="Heart"
                            fill
                            className={Index.heart}
                          >
                          </Image>
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    <h4 className={Index.carouselHeading}>Hotel Empire Moscow Sokoliki</h4>
                    <p className={Index.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={Index.discribeOfCard}>5 Bed Rooms</span>
                      <Image src={Dot} alt="Dot" className={Index.dot}></Image>
                      <span className={Index.discribeOfCard}>8 Guests Villa</span></div>
                  </Col>
                </Row>

              </div>



            </Col>

            {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
            <Col md={4} className={Index.mapParent}>
              <Image
                fill
                src="/images/mapGroup.svg"
                alt="Map"
                className={Index.map}
              />
            </Col>
          </Row>

          <div className={Index.pagination_container}>
            <Pagination
              colorText="#FF0000"
              showQuickJumper
              defaultCurrent={2}
              total={500}
              onChange={onChange}
              className={Index.pagination}
            />
          </div>
        </Container>
      </section>


      {/* BOTTOM IMAGE SECTION */}

      <section className={Index.grouptalk}>
        <div>
          <div className={Index.groupParent}>
            <Image
              alt="group talk"
              className={Index.grouptalk}
              src={Grouptalk}
              fill
            ></Image>
          </div>

          <Col md={4} className={Index.newBtn}>
            <h4 className={Index.grouptalkTitle}>THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS</h4>
            <Button className={Index.search}>Search</Button>
          </Col>
        </div>
      </section>

    </>
  );
};

export default index;
