/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import RegisterToHost from "../styles/RegisterToHost.module.css";
import targetBall from "../../public/images/targetBall.svg";
import Image from "next/image";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Checkbox, Input } from "antd";
import condoView from "../../public/images/condoView.svg";
import Lunch from "../../public/images/lunch.svg";
import earnMoney from "../../public/images/earnMoney.svg";
import Beach from "../../public/images/beach.svg";
import BottomSection from "../../common components/bottomGroup";
import Head from "next/head";

const Register_to_host = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showF, setShowF] = useState(false);

  const toggleButtonA = () => {
    setShowA(!showA);
  };

  const toggleButtonB = () => {
    setShowB(!showB);
  };

  const toggleButtonC = () => {
    setShowC(!showC);
  };

  const toggleButtonD = () => {
    setShowD(!showD);
  };

  const toggleButtonE = () => {
    setShowE(!showE);
  };

  const toggleButtonF = () => {
    setShowF(!showF);
  };

  return (
    <>
      <Head>
        <title>Golfhom | Register As Host</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        {/*----------------              TOP IMAGE SECTION         --------------------*/}

        <div className={RegisterToHost.targetBall}>
          <Image
            src={targetBall}
            alt="Target Ball"
            fill
            className={RegisterToHost.imgTargetBall}
          ></Image>
        </div>

        {/*--------------------------        REGISTER COLUMN CONTAINER       ----------------------- */}

        <div className={RegisterToHost.registerParent}>
          <Col md={6} className={RegisterToHost.columnA}>
            <h2 className={RegisterToHost.golfheading}>
              Become a Golfhōm Host!
            </h2>
            <p className={RegisterToHost.para}>
              Host golf travelers, monetize your property.
            </p>
          </Col>

          <Col md={4} className={RegisterToHost.columnB}>
            <div>
              <h5 className={RegisterToHost.registerTitle}>Register</h5>
              <div className={RegisterToHost.registerContent}>
                <Col className={RegisterToHost.inputParent}>
                  <div>
                    <Input
                      className={RegisterToHost.inputA}
                      type="text"
                      placeholder="Enter User name"
                    ></Input>
                  </div>

                  <div>
                    <Input
                      className={RegisterToHost.inputB}
                      type="email"
                      placeholder="Email"
                    ></Input>
                  </div>

                  <div>
                    <Input
                      className={RegisterToHost.inputC}
                      type="password"
                      placeholder="Password"
                    ></Input>
                  </div>

                  <div>
                    <Input
                      className={RegisterToHost.inputD}
                      type="password"
                      placeholder="Repeat Password"
                    ></Input>
                  </div>
                </Col>

                <Row>
                  <div>
                    <Checkbox className={RegisterToHost.agreeOptionA}>
                      I agree with your Terms & Conditions
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox className={RegisterToHost.agreeOptionB}>
                      I agree with your Privacy Policy
                    </Checkbox>
                  </div>
                </Row>

                <Button className={RegisterToHost.registerBtn}>Register</Button>
              </div>
            </div>
          </Col>
        </div>
      </section>

      {/* ---------------------------        THREE COLUMN CONTAINER            -------------------------- */}

      <Container>
        <Row>
          <Col md={4} className={RegisterToHost.textColumn}>
            <h3 className={RegisterToHost.threeColumnTitle}>
              Why Choose Golfhōm?
            </h3>
            <p className={RegisterToHost.threeColumnPara}>
              Golfers love their sport, and many love to travel as well. Those
              that love both are tired of stumbling around on other vacation
              rental platforms trying to place a rental near their favorite
              course or tournament. Golf-travelers are searching for the next
              rental on Golfhōm right now, will they find your home?
            </p>
          </Col>

          <Col md={4} className={RegisterToHost.textColumn}>
            <h3 className={RegisterToHost.threeColumnTitle}>
              Booking Made Easy.
            </h3>
            <p className={RegisterToHost.threeColumnPara}>
              Travelers can search for their next Golfhōm by any of the world's
              38,000+ golf courses, as well as by major tournament. Easy to
              locate, easy to book, golf-industry partner resources and
              discounts...
            </p>
          </Col>

          <Col md={4} className={RegisterToHost.textColumn}>
            <h3 className={RegisterToHost.threeColumnTitle}>
              Market to Your Key Clientele.
            </h3>
            <p className={RegisterToHost.threeColumnPara}>
              If you own a vacation rental property in the vicinity of a golf
              course, golf-travelers are a key market for you. Golfers are
              increasingly moving their search efforts over to Golfhōm, easier
              to search, more golf to enjoy.
            </p>
          </Col>
        </Row>
      </Container>

      {/* ---------------------------        TEXT IN SIDE OF IMAGE CONTAINER         ----------------------------- */}

      <Container className={RegisterToHost.textImageParent}>
        <h2 className={RegisterToHost.hostTitle}>How To Host</h2>

        <Row className={RegisterToHost.rowContentA}>
          <Col md={6} className={RegisterToHost.textParentA}>
            <h3 className={RegisterToHost.textTitle}>
              1. List Your Home or Condo
            </h3>
            <p className={RegisterToHost.paragraph}>
              Complete our simple listing loop, tell us which course(s) the home
              is within 2 miles of, and we’ll promote your property to
              golf-travelers the world over.
            </p>
          </Col>

          <Col md={6} className={RegisterToHost.imageParent}>
            <Image
              src={condoView}
              alt="condoView"
              fill
              className={RegisterToHost.condoImage}
            ></Image>
          </Col>
        </Row>

        <Row className={RegisterToHost.rowContentA}>
          <Col md={6} className={RegisterToHost.imageParent}>
            <Image
              src={Lunch}
              alt="condoView"
              fill
              className={RegisterToHost.lunchImage}
            ></Image>
          </Col>

          <Col md={6} className={RegisterToHost.textParentB}>
            <h3 className={RegisterToHost.textTitle}>
              {" "}
              2. Welcome Your Guests
            </h3>
            <p className={RegisterToHost.paragraph}>
              Once our golf travelers have located and booked your home, be sure
              to deliver a clean and reliable accommodation. For safety and
              reliability, make sure all communications and payments are made on
              our site.
            </p>
          </Col>
        </Row>

        <Row className={RegisterToHost.rowContentA}>
          <Col md={6} className={RegisterToHost.textParentC}>
            <h3 className={RegisterToHost.textTitle}>3. Earn Money</h3>
            <p className={RegisterToHost.paragraph}>
              Golfhōm pays out to hosts approximately 48 hours after the
              check-in date if no complaints have been registered. You set the
              price, we pay out promptly!
            </p>
          </Col>

          <Col md={6} className={RegisterToHost.imageParent}>
            <Image
              src={earnMoney}
              alt="condoView"
              fill
              className={RegisterToHost.earnMoney}
            ></Image>
          </Col>
        </Row>
      </Container>

      {/* ---------------------------      FREQUENTLY ASKED QUESTIONS      ------------------------------*/}

      <Container>
        <Row className={RegisterToHost.faqRow}>
          <Col md={6} className={RegisterToHost.textParentD}>
            <h2 className={RegisterToHost.textTitle}>
              Frequently Asked Questions
            </h2>
            <p className={RegisterToHost.paragraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book..
            </p>
          </Col>

          <Col md={6}>
            <div>
              <div className={RegisterToHost.headingSign}>
                <p className={RegisterToHost.faqTitle}>
                  How can I list my property Golfhom ?
                </p>
                <Button className={RegisterToHost.sign} onClick={toggleButtonA}>
                  {showA ? "-" : "+"}
                </Button>
              </div>

              {showA && (
                <div>
                  <p className={RegisterToHost.faqPara}>
                    Create a Host account, and take just 5 minutes to complete
                    our simple listing loop. Make sure to post great images of
                    your home!
                  </p>
                </div>
              )}
            </div>

            <hr className={RegisterToHost.horizontaLine} />

            <div>
              <div className={RegisterToHost.headingSign}>
                <p className={RegisterToHost.faqTitle}>
                  How do I communicate with my guests?
                </p>
                <Button className={RegisterToHost.sign} onClick={toggleButtonB}>
                  {showB ? "-" : "+"}
                </Button>
              </div>
              {showB && (
                <div>
                  <p>
                    Create a Host account, and take just 5 minutes to complete
                    our simple listing loop. Make sure to post great images of
                    your home!
                  </p>
                </div>
              )}
            </div>

            <hr className={RegisterToHost.horizontaLine} />

            <div className={RegisterToHost.headingSign}>
              <p className={RegisterToHost.faqTitle}>
                How do I price my property?
              </p>
              <Button className={RegisterToHost.sign} onClick={toggleButtonC}>
                {showC ? "-" : "+"}
              </Button>
            </div>

            <hr className={RegisterToHost.horizontaLine} />

            <div className={RegisterToHost.headingSign}>
              <p className={RegisterToHost.faqTitle}>
                How does Golfhom.com pay me?
              </p>
              <Button className={RegisterToHost.sign} onClick={toggleButtonD}>
                {showD ? "-" : "+"}
              </Button>
            </div>

            <hr className={RegisterToHost.horizontaLine} />

            <div className={RegisterToHost.headingSign}>
              <p className={RegisterToHost.faqTitle}>
                How can I upgrade my listing to featured ?
              </p>
              <Button className={RegisterToHost.sign} onClick={toggleButtonE}>
                {showE ? "-" : "+"}
              </Button>
            </div>

            <hr className={RegisterToHost.horizontaLine} />

            <div className={RegisterToHost.headingSign}>
              <p className={RegisterToHost.faqTitle}>
                What happens if a renter cancels a reservation?
              </p>
              <Button className={RegisterToHost.sign} onClick={toggleButtonF}>
                {showF ? "-" : "+"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/*---------------------------      GO LIVE ON GOLFHOM NOW CONTAINER       ------------------------------ */}
      <Container>
        <Row className={RegisterToHost.goliveRow}>
          <Col md={6} className={RegisterToHost.textParentE}>
            <h2 className={RegisterToHost.listHomeTitle}>
              List Your Home or Condo Today! Go Live on Golfhōm Now
            </h2>
            <Button className={RegisterToHost.goliveBtn}>
              Go Live on Golfhom now
            </Button>
          </Col>
          <Col md={6} className={RegisterToHost.imageParent}>
            <Image
              src={Beach}
              alt="Beach"
              fill
              className={RegisterToHost.beach}
            ></Image>
          </Col>
        </Row>
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Register_to_host;
