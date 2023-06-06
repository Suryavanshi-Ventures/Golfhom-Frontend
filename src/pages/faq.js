/* eslint-disable react/no-unescaped-entities */
import { React, useState } from "react";
import Head from "next/head";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import Image from "next/image";
import FAQCss from "../styles/FAQ.module.css";
import FAQBannerImg from "../../public/images/faq_banner_img.png";
import BottomSection from "../../common components/bottomGroup";

const FAQ = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showG, setShowG] = useState(false);
  const [showH, setShowH] = useState(false);
  const [showI, setShowI] = useState(false);
  const [showJ, setShowJ] = useState(false);


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

  const toggleButtonG = () => {
    setShowG(!showG);
  };

  const toggleButtonH = () => {
    setShowH(!showH);
  };

  const toggleButtonI = () => {
    setShowI(!showI);
  };

  const toggleButtonJ = () => {
    setShowJ(!showJ);
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
                      <p className={FAQCss.faqTitle}>
                        How do I get more info about the property's amenities?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonA}>
                        {showA ? "-" : "+"}
                      </Button>
                    </div>
                    {showA && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          You can find information on a property’s amenities on the home’s profile page.  Reach out to the host for more specific information.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I can't find my rental confirmation email. What Should I do?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonB}>
                        {showB ? "-" : "+"}
                      </Button>
                    </div>
                    {showB && (
                      <div>
                        <p>
                          Please be sure to check your email inbox, junk, and spam folders. If you still can’t find your confirmation, refer to your Golfhōm admin area, or feel free to reach out to our help team.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I'll be arriving outside check-in hours. Can I still check in?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonC}>
                        {showC ? "-" : "+"}
                      </Button>
                    </div>
                    {showC && (
                      <div>
                        <p>
                          This depends on the individual host, who will do their best to meet your needs.  We recommend dealing with arrival time issues as early in the process as possible.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        I'd like to check out after the stated check-out time, is that possible?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonD}>
                        {showD ? "-" : "+"}
                      </Button>
                    </div>
                    {showD && (
                      <div>
                        <p>
                          A late check-out can only be arranged with the host, and is not guaranteed.  Reach out to see what can be arranged, and keep in mind that availability and proper cleaning time have to be accounted for.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How Do I find out if my desired property allows pets?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonE}>
                        {showE ? "-" : "+"}
                      </Button>
                    </div>
                    {showE && (
                      <div>
                        <p>
                          Pet policies should be clearly stated on the home’s profile page.  Reach out to the Host for any needed clarification, or to see if a variance can be made.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        What payment methods are accepted by Golfhōm?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonF}>
                        {showF ? "-" : "+"}
                      </Button>
                    </div>
                    {showF && (
                      <div>
                        <p>
                          Major credit cards and Paypal are acceptable payment methods for properties listed on Golfhōm.com.  You will have your choice of payment methods at the tome of booking.
                        </p>
                      </div>
                    )}
                  </div>
                </main>

                {/* CANCELATION SECTION */}
                <main className={FAQCss.heading_question_main_div}>
                  <div>
                    <h3 className={FAQCss.heading_question}>
                      Cancellation Questions
                    </h3>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        Can I cancel a current reservation?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonG}>
                        {showG ? "-" : "+"}
                      </Button>
                    </div>
                    {showG && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          Yes, cancellations happen.   Any cancellation fees are determined by the property’s stated cancellation policy, which you can find on the home’s profile page and in your reservation.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        How do I know if my reservation was properly canceled?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonH}>
                        {showH ? "-" : "+"}
                      </Button>
                    </div>
                    {showH && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          After you cancel a booking, you should get an email confirming said cancellation.  Make sure to check your inbox and spam/junk mail folders.  If you don’t receive an email within 24 hours, feel free to reach out to our help team.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        Where can I find my chosen property's cancellation policy?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonI}>
                        {showI ? "-" : "+"}
                      </Button>
                    </div>
                    {showI && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          This information is available in your booking confirmation, as well as on the property’s Golfhōm profile page.
                        </p>
                      </div>
                    )}
                  </div>

                  <hr className={FAQCss.horizontaLine} />

                  <div>
                    <div className={FAQCss.headingSign}>
                      <p className={FAQCss.faqTitle}>
                        What is the current policy for cancellations relative to coronavirus?
                      </p>
                      <Button className={FAQCss.sign} onClick={toggleButtonJ}>
                        {showJ ? "-" : "+"}
                      </Button>
                    </div>
                    {showJ && (
                      <div>
                        <p className={FAQCss.faqPara}>
                          The up-to-date cancellation policy was viewable on the property’s profile page when you made the booking on our platform, and can also be viewed in your reservation.  Please reach out to the host to see if arrangements can be made under special circumstances.
                        </p>
                      </div>
                    )}
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
};

export default FAQ;
