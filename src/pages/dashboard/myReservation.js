import React from 'react'
import MyReservationCss from "../../styles/dashboard/MyReservation.module.css"
import BottomSection from "../../../common components/bottomGroup";
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import Image from 'next/image';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const MyReservation = () => {
    return (
        <>
            {/*   -------------------------     BANNER IMAGE   -------------------------------   */}
            <div className={MyReservationCss.banner_img_container}>
                <Image
                    fill
                    className={MyReservationCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*     -------------------------     TEXT AREA      ----------------------------    */}

            <Container className={MyReservationCss.parent}>
                <Col md={8} className={MyReservationCss.columnA}>
                    <h2 className={MyReservationCss.reservation}>My Reservations</h2>

                    <h3 className={MyReservationCss.manage}>Reservation #66303</h3>

                    <hr className={MyReservationCss.horizontal} />

                    <Row className={MyReservationCss.title}>

                        <Col md={3}><h4>Date:</h4></Col>
                        <Col md={6} className={MyReservationCss.formName}>
                            <h4>From: <span className={MyReservationCss.name}> AkashSuryavanshi</span>
                            </h4>
                        </Col>

                    </Row>

                    <Row className={MyReservationCss.data}>
                        <Col md={3}>
                            <p>April 18, 2023</p>
                            <p>9:32 am</p>
                        </Col>
                        <Col md={3}>
                            <p>Cedar Lodge</p>
                        </Col>
                    </Row>

                    <hr className={MyReservationCss.horizontal} />

                    <Row>
                        <Col md={3} className={MyReservationCss.title}>
                            <h4>Stay Details</h4>
                        </Col>
                        <Col md={3} className={MyReservationCss.data}>
                            <p>Check In: 04-29-2023</p>
                            <p>Check Out: 05-06-2023</p>
                        </Col>
                        <Col md={3} className={MyReservationCss.data}>
                            <p>Night:3</p>
                            <p>Guest:5</p>
                        </Col>
                    </Row>

                    <hr className={MyReservationCss.horizontal} />

                    <Row>
                        <Col md={3} className={MyReservationCss.title}>
                            <h4>Payment</h4>
                        </Col>
                        <Col md={6} className={MyReservationCss.data}>
                            <p>3 Nights</p>
                            <hr />
                            <p>Payment due</p>
                        </Col>
                        <Col md={3} className={MyReservationCss.data}>
                            <p>$2,550.00</p>
                            <hr />
                            <p>$2,550.00</p>
                        </Col>
                    </Row>
                </Col>

                <Col md={4} className={MyReservationCss.columnB}>
                    <div className={MyReservationCss.payBtn}>
                        <h4 className={MyReservationCss.payment}>Payment</h4>
                        <Button className={MyReservationCss.subtn}>Submitted</Button>
                    </div>

                    <hr className={MyReservationCss.line} />

                    <Row className={MyReservationCss.pricing}>
                        <Col md={8}>
                            <h4 className={MyReservationCss.total}>Total</h4>
                            <p className={MyReservationCss.tax}>Includes taxes and fees</p>
                        </Col>

                        <Col md={4}>
                            <p className={MyReservationCss.dollar}>$2,550.00</p>
                            <p className={MyReservationCss.view}>View details</p>
                        </Col>
                    </Row>

                    <hr className={MyReservationCss.line} />

                    <div className={MyReservationCss.btnParent}>
                        <Button className={MyReservationCss.cancel}>Cancel</Button>
                    </div>
                </Col>
            </Container>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default MyReservation
