/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import HomeCss from "../styles/Home.module.css";
import Slider from "../slider";
import slides from "./countries.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ads from "./ads.json";
import Advertise from "../advertise";
import Image from "next/image";
import { Input } from "antd";
import { Button } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const Home = () => {
  return (
    <>
      <Head>
        <title>Golfhom | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ------------ NAVBAR SECTION -----------    */}

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
                    <div className={HomeCss.inner_input}>
                      <RangePicker />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className={HomeCss.search_btn_col}>
                <div className={HomeCss.search_btn_container}>
                  <Button className={HomeCss.search_btn} type="primary">
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/*  ----------------- SWIPER CONTAINER  -----------------   */}
      <Container>
        <div className={HomeCss.golfCourses}>
          <h2>Find Great Vacation Rentals near Florida & Arizona </h2>
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
        </div>

        <Slider slides={slides} />
      </Container>

      {/* ------------------   SEARCH CONTAINER    ------------    */}

      <Container className={HomeCss.searchSection}>
        <Row className={HomeCss.content}>
          <h3 className={HomeCss.Title}>
            Search the World Over by Course
            <br />
            (38,000+ in our database) or Tournament
          </h3>

          <p className={HomeCss.searchPara}>
            *We're downloading more great Golfhōms each day from our valued
            channel partners!
          </p>

          <Row className={HomeCss.searchPart}>
            <Col sm={7}>
              <h5 className={HomeCss.searchGolf}>Search by golf course</h5>
              <p className={HomeCss.hint}>Choose from thousands world-wide</p>

              <Row className={HomeCss.boxes}>
                <Col className={HomeCss.searchbox}>
                  <input
                    className={HomeCss.textArea}
                    xs={6}
                    md={4}
                    type="text"
                    placeholder="Enter Location"
                  ></input>
                </Col>

                <Col className={HomeCss.searchbox}>
                  <input
                    className={HomeCss.textArea}
                    xs={6}
                    md={4}
                    type="text"
                    placeholder="Golf Course"
                  ></input>
                </Col>
              </Row>
              <br />

              <button className={HomeCss.btn}>Search</button>
            </Col>

            <Col className={HomeCss.tournamentDiv} sm={5}>
              <h5 className={HomeCss.searchTournaments}>
                Search By Tournaments
              </h5>
              <p className={HomeCss.hint}>
                Check out our growing list of tour-spot rentals
              </p>

              <input
                className={HomeCss.box}
                type="text"
                placeholder="Search by Touraments"
              ></input>
              <br />

              <button className={HomeCss.btn}>Search</button>
            </Col>
          </Row>
        </Row>
      </Container>

      {/* --------------------------------------     CARD SECTION   -----------------------------   */}
      <div className={HomeCss.cardBg}>
        <Container>
          <h2 className={HomeCss.cardHeading}>Reserve a Featured Golfhōm</h2>

          <Card style={{ width: "24rem" }} className={HomeCss.MainCard}>
            <Card.Img
              variant="top"
              className={HomeCss.cardImg}
              src="/images/bedRoom.png"
              alt="Bed Image"
            />
            <Card.Body>
              <Card.Title>
                Tampa Golf Villas 5 King or 12 Beds at Saddlebrook
              </Card.Title>

              <div>
                <p className={HomeCss.saddle}>
                  {" "}
                  Saddlebrook Resort - Saddlebrook & 1 more
                </p>

                <div className={HomeCss.icon}>
                  <div className="iconImg">
                    <Image
                      width={18}
                      height={18}
                      src="/images/vector/bed.svg"
                      alt="iconImage"
                    ></Image>
                    <span className=" mx-2 ">5 Bed Rooms</span>
                  </div>

                  <div className="iconImg">
                    <Image
                      width={18}
                      height={18}
                      className=" mx-1 "
                      src="/images/vector/bath-tub.svg"
                      alt="iconImage"
                    ></Image>
                    <span className=" mx-2 ">4 Baths</span>
                  </div>

                  <div className="iconImg">
                    <Image
                      width={18}
                      height={18}
                      className=" mx-1 "
                      src="/images/vector/guest.svg"
                      alt="iconImage"
                    ></Image>
                    <span className=" mx-2 ">5 Guests Villa</span>
                  </div>
                </div>

                <div className={HomeCss.parking}>
                  <Image
                    width={20}
                    height={20}
                    src="/images/vector/parking-area.svg"
                    alt="iconImage"
                  ></Image>
                  <span className=" mx-2 ">Parking Area</span>
                </div>

                <Image
                  width={20}
                  height={14}
                  className={HomeCss.rightArrow}
                  src="/images/vector/right_Arrow.svg"
                  alt="iconImage"
                ></Image>
              </div>
            </Card.Body>
          </Card>
        </Container>

        <div className={HomeCss.loadbtn}>
          <button className={HomeCss.exclusive_btn}>
            Load more
            <Image
              width={20}
              height={20}
              src="/images/vector/load.svg"
              alt="Load Image"
            ></Image>{" "}
          </button>
        </div>
      </div>

      {/* ------------------------------       VACATION-RENTAL   -------------------- */}

      <Row className={HomeCss.blurImg}>
        <Row>
          <Col md={6} sm={12} className={HomeCss.golfPit}>
            <div className={HomeCss.pitImg}>
              <Image
                width={300}
                height={300}
                src="/images/golfball.png"
                alt="Golf Ball"
              ></Image>
              <Image
                width={300}
                height={300}
                src="/images/pit.png"
                alt="Pit"
              ></Image>
            </div>
          </Col>

          <Col md={6} sm={12} className={HomeCss.golfText}>
            <div className={HomeCss.vacaDiv}>
              <h2 className={HomeCss.vacationTitle}>
                THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS
              </h2>
              <p className={HomeCss.vacationPara}>
                No more sorting through tangled rental-search results on common
                vacation rental sites. Golfhōm patrons can search a targeted
                list of course-vicinity homes, condos, and villas, all by
                course, tournament, or city. After checking out safely with
                Stripe, our golfers can ship their clubs via Ship Sticks, book
                their group’s tee time, buy partner golf swag, and take in great
                golf articles — all without leaving the platform. We’re
                transforming how golf travelers locate and book their next
                luxury rental.
              </p>
            </div>
          </Col>
        </Row>
      </Row>

      {/* ------------------------------        Golfing and Traveling     ------------------------  */}

      <Container className={HomeCss.ads}>
        <h2 className={HomeCss.adsTitle}>
          Golfing and Traveling, Both Better with Friends
        </h2>

        <Advertise ads={ads} />
      </Container>

      {/* ------------------------------         EXCLUSIVE PROPERTISE       --------------------------   */}

      <Container>
        <div className={HomeCss.exclusive}>
          <div className={HomeCss.exHeading}>
            <h2 className={HomeCss.extitle}>Choose from a wide range of</h2>
            <p className={HomeCss.ex_p}>exclusive Properties</p>
            <div className={HomeCss.exclusive_btn_container}>
              <button className={HomeCss.exclusive_btn}>Book Now</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
