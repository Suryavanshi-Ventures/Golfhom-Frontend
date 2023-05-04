/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import HomeCss from "../styles/Home.module.css";
import Slider from "../slider";
import slides from "../pages/json/countries.json";
import { Container, Col, Row, Card } from "react-bootstrap";
import ads from "../pages/json/ads.json";
import Advertise from "../advertise";
import Image from "next/image";
import { Dropdown, Input, Space, Typography } from "antd";
import { Button } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import Video from "../video";
import video from "../pages/json/video.json";
import Review from "../review";
import review from "../pages/json/review.json";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import BottomSection from "../../common components/bottomGroup";

const Home = () => {
  const onSearch = (value) => console.log(value);

  // DROPDOWN FOR SEARCH

  const items = [
    {
      label: "PGA Championship",
      key: "1",
    },
    {
      label: "The Master",
      key: "2",
    },
    {
      label: "The open champioship",
      key: "3",
    },
    {
      label: "The Tradition at Quinta",
      key: "4",
    },
    {
      label: "US Open",
      key: "5",
    },
  ];

  return (
    <>
      <Head>
        <title>Golfhom | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ---------------------------------          NAVBAR SECTION               -------------------------------    */}

      <div className={HomeCss.search_bar_img_div}>
        <div className={HomeCss.search_bar_main_container}>
          <div className={HomeCss.search_bar_container}>
            <Row className={HomeCss.searchBar}>
              <Col md={4} className={HomeCss.search_cols_4}>
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_icon_container}>
                    <Image
                      className={HomeCss.location}
                      width={25}
                      height={25}
                      src="/images/vector/location.svg"
                      alt="Location Image"
                    ></Image>
                  </div>
                  <div className={HomeCss.inner_input_container}>
                    <h6 className={HomeCss.destination}>DESTINATION</h6>
                    <div className={HomeCss.inner_input}>
                      <Input
                        className={HomeCss.inner_input_box}
                        size="large"
                        placeholder="Where you want to stay"
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className={HomeCss.search_cols_4}>
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_icon_container}>
                    <Image
                      className={HomeCss.location}
                      width={25}
                      height={25}
                      src="/images/vector/calender.svg"
                      alt="Calender Image"
                    ></Image>
                  </div>
                  <div className={HomeCss.inner_input_container}>
                    <h6 className={HomeCss.destination}>2 NIGHT</h6>
                    <div className={HomeCss.inner_input_date_picker}>
                      <RangePicker
                        size="large"
                        className={HomeCss.inner_input_date_picker}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className={HomeCss.search_btn_col}>
                <div className={HomeCss.search_btn_container}>
                  <Link href="/search">
                    <Button className={HomeCss.search_btn} type="primary">
                      Search
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/*  ----------------------------             SWIPER CONTAINER           -------------------------   */}

      <Container>
        <div className={HomeCss.golfCourses}>
          <h2 className={HomeCss.main_golfHeading}>
            Find Great Vacation Rentals near Florida & Arizona{" "}
          </h2>
          <h1 className={HomeCss.golfHeading}>Golf Courses!</h1>
          <br />
          <p className={HomeCss.para}>
            Arizona and Florida are renowned for their beautiful surroundings,
            outdoor lifeHomeCsss, & of course for having some of the world’s
            best golf courses! Golfhōm has a growing selection of golf
            course-vicinity vacation rentals that deliver the comforts of home,
            luxe amenities, and access to plenty of Arizona and Florida
            attractions! Golfhōm is transforming how golfers locate and book
            their next luxury golf vacation rental. Book with us today!
          </p>

          <Link
            href="/search/view_all_property"
            style={{ textDecoration: "none" }}
          >
            <div className={HomeCss.viewallBtnParent}>
              <Button className={HomeCss.viewallBtn}>View All</Button>
            </div>
          </Link>
        </div>

        <Slider slides={slides} />
      </Container>

      {/* ---------------------------              SEARCH CONTAINER              ----------------------    */}

      <main className={HomeCss.search_by_golf_course_Section}>
        <Container>
          <main className={HomeCss.searchSection}>
            <div className={HomeCss.searchSection_overlay}>
              <div className={HomeCss.content}>
                <h3 className={HomeCss.Title}>
                  Search the World Over by Course
                  <br />
                  (38,000+ in our database) or Tournament
                </h3>

                <p className={HomeCss.searchPara}>
                  *We're downloading more great Golfhōms each day from our
                  valued channel partners!
                </p>

                <div className={HomeCss.search_by_golf_containers}>
                  <Row className={HomeCss.search_by_golf_row}>
                    <Col md={6} className={HomeCss.search_by_golf_cols}>
                      <div
                        className={HomeCss.search_by_golf_input_main_container}
                      >
                        <h3
                          className={
                            HomeCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by golf course
                        </h3>
                        <p
                          className={
                            HomeCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Choose from thousands world-wide
                        </p>

                        <div
                          className={
                            HomeCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={HomeCss.search_by_golf_input_container}
                          >
                            <Input
                              placeholder="Enter Location"
                              prefix={<SearchOutlined />}
                              className={HomeCss.search_by_golf_inputs}
                            />
                          </div>
                          <div
                            className={HomeCss.search_by_golf_input_container}
                          >
                            <Input
                              placeholder="Golf Course"
                              prefix={<SearchOutlined />}
                              className={HomeCss.search_by_golf_inputs}
                            />
                          </div>
                        </div>

                        <div className={HomeCss.search_by_golf_btn_container}>
                          <Button
                            className={HomeCss.search_by_golf_btn}
                            type="primary"
                          >
                            SEARCH
                          </Button>
                        </div>
                      </div>
                    </Col>

                    <Col md={6} className={HomeCss.search_by_golf_cols}>
                      <div
                        className={HomeCss.search_by_golf_input_main_container}
                      >
                        <h3
                          className={
                            HomeCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by Tournaments
                        </h3>
                        <p
                          className={
                            HomeCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Check out our growing list of tour-spot rentals
                        </p>

                        <div
                          className={
                            HomeCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={
                              HomeCss.search_by_golf_input_container_tourni
                            }
                          >
                            <Dropdown
                              menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ["3"],
                              }}
                              trigger={["click"]}
                              className={
                                HomeCss.search_by_golf_input_container_tourni
                              }
                              prefix={<DownOutlined />}
                            >
                              <span onClick={(e) => e.preventDefault()}>
                                <Typography.Link>
                                  <Space
                                    className={
                                      HomeCss.search_by_golf_input_search_by_tourni
                                    }
                                  >
                                    <DownOutlined />
                                    Please select tournament
                                  </Space>
                                </Typography.Link>
                              </span>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                      <div className={HomeCss.search_by_golf_btn_container}>
                        <Link href="searchByTournaments">
                          <Button
                            className={HomeCss.search_by_golf_btn}
                            type="primary"
                          >
                            SEARCH
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </main>
        </Container>
      </main>

      {/* -------------------------------------    Golfhōm Hottest New Arrivals ---------------------------- */}
      <main className={HomeCss.hottest_new_arrival_section}>
        <Container>
          <h2 className={HomeCss.hottest_new_arrival__heading}>
            Golfhōm Hottest New Arrivals
          </h2>
          <div className={HomeCss.arrivalContainer}>
            <div className={HomeCss.arrivalContainer_child}>
              <div className={HomeCss.paraHeading}>
                <p className={HomeCss.subHeading}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>

                <div className={HomeCss.explore_more_container}>
                  <h4 className={HomeCss.subHeading}>
                    Explore More New Rentals{" "}
                  </h4>
                  <div className={HomeCss.explore_more_arrow_container}>
                    <Link href="/">
                      <ArrowRightOutlined
                        className={HomeCss.explore_more_arrow_icon}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <h6 className={HomeCss.newyork}>
                The Ritz-Carlton New York, NoMad
              </h6>
            </div>

            <div className={HomeCss.midImage}>
              <h6 className={HomeCss.midImgTitle}> Sao Paulo, New york </h6>
            </div>

            <div className={HomeCss.twoImgContainer}>
              <div>
                <h6 className={HomeCss.madridImg}> The Madrid EDITION</h6>
              </div>
              <div>
                <h6 className={HomeCss.resortImg}>
                  {" "}
                  The Westin Anaheim Resort{" "}
                </h6>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* --------------------------------------    CARD SECTION   -----------------------------   */}

      <div className={HomeCss.cardBg}>
        <Container>
          <h2 className={HomeCss.cardHeading}>Reserve a Featured Golfhōm</h2>
          <Card className={HomeCss.MainCard}>
            <Card.Img
              variant="top"
              className={HomeCss.cardImg}
              src="/images/bedRoom.svg"
              alt="Bed Image"
            />
            <Card.Body>
              <Card.Title className={HomeCss.cardImgTitle}>
                Tampa Golf Villas 5 King or 12 Beds at Saddlebrook
              </Card.Title>

              <div>
                <p className={HomeCss.saddle}>
                  {" "}
                  Saddlebrook Resort - Saddlebrook & 1 more
                </p>

                <div className={HomeCss.icon}>
                  <div className={HomeCss.iconImg}>
                    <Image
                      width={18}
                      height={18}
                      src="/images/vector/bed.svg"
                      alt="iconImage"
                    ></Image>
                    <span className={HomeCss.iconImg_spans}>5 Bed Rooms</span>
                  </div>

                  <div className={HomeCss.iconImg}>
                    <Image
                      width={18}
                      height={18}
                      src="/images/vector/bath-tub.svg"
                      alt="iconImage"
                    ></Image>
                    <span className={HomeCss.iconImg_spans}>4 Baths</span>
                  </div>

                  <div className={HomeCss.iconImg}>
                    <Image
                      width={18}
                      height={18}
                      src="/images/vector/guest.svg"
                      alt="iconImage"
                    ></Image>
                    <span className={HomeCss.iconImg_spans}>
                      5 Guests Villa
                    </span>
                  </div>
                  <div className={HomeCss.iconImg}>
                    <Image
                      width={20}
                      height={20}
                      src="/images/vector/parking-area.svg"
                      alt="iconImage"
                    ></Image>
                    <span className={HomeCss.iconImg_spans}>Parking Area</span>
                  </div>
                </div>

                <div className={HomeCss.parking}>
                  <Image
                    width={20}
                    height={14}
                    className={HomeCss.rightArrow}
                    src="/images/vector/right_Arrow.svg"
                    alt="iconImage"
                  ></Image>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* ------------------------------        GOLFING AND TRAVELING     ------------------------  */}

      <Container className={HomeCss.ads}>
        <h2 className={HomeCss.adsTitle}>
          Golfing and Traveling, Both Better with Friends
        </h2>

        <Advertise ads={ads} />
      </Container>

      {/* ------------------------------           TRAINING VIDEOS          ---------------------------   */}

      <Container className={HomeCss.videoContain}>
        <h2 className={HomeCss.golf_training_heading}>Golf Training Videos</h2>
        <div className={HomeCss.paraBtn}>
          <p className={HomeCss.paratext}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            <br /> industry. Lorem Ipsum has been the industry's standard dummy
            text.
          </p>

          <button className={HomeCss.viewAll}>View All</button>
        </div>

        <Video videos={video} />
      </Container>

      {/* ------------------------------          STAFF N WRITERS          ----------------------------- */}

      <Container className={HomeCss.staffCard}>
        <h2 className={HomeCss.staffCard_title}>
          From the Golfhōm Staff and Guest Writers
        </h2>
        <Review reviews={review} />
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Home;
