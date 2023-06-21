/* eslint-disable react/no-unescaped-entities */
import { React, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import HomeCss from "../../styles/Home.module.css";
import Slider from "../../slider";
import slides from "../../pages/json/countries.json";
import { Container, Col, Row, Card } from "react-bootstrap";
import ads from "../../pages/json/ads.json";
import Advertise from "../../advertise";
import Image from "next/image";
import { Input, message, Button, DatePicker, Skeleton } from "antd";
const { RangePicker } = DatePicker;
import Video from "../../video";
import video from "../../pages/json/video.json";
import Review from "../../review";
import review from "../../pages/json/review.json";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
const placesLibrary = ["places"];
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const SearchByGolfCourse = dynamic(
  () => import("../../pages/home/components/SearchByGolfCourse"),
  {
    suspense: true,
  }
);

const Home = () => {
  const Router = useRouter();
  const [searchResult, setSearchResult] = useState("");
  const [UrlParamsDateRange, setUrlParamsDateRange] = useState([]);
  const [UrlParamsGeoData, setUrlParamsGeoData] = useState({
    latitude: "",
    longitude: "",
    location_name: "",
  });
  const [InputValue, setInputValue] = useState("");
  const [AllPropertyData, setAllPropertyData] = useState([{}]);
  const [NightsCounter, setNightsCounter] = useState(0);

  useEffect(() => {
    const GetPropDataFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/v1/property?limit=6&latitude=${52.3757}&longitude=${5.2171655}`
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
      setInputValue(formattedAddress);
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
          child
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

  const LatitudeSaoPaul = -23.533773;
  const LongitudeSaoPaul = -46.62529;
  const SpainMadridLatitude = 40.416775;
  const SpainMadridLongitude = -3.70379;
  const AnaheimLatitude = 33.835293;
  const AnaheimLongitude = -117.914505;

  return (
    <>
      <Head>
        <title>Golfhom | Home</title>
        <meta
          name="description"
          content="Welcome to Golfhōm, your new haven for discovering the perfect golf vacation rental. Say goodbye to the days of tirelessly sorting through irrelevant results on generic vacation websites. Instead, allow yourself to dive into a platform meticulously curated for passionate golf enthusiasts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ---------------------------------          NAVBAR SECTION               -------------------------------    */}

      <div className={HomeCss.search_bar_img_div}>
        <div className={HomeCss.overlay}></div>
        <video
          src="https://golf-hom-latest-assets.s3.amazonaws.com/videos/home_video.mp4"
          autoPlay
          loop
          muted
          className={HomeCss.videoPlay}
        >
          <source src="/videos/home_video.mp4" type="video/mp4" />
        </video>
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
                  <div>
                    {isLoaded ? (
                      <Autocomplete
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoad}
                      >
                        <Input
                          className={HomeCss.inner_input_box}
                          size="large"
                          value={InputValue}
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
                        </h6>
                      </Col>
                    </Row>

                    <div className={HomeCss.inner_input_guest_selector}>
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
          <h3 className={HomeCss.main_golfHeading}>
            Find Great Vacation Rentals near Florida, Arizona, Hawaii & South
            Carolina
          </h3>
          <h1 className={HomeCss.golfHeading}>Golf Courses!</h1>
          <br />
          <p className={HomeCss.para}>
            Florida, Arizona, Hawaii, South Carolina - All renowned for their
            beautiful surroundings, outdoor lifestyles, & of course for having
            some of the world's best golf courses. Golfhōm has a growing
            selection of golf course-vicinity vacation rentals that deliver the
            comforts and conveniences of home, luxe amenities, and access to
            plenty of local attractions.
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
              <span
                onClick={(e) => {
                  Router.push({
                    pathname: `search/view_all_property`,
                    query: {
                      latitude: 27.994402,
                      longitude: -81.760254,
                    },
                  });
                }}
              >
                <div className={HomeCss.viewallBtnParent}>
                  <Button className={HomeCss.viewallBtn}>View All</Button>
                </div>
              </span>
            </Col>
          </Row>
        </div>

        <Slider slides={slides} />
      </Container>

      {/* SEARCH BY GOLF COURSE  */}
      <SearchByGolfCourse />
      {/* SEARCH BY GOLF COURSE  */}

      {/* --------------------------------------    RESERVE A FEATURED   -----------------------------   */}

      {/*//!ORIGINAL  DATA */}
      {/* <div div className={HomeCss.cardBg}>
        <Container>
          <h3 className={HomeCss.cardHeading}>Reserve a Featured Golfhōm</h3>
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
      </div> */}

      {/*//! TEMPRORY NEXT PAX DATA  FOR DEMO */}
      <div div className={HomeCss.cardBg}>
        <Container>
          <h3 className={HomeCss.cardHeading}>Reserve a Featured Golfhōm</h3>
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
                      src={
                        data.imageUrl
                          ? data.imageUrl
                          : "/images/noImageFound.png"
                      }
                      alt="Bed Image"
                    />
                    <Card.Body>
                      <Card.Title className={HomeCss.cardImgTitle}>
                        {`${data.name} (${data.externalPropertyType})`}
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
        <h3 className={HomeCss.adsTitle}>
          Golfing and Traveling, Both Better with Friends
        </h3>

        <Advertise ads={ads} />
      </Container>

      {/* ------------------------------           TRAINING VIDEOS          ---------------------------   */}

      <Container className={HomeCss.videoContain}>
        <h3 className={HomeCss.golf_training_heading}>Jake Hutt Golf Raps</h3>
        <div className={HomeCss.paraBtn}>
          <p className={HomeCss.paratext}>
            Explore the infinite whys and hows of the golf swing with our
            partner, Jake Hutt - PGA Instructor. Follow our good friend Jake at
            @
            <Link
              href="https://www.instagram.com/jakehuttgolf"
              target="_blank"
              className={HomeCss.account_link}
            >
              jakehuttgolf
            </Link>
          </p>
        </div>

        <Video videos={video} />
      </Container>

      {/* ------------------------------          STAFF N WRITERS          ----------------------------- */}

      <Container className={HomeCss.staffCard}>
        <Row>
          <Col md={8} className={HomeCss.staffCard_title_main_container}>
            <h3 className={HomeCss.staffCard_title}>
              From the Golfhōm Staff and Guest Writers
            </h3>
          </Col>

          <Col md={4} className={HomeCss.viewallBtnParent}>
            <Link href="/blog" className={HomeCss.viewallBtn_link}>
              <Button className={HomeCss.viewallBtn}>View All</Button>
            </Link>
          </Col>
        </Row>
        <Review reviews={review} />
      </Container>

      <BottomSection />
    </>
  );
};

export default Home;
