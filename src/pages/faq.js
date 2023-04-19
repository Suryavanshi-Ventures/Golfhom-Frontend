/* eslint-disable react/no-unescaped-entities */
import { React, useState } from "react";
import Head from "next/head";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Image from "next/image";
import FAQCss from "../styles/FAQ.module.css";
import FAQBannerImg from "../../public/images/faq_banner_img.svg";
import BottomSection from "../../common components/bottomGroup";

function FAQ() {
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
        <title>Golfhom | FAQ'S</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* BANNER IMAGE FAQ */}
        <div className={FAQCss.banner_img_container}>
          <Image
            fill
            className={FAQCss.banner_img}
            src={FAQBannerImg}
            alt="faq golfhom banner image"
          ></Image>
        </div>
        <section className={FAQCss.below_banner_main_section}>
          <Container>
            <Row className={FAQCss.faqRow}>
              <Col md={6} className={FAQCss.textParentD}>
                <h2 className={FAQCss.textTitle}>Frequently Asked Questions</h2>
                <p className={FAQCss.paragraph}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book..
                </p>
              </Col>

              <Col md={6}>
                {/* BOOKING FAQ QUESTIONS */}

                <main className={FAQCss.heading_question_main_div}>
                  <div>
                    <h3 className={FAQCss.heading_question}>
                      Booking Questions
                    </h3>
                    <div className={FAQCss.headingSign}>
                      <h6 className={FAQCss.faqTitle}>
                        How can I list my property Golfhom ?
                      </h6>
                      <Button className={FAQCss.sign} onClick={toggleButtonA}>
                        {showA ? "-" : "+"}
                      </Button>
                    </div>
                    {showA && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          Create a Host account, and take just 5 minutes to
                          complete our simple listing loop. Make sure to post
                          great images of your home!
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <h6 className={FAQCss.faqTitle}>
                        How do I communicate with my guests?
                      </h6>
                      <Button className={FAQCss.sign} onClick={toggleButtonB}>
                        {showB ? "-" : "+"}
                      </Button>
                    </div>
                    {showB && (
                      <div>
                        <p>
                          Create a Host account, and take just 5 minutes to
                          complete our simple listing loop. Make sure to post
                          great images of your home!
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How do I price my property?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonC}>
                      {showC ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How does Golfhom.com pay me?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonD}>
                      {showD ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How can I upgrade my listing to featured ?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonE}>
                      {showE ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      What happens if a renter cancels a revervation?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonF}>
                      {showF ? "-" : "+"}
                    </Button>
                  </div>
                </main>

                {/* CANCELATION SECTION */}
                <main className={FAQCss.heading_question_main_div}>
                  <div>
                    <h3 className={FAQCss.heading_question}>
                      Cancellation Questions
                    </h3>
                    <div className={FAQCss.headingSign}>
                      <h6 className={FAQCss.faqTitle}>
                        How can I list my property Golfhom ?
                      </h6>
                      <Button className={FAQCss.sign} onClick={toggleButtonA}>
                        {showA ? "-" : "+"}
                      </Button>
                    </div>
                    {showA && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          Create a Host account, and take just 5 minutes to
                          complete our simple listing loop. Make sure to post
                          great images of your home!
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <h6 className={FAQCss.faqTitle}>
                        How do I communicate with my guests?
                      </h6>
                      <Button className={FAQCss.sign} onClick={toggleButtonB}>
                        {showB ? "-" : "+"}
                      </Button>
                    </div>
                    {showB && (
                      <div>
                        <p>
                          Create a Host account, and take just 5 minutes to
                          complete our simple listing loop. Make sure to post
                          great images of your home!
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How do I price my property?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonC}>
                      {showC ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How does Golfhom.com pay me?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonD}>
                      {showD ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      How can I upgrade my listing to featured ?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonE}>
                      {showE ? "-" : "+"}
                    </Button>
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div className={FAQCss.headingSign}>
                    <h6 className={FAQCss.faqTitle}>
                      What happens if a renter cancels a revervation?
                    </h6>
                    <Button className={FAQCss.sign} onClick={toggleButtonF}>
                      {showF ? "-" : "+"}
                    </Button>
                  </div>
                </main>
              </Col>
            </Row>
          </Container>
        </section>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </main>
    </>
  );
}

export default FAQ;
