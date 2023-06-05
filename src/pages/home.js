/* eslint-disable react/no-unescaped-entities */
import { React, useState, useEffect } from "react";
import Head from "next/head";
import HomeCss from "../styles/Home.module.css";
import Slider from "../slider";
import slides from "../pages/json/countries.json";
import { Container, Col, Row, Card } from "react-bootstrap";
import ads from "../pages/json/ads.json";
import Advertise from "../advertise";
import Image from "next/image";
import { Input, Space, Typography, message } from "antd";
import { Button, DatePicker, Skeleton, Select } from "antd";
const { RangePicker } = DatePicker;
import Video from "../video";
import video from "../pages/json/video.json";
import Review from "../review";
import review from "../pages/json/review.json";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import BottomSection from "../../common components/bottomGroup";
import axios from "axios";
import moment from "moment";
import BlackArrow from "../../public/images/vector/backArrow.svg";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
const placesLibrary = ["places"];

const Home = () => {
  const Router = useRouter();
  const [searchResult, setSearchResult] = useState("");
  const [UrlParamsDateRange, setUrlParamsDateRange] = useState([]);
  const [UrlParamsGeoData, setUrlParamsGeoData] = useState({
    latitude: "",
    longitude: "",
    location_name: "",
  });
  const [InputValue, setInputValue] = useState({
    search_input: "",
  });
  const [AllPropertyData, setAllPropertyData] = useState([{}]);
  const [NightsCounter, setNightsCounter] = useState(0);

  useEffect(() => {
    const GetPropDataFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/v1/property?limit=6&latitude=${34.098967}&longitude=${-118.246683}`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyData(GetPropertyDataRes.data.data);
        }
      } catch (error) {
        console.log("ERROR getting property data", error);
      }
    };

    GetPropDataFunc();

    return () => {
      GetPropDataFunc();
    };
  }, []);

  // FOR ADULT BUTTON INCREMENT AND DECREMENT
  const [adult, setAdult] = useState(0);
  // FOR CHILD BUTTON INCREMENT AND DECREMENT
  const [child, setChild] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: placesLibrary,
  });

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      setUrlParamsGeoData({
        latitude: place.geometry?.location.lat(),
        longitude: place.geometry?.location.lng(),
        location_name: formattedAddress,
      });
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      setInputValue({
        search_input: formattedAddress,
      });
    } else {
      message.error("Please enter text");
    }
  };

  // DROPDOWN FOR SEARCH

  const OnChangeDateRange = (LocationName, DateValue) => {
    const startDate = moment(DateValue[0]); // Replace with your start date
    const endDate = moment(DateValue[1]); // Replace with your end date
    setNightsCounter(endDate.diff(startDate, "days") || 0);
    setUrlParamsDateRange(DateValue);
    console.log("ON CHANGE DATE RANGE", setUrlParamsDateRange);
  };

  const incAdult = () => {
    setAdult(adult + 1);
  };

  const decAdult = () => {
    if (adult > 0) {
      setAdult(adult - 1);
    } else {
      message.error("Sorry number of adults can not be less than 0");
      setAdult(0);
    }
  };

  const incChild = () => {
    setChild(child + 1);
  };

  const decChild = () => {
    if (child > 0) {
      setChild(child - 1);
    } else {
      message.error("Sorry number of children can not be less than 0");
      setChild(0);
    }
  };
  const OnSearchInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const SearchProperty = (e) => {
    e.preventDefault();

    if (UrlParamsGeoData?.location_name === "") {
      message.error("Please fill the destination field");
      return;
    } else {
      Router.push(
        `/search?latitude=${encodeURIComponent(
          UrlParamsGeoData?.latitude
        )}&longitude=${encodeURIComponent(
          UrlParamsGeoData?.longitude
        )}&location_name=${
          UrlParamsGeoData?.location_name
        }&nights=${NightsCounter}&guest=${encodeURIComponent(
          adult + child
        )}&adults=${encodeURIComponent(adult)}&childs=${encodeURIComponent(
          adult
        )}&from=${
          UrlParamsDateRange[0]
            ? UrlParamsDateRange[0]
            : moment().format("MM-DD-YYYY")
        }&to=${
          UrlParamsDateRange[1]
            ? UrlParamsDateRange[1]
            : moment().format("MM-DD-YYYY")
        }&limit=10`
      );
    }
  };

  const latitude = 27.994402;
  const longitude = -81.760254;

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
              <Col lg={3} md={4} className={HomeCss.search_cols_4}>
                {/* <div className={HomeCss.inner_main_container}> */}
                <div className={HomeCss.inner_input_container}>
                  <div className={HomeCss.image_destination}>
                    <Row>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            className={HomeCss.location}
                            width={25}
                            height={25}
                            src="/images/vector/location.svg"
                            alt="Location Image"
                          ></Image>
                        </div>
                      </Col>

                      <Col>
                        <h6 className={HomeCss.destination}>
                          Destination
                          <sup className={HomeCss.important_input_mark}>
                            *
                          </sup>{" "}
                        </h6>
                      </Col>
                    </Row>
                  </div>
                  <div className={HomeCss.inner_input}>
                    {/* <Input
                        className={HomeCss.inner_input_box}
                        size="large"
                        placeholder="Where you want to stay"
                      /> */}

                    {isLoaded ? (
                      <Autocomplete
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoad}
                      >
                        <Input
                          className={HomeCss.inner_input_box}
                          size="large"
                          value={InputValue.search_input}
                          onChange={OnSearchInputChange}
                          name="search_input"
                          placeholder="Where you want to stay"
                        />
                      </Autocomplete>
                    ) : (
                      <Skeleton.Input
                        active={true}
                        size={"mid"}
                        className={HomeCss.input_skeleton}
                      />
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={3} md={4} className={HomeCss.search_cols_4}>
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_input_container}>
                    <Row>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            className={HomeCss.location}
                            width={35}
                            height={35}
                            src="/images/vector/family_search_icon.svg"
                            alt="family Image"
                          ></Image>
                        </div>
                      </Col>

                      <Col>
                        <h6 className={HomeCss.destination}>
                          {adult + child} Guests
                          <sup className={HomeCss.important_input_mark}>*</sup>
                        </h6>
                      </Col>
                    </Row>

                    <div className={HomeCss.inner_input_guest_selector}>
                      {/* <RangePicker
                        size="large"
                        className={HomeCss.inner_input_date_picker}
                      /> */}
                      <div className={HomeCss.geust_incri_btns_div}>
                        <p className={HomeCss.geust_incri_btns_p}>Adult</p>
                        <Button className={HomeCss.increaseAdult}>
                          <div
                            className={HomeCss.decreasebtn}
                            onClick={decAdult}
                          >
                            -
                          </div>
                          <div className={HomeCss.guest_count_div}>{adult}</div>
                          <div
                            className={HomeCss.increasebtn}
                            onClick={incAdult}
                          >
                            +
                          </div>
                        </Button>
                      </div>

                      <div className={HomeCss.geust_incri_btns_div}>
                        <p className={HomeCss.geust_incri_btns_p}>Children</p>
                        <Button className={HomeCss.increaseAdult}>
                          <div
                            className={HomeCss.decreasebtn}
                            onClick={decChild}
                          >
                            -
                          </div>
                          <div className={HomeCss.guest_count_div}>{child}</div>
                          <div
                            className={HomeCss.increasebtn}
                            onClick={incChild}
                          >
                            +
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                lg={3}
                md={4}
                className={`${HomeCss.search_cols_4} ${HomeCss.search_bar_nights_col}`}
              >
                <div className={HomeCss.inner_main_container}>
                  <div className={HomeCss.inner_input_containerNight}>
                    <Row>
                      <Col xs={"auto"}>
                        <div className={HomeCss.inner_icon_container}>
                          <Image
                            className={HomeCss.location}
                            width={25}
                            height={25}
                            src="/images/vector/calender.svg"
                            alt="Calender Image"
                          ></Image>
                        </div>
                      </Col>
                      <Col>
                        <h6 className={HomeCss.destination}>
                          {NightsCounter} Nights
                          <sup className={HomeCss.important_input_mark}>*</sup>
                        </h6>
                      </Col>
                    </Row>
                    <div className={HomeCss.inner_input_date_picker}>
                      <RangePicker
                        size="large"
                        format={"MM-DD-YYYY"}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                        onChange={OnChangeDateRange}
                        className={HomeCss.inner_input_date_picker}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className={HomeCss.search_btn_col}>
                <div className={HomeCss.search_btn_container}>
                  <Button
                    onClick={SearchProperty}
                    className={HomeCss.search_btn}
                    type="primary"
                  >
                    Search
                  </Button>
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
            outdoor lifestyles, & of course for having some of the world’s best
            golf courses! Golfhōm has a growing selection of golf
            course-vicinity vacation rentals that deliver the comforts of home,
            luxe amenities, and access to plenty of Arizona and Florida
            attractions!
          </p>

          <Row>
            <Col md={9}>
              <p className={HomeCss.para}>
                {" "}
                Golfhōm is transforming how golfers locate and book their next
                luxury golf vacation rental. Book with us today!
              </p>
            </Col>

            <Col md={3}>
              <Link
                href="/search/view_all_property"
                style={{ textDecoration: "none" }}
              >
                <div className={HomeCss.viewallBtnParent}>
                  <Button className={HomeCss.viewallBtn}>View All</Button>
                </div>
              </Link>
            </Col>
          </Row>
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
                              HomeCss.search_by_golf_input_container_select
                            }
                          >
                            <Select
                              defaultValue=" Please select tournament"
                              options={[
                                {
                                  value: "PGA Championship",
                                  label: "PGA Championship",
                                },
                                {
                                  value: "The Master",
                                  label: "The Master",
                                },
                                {
                                  value: "The open championship",
                                  label: "The open championship",
                                },
                                {
                                  value: "The Tradition at Quinta",
                                  label: "The Tradition at Quinta",
                                },
                                {
                                  value: "US Open",
                                  label: "US Open",
                                },
                              ]}
                              trigger={["click"]}
                              className={
                                HomeCss.search_by_golf_input_container_tourniA
                              }
                              size="large"
                            >
                              <Select.Option
                                onClick={(e) => e.preventDefault()}
                              >
                                <Typography.Link>
                                  <Space
                                    className={
                                      HomeCss.search_by_golf_input_search_by_tourni
                                    }
                                  ></Space>
                                </Typography.Link>
                              </Select.Option>
                            </Select>
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
      <main main className={HomeCss.hottest_new_arrival_section}>
        <Container>
          <Row className={HomeCss.arrivalContainer}>
            <Col xl={4} lg={4} className={HomeCss.arrivalContainer_child}>
              <div className={HomeCss.paraHeading}>
                <h2 className={HomeCss.hottest_new_arrival__heading}>
                  Golfhōm Hottest New Arrivals
                </h2>
                <p className={HomeCss.subHeading}>
                  Experience the Coolest Golfhōms on the Planet: Step into a
                  world of luxury and innovation, where impeccable design meets
                  unrivaled performance.
                </p>

                <div className={HomeCss.explore_more_container}>
                  <h4 className={HomeCss.subHeading}>
                    Explore More New Rentals{" "}
                  </h4>
                  <div className={HomeCss.explore_more_arrow_container}>
                    <Image
                      src={BlackArrow}
                      alt="BlackArrow"
                      width={22}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </Col>

            <Col xl={4} lg={4} className={HomeCss.midImage}>
              <h6 className={HomeCss.midImgTitle}>
                <Link
                  href={`/search?latitude=${encodeURIComponent(
                    latitude
                  )}&longitude=${encodeURIComponent(longitude)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sao Paulo, New york{" "}
                </Link>
              </h6>
            </Col>

            <Col xl={4} lg={4} className={HomeCss.twoImgContainer}>
              <div>
                <h6 className={HomeCss.madridImg}>
                  <Link
                    href={`/search?latitude=${encodeURIComponent(
                      latitude
                    )}&longitude=${encodeURIComponent(longitude)}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    The Madrid EDITION{" "}
                  </Link>
                </h6>
              </div>
              <div>
                <h6 className={HomeCss.resortImg}>
                  <Link
                    href={`/search?latitude=${encodeURIComponent(
                      latitude
                    )}&longitude=${encodeURIComponent(longitude)}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    The Westin Anaheim Resort{" "}
                  </Link>
                </h6>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* --------------------------------------    CARD SECTION   -----------------------------   */}

      <div div className={HomeCss.cardBg}>
        <Container>
          <h2 className={HomeCss.cardHeading}>Reserve a Featured Golfhōm</h2>
          <Row>
            {AllPropertyData.map((data, i) => {
              return (
                <Col md={5} lg={4} key={i}>
                  <Card
                    onClick={() => {
                      Router.push(
                        `search/${encodeURIComponent(data.name)}/${data.id}`
                      );
                    }}
                    className={HomeCss.MainCard}
                  >
                    <Card.Img
                      variant="top"
                      className={HomeCss.cardImg}
                      src={data.imageUrl}
                      alt="Bed Image"
                    />
                    <Card.Body>
                      <Card.Title className={HomeCss.cardImgTitle}>
                        {data.name}
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
                            <span className={HomeCss.iconImg_spans}>
                              {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/bath-tub.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.bathrooms ? data.bathrooms : 1} Baths
                            </span>
                          </div>

                          <div className={HomeCss.iconImg}>
                            <Image
                              width={18}
                              height={18}
                              src="/images/vector/guest.svg"
                              alt="iconImage"
                            ></Image>
                            <span className={HomeCss.iconImg_spans}>
                              {data.accomodation ? data.accomodation : 1} Guests
                              Villa
                            </span>
                          </div>
                        </div>

                        <div className={HomeCss.parking}>
                          <Image
                            width={20}
                            height={14}
                            className={HomeCss.rightArrow}
                            src="./images/vector/right_arrow.svg"
                            alt="iconImage"
                          ></Image>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
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
            Enhance your skills with expert guidance from <br /> professional
            instructors and coaches.
          </p>
        </div>

        <Video videos={video} />
      </Container>

      {/* ------------------------------          STAFF N WRITERS          ----------------------------- */}

      <Container className={HomeCss.staffCard}>
        <Row>
          <Col md={8} className={HomeCss.staffCard_title_main_container}>
            <h2 className={HomeCss.staffCard_title}>
              From the Golfhōm Staff and Guest Writers
            </h2>
          </Col>

          <Col md={4} className={HomeCss.viewallBtnParent}>
            <Button className={HomeCss.viewallBtn}>View All</Button>
          </Col>
        </Row>
        <Review reviews={review} />
      </Container>

      <BottomSection />
    </>
  );
};

export default Home;
