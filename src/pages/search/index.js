/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, React } from "react";
import Head from "next/head";
import { Container, Col, Row, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import SearchIndexCss from "../../styles/SearchIndex.module.css";
import { Checkbox, Input } from "antd";
import { DatePicker } from "antd";
import { DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import Image from "next/image";
import { Pagination } from "antd";
import Link from "next/link";
import Buildings from "../../../public/images/buildings.png";
import BottomSection from "../../../common components/bottomGroup";
import CarouselImages from "../../../common components/carouselMap";
import CarasoulMapCss from "../../styles/CarouselMap.module.css";
import HotelA from "../../../public/images/hotelA.svg";
import Heart from "../../../public/images/vector/heart.svg";
import Dot from "../../../public/images/vector/dot.svg";
import Map from "../../../common components/map";
import Loader from "../../../common components/loader";
import axios from "axios";
import { useRouter } from "next/router";

const { RangePicker } = DatePicker;

const Index = () => {
  const Router = useRouter();
  const [showHidden, setShowHidden] = useState(false);
  const [LengthOfProperty, SetLengthOfProperty] = useState(0);
  const [PropertyData, SetPropertyData] = useState([]);
  const [PaginationState, SetPagination] = useState(1);

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setShowHidden(true);
    setIsVisible(false);
  };

  useEffect(() => {
    const GetPropertyData = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=10&page=${PaginationState}`
    );
    GetPropertyData.then((response) => {
      if (response.status === 200) {
        SetPropertyData(response.data.data);
        SetLengthOfProperty(response.data.data.length);
      }
    }).catch((err) => {
      console.log(err, "ERR");
    });
  }, []);
  console.log(PropertyData, "API RESPONSE");

  const handleSelectA = (selectedIndex) => {
    setIndex(selectedIndex);
    console.log("ONCCHANGEEEEEEEEEEEEEEE 11111111111111111");
  };

  const OnPaginationChange = (pageNumber) => {
    console.log("ONCCHANGEEEEEEEEEEEEEEE 222222222222");

    const GetPropertyData = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=10&page=${pageNumber}`
    );
    GetPropertyData.then((response) => {
      if (response.status === 200) {
        SetPropertyData(response.data.data);
        SetLengthOfProperty(response.data.data.length);
      }
    }).catch((err) => {
      console.log(err, "ERR");
    });

    SetPagination(pageNumber);
    console.log("Page: ", pageNumber);
  };

  const SendPropertyData = (params) => {
    console.log(params, "SPEECIFIC DATA");
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

  const HiddenModal = () => {
    return (
      <>
        {/* EDIT DROP DETAIL SECTION */}

        <Row>
          <Col md={3} className={SearchIndexCss.edit_details_container_cols}>
            <div className={SearchIndexCss.edit_details_divs}>
              <p className={SearchIndexCss.edit_details_titles}>
                Golf Course Choice
              </p>
              <div className={SearchIndexCss.edit_details_inputs_container}>
                <Dropdown menu={menuProps}>
                  <Button
                    size="large"
                    className={SearchIndexCss.edit_room_dropdown_btn}
                  >
                    <Space
                      className={SearchIndexCss.edit_room_dropdown_btn_space}
                    >
                      Location
                      <DownOutlined
                        className={SearchIndexCss.edit_room_dropdown_icon}
                      />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </Col>

          <Col md={3} className={SearchIndexCss.edit_details_container_cols}>
            <div className={SearchIndexCss.edit_details_divs}>
              <p className={SearchIndexCss.edit_details_titles}>Golf Course</p>
              <div className={SearchIndexCss.edit_details_inputs_container}>
                <Dropdown menu={menuProps}>
                  <Button
                    size="large"
                    className={SearchIndexCss.edit_room_dropdown_btn}
                  >
                    <Space
                      className={SearchIndexCss.edit_room_dropdown_btn_space}
                    >
                      Location
                      <DownOutlined
                        className={SearchIndexCss.edit_room_dropdown_icon}
                      />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </Col>

          <Col md={6} className={SearchIndexCss.twoCheckbox}>
            <Col md={3} sm={6}>
              <Checkbox>Golf Course Front</Checkbox>
            </Col>
            <Col md={4} sm={6}>
              <Checkbox>Golf Course Community</Checkbox>
            </Col>

            <Col md={3} sm={5}>
              <Button
                onClick={() => setShowHidden(true)}
                className={SearchIndexCss.searching}
              >
                Search
              </Button>
            </Col>
          </Col>
        </Row>
      </>
    );
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
        <main className={SearchIndexCss.edit_details_main_section}>
          <Container>
            <div className={SearchIndexCss.edit_details_main_container}>
              <Row className={SearchIndexCss.edit_details_container_row}>
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>
                      Destination
                    </p>

                    <div
                      className={SearchIndexCss.edit_details_inputs_container}
                    >
                      <Input
                        size="large"
                        className={SearchIndexCss.edit_details_inputs}
                        placeholder="Basic usage"
                      />
                    </div>
                  </div>
                </Col>

                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>
                      Stay Dates (1 Night)
                    </p>

                    <div
                      className={SearchIndexCss.edit_details_inputs_container}
                    >
                      <RangePicker
                        size="large"
                        className={SearchIndexCss.edit_details_date_picker}
                      />
                    </div>
                  </div>
                </Col>
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>
                      Room & Guests
                    </p>
                    <div
                      className={SearchIndexCss.edit_details_inputs_container}
                    >
                      <Dropdown menu={menuProps}>
                        <Button
                          size="large"
                          className={SearchIndexCss.edit_room_dropdown_btn}
                        >
                          <Space
                            className={
                              SearchIndexCss.edit_room_dropdown_btn_space
                            }
                          >
                            Button Drop Down
                            <DownOutlined
                              className={SearchIndexCss.edit_room_dropdown_icon}
                            />
                          </Space>
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div
                    className={SearchIndexCss.edit_details_btn_parent_container}
                  >
                    <div
                      className={
                        SearchIndexCss.edit_details_btn_child_container
                      }
                    >
                      {isVisible && (
                        <Button
                          size="large"
                          className={SearchIndexCss.edit_details_btn}
                          // onClick={() => setShowHidden(true)}
                          onClick={handleClick}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
                {showHidden && <HiddenModal />}
              </Row>
            </div>
          </Container>
        </main>
      </section>

      {/* -----------------------           HEAD IMAGE SECTION             ---------------------  */}

      <section>
        <div className={SearchIndexCss.buildings}>
          <Image
            className={SearchIndexCss.buildingImg}
            src={Buildings}
            alt="buildings"
            fill
            priority
          ></Image>
        </div>
      </section>

      {/* -----------------------            ORLANDO SECTION             ---------------------  */}

      <section className={SearchIndexCss.search_main_section}>
        <Container>
          <Row>
            <h4 className={SearchIndexCss.orlandoHead}>Orlando</h4>
            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={SearchIndexCss.orlandParent}>
                <div className={SearchIndexCss.sortSection}>
                  <h5 className={SearchIndexCss.rental}>
                    {LengthOfProperty} Rentals
                  </h5>

                  <div className={SearchIndexCss.sortdiv}>
                    <h6 className={SearchIndexCss.sort}>Sort By:</h6>

                    <Dropdown
                      menu={menuProps}
                      className={SearchIndexCss.default}
                    >
                      <Button size="large">
                        <Space>
                          Default order
                          <CaretDownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                {/* ------------------- CAROUSEL IMAGES STARTS  -----------------------  */}
                {/* <CarouselImages /> */}
                <Row>
                  {/* <Loader /> */}

                  {PropertyData.length === 0 ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <>
                      {PropertyData.map((data, id) => (
                        <Col
                          md={6}
                          key={data.id}
                          className={CarasoulMapCss.carouselBlock}
                        >
                          <Carousel
                            wrap={true}
                            key={data.id}
                            activeIndex={index}
                            onSelect={handleSelectA}
                            indicators={false}
                            interval={null}
                            className={CarasoulMapCss.carouselParent}
                          >
                            <Carousel.Item className={CarasoulMapCss.imageGap}>
                              <Link
                                onClick={(e) => {
                                  Router.push(
                                    `search/view_property/${data.id}`
                                  );
                                  e.preventDefault();
                                }}
                                href=""
                              >
                                {data.otherImageUrls.map(
                                  (ImageUrl, ImageIndex) => {
                                    return (
                                      <Image
                                        key={ImageIndex}
                                        src={ImageUrl}
                                        onClick={() => {
                                          SendPropertyData(data);
                                        }}
                                        alt="Hotel View"
                                        fill
                                        className={CarasoulMapCss.carouselImage}
                                        priority
                                      ></Image>
                                    );
                                  }
                                )}
                              </Link>

                              {/* <div className={CarasoulMapCss.heartParent}>
                                <Link href="/search/view_property">
                                  <Image
                                    src={Heart}
                                    alt="Heart"
                                    fill
                                    className={CarasoulMapCss.heart}
                                  ></Image>
                                </Link>
                              </div> */}
                            </Carousel.Item>

                            <ol className="carousel-indicators">
                              <li
                                className={index === 0 ? "active" : ""}
                                onClick={() => setIndex(0)}
                              ></li>
                              <li
                                className={index === 1 ? "active" : ""}
                                onClick={() => setIndex(1)}
                              ></li>
                              <li
                                className={index === 2 ? "active" : ""}
                                onClick={() => setIndex(2)}
                              ></li>
                            </ol>
                          </Carousel>

                          <Link
                            onClick={(e) => {
                              Router.push(`search/view_property/${data.id}`);
                              e.preventDefault();
                            }}
                            href=""
                            style={{ textDecoration: "none" }}
                          >
                            <h4 className={CarasoulMapCss.carouselHeading}>
                              {data.name}
                            </h4>
                          </Link>
                          <p className={CarasoulMapCss.discribeOfCard}>
                            {data.golfCourseName}
                          </p>

                          <div>
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.bedrooms} Bed Rooms
                            </span>
                            <Image
                              src={Dot}
                              alt="Dot"
                              className={CarasoulMapCss.dot}
                            ></Image>
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.accomodation} Guests Villa
                            </span>

                            <h5 className={CarasoulMapCss.price_of_property}>
                              <sup>From</sup> ${data.price}/Night
                            </h5>
                          </div>
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </div>
            </Col>
            {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
            <Col md={4} className={SearchIndexCss.mapParent}>
              <Map />
            </Col>
          </Row>

          <div className={SearchIndexCss.pagination_container}>
            <Pagination
              colorText="#FF0000"
              showQuickJumper={false}
              showSizeChanger={false}
              defaultCurrent={1}
              total={500}
              onChange={OnPaginationChange}
              className={SearchIndexCss.pagination}
            />
          </div>
        </Container>
      </section>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Index;
