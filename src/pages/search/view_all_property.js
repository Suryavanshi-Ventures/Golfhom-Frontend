/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Button } from "react-bootstrap";
import ViewAllPropertyCss from "../../styles/ViewAllProperty.module.css";
import Image from "next/image";
import ViewAllProps from "../../../public/images/viewAllProps.png";
import { Pagination } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import PropNotFoundImg from "../../../public/images/vector/golf-hole.png";
import Loader from "../../../common components/loader";
import Carousel from "react-bootstrap/Carousel";
import Dot from "../../../public/images/vector/dot.svg";
import dynamic from "next/dynamic";
import React from "react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const ViewAllProperty = () => {
  const RouterRef = useRouter();
  const [AllPropertyDataFlorida, setAllPropertyDataFlorida] = useState([{}]);
  const [AllPropertyDataArizona, setAllPropertyDataArizona] = useState([{}]);
  const [AllPropertyDataHawaii, setAllPropertyDataHawaii] = useState([{}]);
  const [AllPropertyDataSouthCarolina, setAllPropertyDataSouthCarolina] =
    useState([{}]);
  const [IsLoaderVisible, setIsLoaderVisible] = useState(true);

  const FloridaLat = 27.994402;
  const FloridaLong = -81.760254;
  const ArizonaLat = 34.048927;
  const ArizonaLong = -111.093735;
  const HawaiiLat = 19.741755;
  const HawaiiLong = -155.844437;
  const SouthCarolinaLat = 33.836082;
  const SouthCarolinaLong = -81.163727;

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const ParamLatitude = urlParams.get("latitude");
    // const ParamLongitude = urlParams.get("longitude");

    // console.log(ParamLongitude);
    const GetPropDataFloridaFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=12&latitude=${FloridaLat}&longitude=${FloridaLong}&page=1&sort=createdAt`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyDataFlorida(GetPropertyDataRes.data.data);
          setIsLoaderVisible(false);
          console.log(GetPropertyDataRes.data.data);
        }
      } catch (error) {
        console.log("ERROR getting property data", error);
      }
    };
    GetPropDataFloridaFunc();

    const GetPropDataArizonaFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=12&latitude=${ArizonaLat}&longitude=${ArizonaLong}&page=1&sort=createdAt`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyDataArizona(GetPropertyDataRes.data.data);
          console.log(GetPropertyDataRes.data.data);
        }
      } catch (error) {
        console.log("ERROR getting property data", error);
      }
    };
    GetPropDataArizonaFunc();

    const GetPropDataHawaiiFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=12&latitude=${HawaiiLat}&longitude=${HawaiiLong}&page=1&sort=createdAt`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyDataHawaii(GetPropertyDataRes.data.data);
          console.log(GetPropertyDataRes.data.data);
        }
      } catch (error) {
        console.log("ERROR getting property data", error);
      }
    };
    GetPropDataHawaiiFunc();

    const GetPropDataSouthCarolinaLatFunc = async () => {
      try {
        const GetPropertyDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=12&latitude=${SouthCarolinaLat}&longitude=${SouthCarolinaLong}&page=1&sort=createdAt`
        );
        if (GetPropertyDataRes.status === 200) {
          setAllPropertyDataSouthCarolina(GetPropertyDataRes.data.data);
          console.log(GetPropertyDataRes.data.data);
        }
      } catch (error) {
        console.log("ERROR getting property data", error);
      }
    };
    GetPropDataSouthCarolinaLatFunc();

    return () => {
      GetPropDataFloridaFunc();
      GetPropDataArizonaFunc();
      GetPropDataHawaiiFunc();
      GetPropDataSouthCarolinaLatFunc();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Golfhom | View All Property</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TOP IMAGE OF VIEW ALL PROPERTY PAGE */}
      <div className={ViewAllPropertyCss.headImage}>
        <Image
          src={ViewAllProps}
          alt="View All Property Image"
          fill
          className={ViewAllPropertyCss.imageChild}
        ></Image>
      </div>

      <div className={ViewAllPropertyCss.textContainer}>
        <Container>
          <h3 className={ViewAllPropertyCss.heading}>
            Find Great Vacation Rentals near Florida, Arizona, Hawaii & South
            Carolina
          </h3>
          <h3 className={ViewAllPropertyCss.golfCourse}> Golf Courses!</h3>
          <p className={ViewAllPropertyCss.para}>
            Florida, Arizona, Hawaii, South Carolina - All renowned for their
            beautiful surroundings, outdoor lifestyles, & of course for having
            some of the world's best golf courses. Golfhōm has a growing
            selection of golf course-vicinity vacation rentals that deliver the
            comforts and conveniences of home, luxe amenities, and access to
            plenty of local attractions. Golfhōm is transforming how golfers
            locate and book their next luxury golf vacation rental. Book with us
            today!
          </p>
          <p className={ViewAllPropertyCss.para}>
            Golfhōm is transforming how golfers locate and book their next
            luxury golf vacation rental. Book with us today!
          </p>
        </Container>
      </div>

      <div className={ViewAllPropertyCss.view_prop_cards_Container}>
        <Container>
          <Row className={ViewAllPropertyCss.columnParent}>
            {/* FLORDIA */}
            <h3 className={ViewAllPropertyCss.heading}>Florida</h3>
            {IsLoaderVisible ? (
              <>
                <div className={ViewAllPropertyCss.loader_main_div}>
                  <Loader />
                </div>
              </>
            ) : !IsLoaderVisible && AllPropertyDataFlorida.length === 0 ? (
              <div className={ViewAllPropertyCss.no_property_main_div}>
                <Image
                  width={70}
                  height={70}
                  src={PropNotFoundImg}
                  alt="property not found"
                  className={ViewAllPropertyCss.no_property_image}
                ></Image>
                <p className={ViewAllPropertyCss.no_property_text}>
                  No Property Found!
                </p>
              </div>
            ) : (
              <>
                {" "}
                {/* SILDER CARDS START */}
                {AllPropertyDataFlorida.map((Data, Index) => {
                  return (
                    <>
                      <Col
                        md={4}
                        key={Data.id}
                        className={ViewAllPropertyCss.carouselBlock}
                      >
                        <Image
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          src={
                            Data.imageUrl
                              ? Data.imageUrl
                              : "/images/noImageFound.png"
                          }
                          alt={`image`}
                          fill
                          className={ViewAllPropertyCss.carouselImage}
                        ></Image>

                        <div
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          className={ViewAllPropertyCss.image_container}
                        >
                          <p
                            className={
                              ViewAllPropertyCss.price_of_property_text_from
                            }
                          >
                            From $
                            <span
                              className={
                                ViewAllPropertyCss.price_of_property_text
                              }
                            >
                              {Data.price >= 0.5
                                ? Math.ceil(Data.price)
                                : Math.floor(Data.price)
                                ? Data.price >= 0.5
                                  ? Math.ceil(Data.price)
                                  : Math.floor(Data.price)
                                : 0}
                              /Night
                            </span>
                          </p>

                          <h4
                            onClick={(e) => {
                              RouterRef.push(
                                `/search/${encodeURIComponent(Data.name)}/${
                                  Data.id
                                }`
                              );
                            }}
                            className={ViewAllPropertyCss.carouselHeading}
                          >
                            {Data.name ? Data.name : "N/A"}
                          </h4>
                        </div>
                        <p className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.golfCourseName ? Data.golfCourseName : "N/A"}
                        </p>

                        <div
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          className={ViewAllPropertyCss.image_container}
                        >
                          <span className={ViewAllPropertyCss.discribeOfCard}>
                            {Data.bedrooms ? Data.bedrooms : 1} Bed Rooms
                          </span>
                          <Image
                            src={Dot}
                            alt="Dot"
                            className={ViewAllPropertyCss.dot}
                          ></Image>
                          <span className={ViewAllPropertyCss.discribeOfCard}>
                            {Data.accomodation ? Data.accomodation : 1} Guests
                            Villa
                          </span>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </>
            )}

            {/* Arizona */}
            <h3 className={ViewAllPropertyCss.heading}>Arizona</h3>
            {IsLoaderVisible ? (
              <>
                <div className={ViewAllPropertyCss.loader_main_div}>
                  <Loader />
                </div>
              </>
            ) : !IsLoaderVisible && AllPropertyDataArizona.length === 0 ? (
              <div className={ViewAllPropertyCss.no_property_main_div}>
                <Image
                  width={70}
                  height={70}
                  src={PropNotFoundImg}
                  alt="property not found"
                  className={ViewAllPropertyCss.no_property_image}
                ></Image>
                <p className={ViewAllPropertyCss.no_property_text}>
                  No Property Found!
                </p>
              </div>
            ) : (
              <>
                {" "}
                {AllPropertyDataArizona.map((Data, Index) => {
                  return (
                    <Col
                      md={4}
                      key={Data.id}
                      className={ViewAllPropertyCss.carouselBlock}
                    >
                      <Image
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        src={Data.imageUrl}
                        alt={`image`}
                        fill
                        className={ViewAllPropertyCss.carouselImage}
                      ></Image>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <p
                          className={
                            ViewAllPropertyCss.price_of_property_text_from
                          }
                        >
                          From $
                          <span
                            className={
                              ViewAllPropertyCss.price_of_property_text
                            }
                          >
                            {Data.price >= 0.5
                              ? Math.ceil(Data.price)
                              : Math.floor(Data.price)}
                            /Night
                          </span>
                        </p>

                        <h4
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          className={ViewAllPropertyCss.carouselHeading}
                        >
                          {Data.name}
                        </h4>
                      </div>
                      <p className={ViewAllPropertyCss.discribeOfCard}>
                        {Data.golfCourseName}
                      </p>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.bedrooms ? Data.bedrooms : 1} Bed Rooms
                        </span>
                        <Image
                          src={Dot}
                          alt="Dot"
                          className={ViewAllPropertyCss.dot}
                        ></Image>
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.accomodation} Guests Villa
                        </span>
                      </div>
                    </Col>
                  );
                })}{" "}
              </>
            )}

            {/* Hawaii */}
            <h3 className={ViewAllPropertyCss.heading}>Hawaii</h3>
            {IsLoaderVisible ? (
              <>
                <div className={ViewAllPropertyCss.loader_main_div}>
                  <Loader />
                </div>
              </>
            ) : !IsLoaderVisible && AllPropertyDataHawaii.length === 0 ? (
              <div className={ViewAllPropertyCss.no_property_main_div}>
                <Image
                  width={70}
                  height={70}
                  src={PropNotFoundImg}
                  alt="property not found"
                  className={ViewAllPropertyCss.no_property_image}
                ></Image>
                <p className={ViewAllPropertyCss.no_property_text}>
                  No Property Found!
                </p>
              </div>
            ) : (
              <>
                {" "}
                {AllPropertyDataHawaii.map((Data, Index) => {
                  return (
                    <Col
                      md={4}
                      key={Data.id}
                      className={ViewAllPropertyCss.carouselBlock}
                    >
                      <Image
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        src={Data.imageUrl}
                        alt={`image`}
                        fill
                        className={ViewAllPropertyCss.carouselImage}
                      ></Image>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <p
                          className={
                            ViewAllPropertyCss.price_of_property_text_from
                          }
                        >
                          From $
                          <span
                            className={
                              ViewAllPropertyCss.price_of_property_text
                            }
                          >
                            {Data.price >= 0.5
                              ? Math.ceil(Data.price)
                              : Math.floor(Data.price)}
                            /Night
                          </span>
                        </p>

                        <h4
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          className={ViewAllPropertyCss.carouselHeading}
                        >
                          {Data.name}
                        </h4>
                      </div>
                      <p className={ViewAllPropertyCss.discribeOfCard}>
                        {Data.golfCourseName}
                      </p>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.bedrooms ? Data.bedrooms : 1} Bed Rooms
                        </span>
                        <Image
                          src={Dot}
                          alt="Dot"
                          className={ViewAllPropertyCss.dot}
                        ></Image>
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.accomodation} Guests Villa
                        </span>
                      </div>
                    </Col>
                  );
                })}
              </>
            )}

            {/* South Carolina */}
            <h3 className={ViewAllPropertyCss.heading}>South Carolina</h3>
            {IsLoaderVisible ? (
              <>
                <div className={ViewAllPropertyCss.loader_main_div}>
                  <Loader />
                </div>
              </>
            ) : !IsLoaderVisible &&
              AllPropertyDataSouthCarolina.length === 0 ? (
              <div className={ViewAllPropertyCss.no_property_main_div}>
                <Image
                  width={70}
                  height={70}
                  src={PropNotFoundImg}
                  alt="property not found"
                  className={ViewAllPropertyCss.no_property_image}
                ></Image>
                <p className={ViewAllPropertyCss.no_property_text}>
                  No Property Found!
                </p>
              </div>
            ) : (
              <>
                {" "}
                {AllPropertyDataSouthCarolina.map((Data, Index) => {
                  return (
                    <Col
                      md={4}
                      key={Data.id}
                      className={ViewAllPropertyCss.carouselBlock}
                    >
                      <Image
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        src={Data.imageUrl}
                        alt={`image`}
                        fill
                        className={ViewAllPropertyCss.carouselImage}
                      ></Image>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <p
                          className={
                            ViewAllPropertyCss.price_of_property_text_from
                          }
                        >
                          From $
                          <span
                            className={
                              ViewAllPropertyCss.price_of_property_text
                            }
                          >
                            {Data.price >= 0.5
                              ? Math.ceil(Data.price)
                              : Math.floor(Data.price)}
                            /Night
                          </span>
                        </p>

                        <h4
                          onClick={(e) => {
                            RouterRef.push(
                              `/search/${encodeURIComponent(Data.name)}/${
                                Data.id
                              }`
                            );
                          }}
                          className={ViewAllPropertyCss.carouselHeading}
                        >
                          {Data.name}
                        </h4>
                      </div>
                      <p className={ViewAllPropertyCss.discribeOfCard}>
                        {Data.golfCourseName}
                      </p>

                      <div
                        onClick={(e) => {
                          RouterRef.push(
                            `/search/${encodeURIComponent(Data.name)}/${
                              Data.id
                            }`
                          );
                        }}
                        className={ViewAllPropertyCss.image_container}
                      >
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.bedrooms ? Data.bedrooms : 1} Bed Rooms
                        </span>
                        <Image
                          src={Dot}
                          alt="Dot"
                          className={ViewAllPropertyCss.dot}
                        ></Image>
                        <span className={ViewAllPropertyCss.discribeOfCard}>
                          {Data.accomodation} Guests Villa
                        </span>
                      </div>
                    </Col>
                  );
                })}{" "}
              </>
            )}
          </Row>
        </Container>
      </div>

      {/* <Container className={ViewAllPropertyCss.pagination_container}>
        <Pagination
          colorText="#FF0000"
          showQuickJumper={false}
          showSizeChanger={false}
          defaultCurrent={2}
          total={500}
          className={ViewAllPropertyCss.pagination}
        />
      </Container> */}

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default ViewAllProperty;
