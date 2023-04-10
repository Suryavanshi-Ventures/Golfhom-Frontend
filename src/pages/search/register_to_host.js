import React from 'react'
import RegisterToHost from "../../styles/RegisterToHost.module.css";
import targetBall from "../../../public/images/targetBall.png"
import Image from 'next/image';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Checkbox } from 'antd';
import condoView from "../../../public/images/condoView.svg"
import Lunch from "../../../public/images/lunch.svg"
import earnMoney from "../../../public/images/earnMoney.svg"
import Beach from "../../../public/images/beach.svg"
import Grouptalk from "../../../public/images/grouptalk.png";

const Register_to_host = () => {
    return (
        <>
            <section>

                {/* TOP IMAGE SECTION */}

                <div className={RegisterToHost.targetBall}>
                    <Image
                        src={targetBall}
                        alt="Target Ball"
                        fill
                        className={RegisterToHost.imgTargetBall}
                    ></Image>
                </div>

                {/* REGISTER COLUMN CONTAINER */}
                <div className={RegisterToHost.registerParent}>
                    <Col md={6} className={RegisterToHost.columnA}>
                        <h2 className={RegisterToHost.golfheading}>Become a Golfhōm Host!</h2>
                        <p className={RegisterToHost.para}>Host golf travelers, monetize your property.</p>
                    </Col>

                    <Col md={4} className={RegisterToHost.columnB}>
                        <div>
                            <h5 className={RegisterToHost.registerTitle}>Register</h5>
                            <div className={RegisterToHost.registerContent}>
                                <Col className={RegisterToHost.inputParent}>
                                    <Row><input className={RegisterToHost.inputA} type="text" placeholder="Enter User name"></input></Row>
                                    <hr />
                                    <Row><input className={RegisterToHost.inputB} type="email" placeholder="Email"></input></Row>
                                    <hr />
                                    <Row><input className={RegisterToHost.inputC} type="password" placeholder="Password"></input></Row>
                                    <hr />
                                    <Row><input className={RegisterToHost.inputD} type="password" placeholder="Repeat Password"></input></Row>
                                </Col>

                                <Row>
                                    <div><Checkbox className={RegisterToHost.agreeOptionA}>I agree with your Terms & Conditions</Checkbox></div>
                                    <div><Checkbox className={RegisterToHost.agreeOptionB}>I agree with your Privacy Policy</Checkbox></div>
                                </Row>

                                <Button className={RegisterToHost.registerBtn}>Register</Button>
                            </div>
                        </div>
                    </Col>
                </div>
            </section>

            {/* THREE COLUMN CONTAINER */}
            <Container>
                <Row>
                    <Col md={4} className={RegisterToHost.textColumn}>
                        <h3>Why Choose Golfhōm?</h3>
                        <p>Golfers love their sport, and many love to travel as well. Those that love both are tired of stumbling around on other vacation rental platforms trying to place a rental near their favorite course or tournament. Golf-travelers are searching for the next rental on Golfhōm right now, will they find your home?</p>
                    </Col>

                    <Col md={4} className={RegisterToHost.textColumn}>
                        <h3>Booking Made Easy.</h3>
                        <p>Travelers can search for their next Golfhōm by any of the world's 38,000+ golf courses, as well as by major tournament. Easy to locate, easy to book, golf-industry partner resources and discounts...</p>
                    </Col>

                    <Col md={4} className={RegisterToHost.textColumn}>
                        <h3>Market to Your Key Clientele.</h3>
                        <p>If you own a vacation rental property in the vicinity of a golf course, golf-travelers are a key market for you. Golfers are increasingly moving their search efforts over to Golfhōm, easier to search, more golf to enjoy.</p>
                    </Col>
                </Row>
            </Container>


            {/* TEXT SIDE IMAGE CONTAINER */}
            <Container className={RegisterToHost.textImageParent}>
                <h2 className={RegisterToHost.hostTitle}>How To Host</h2>

                <Row className={RegisterToHost.rowContentA}>
                    <Col>
                        <h3>1. List Your Home or Condo</h3>
                        <p>Complete our simple listing loop, tell us which course(s) the home is within 2 miles of, and we’ll promote your property to golf-travelers the world over.</p>
                    </Col>

                    <Col className={RegisterToHost.condoImageParent}>
                        <Image
                            src={condoView}
                            alt='condoView'
                            className={RegisterToHost.condoImage}
                        >
                        </Image>
                    </Col>
                </Row>

                <Row className={RegisterToHost.rowContentA}>
                    <Col className={RegisterToHost.lunchParent}>
                        <Image
                            src={Lunch}
                            alt='condoView'
                            className={RegisterToHost.lunchImage}
                        >
                        </Image>
                    </Col>

                    <Col>
                        <h3>2. Welcome Your Guests</h3>
                        <p>Once our golf travelers have located and booked your home, be sure to deliver a clean and reliable accommodation. For safety and reliability, make sure all communications and payments are made on our site.</p>
                    </Col>
                </Row>

                <Row className={RegisterToHost.rowContentA}>
                    <Col>
                        <h3>3. Earn Money</h3>
                        <p>Golfhōm pays out to hosts approximately 48 hours after the check-in date if no complaints have been registered. You set the price, we pay out promptly!</p>
                    </Col>

                    <Col className={RegisterToHost.earnMoneyParent}>
                        <Image
                            src={earnMoney}
                            alt='condoView'
                            className={RegisterToHost.earnMoney}
                        >
                        </Image>
                    </Col>
                </Row>
            </Container>

            {/* Frequently Asked Questions */}
            <Container>
                <Row>
                    <Col>
                        <h2>Frequently Asked Questions</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..</p>
                    </Col>

                    <Col>

                    </Col>
                </Row>
            </Container>


            {/* Go Live on Golfhom now CONTAINER */}
            <Container>
                <Row>
                    <Col>
                        <h2>List Your Home or Condo Today! Go Live on Golfhōm Now</h2>
                        <Button>Go Live on Golfhom now</Button>
                    </Col>
                    <Col>
                        <Image src={Beach} alt='Beach'></Image>
                    </Col>
                </Row>
            </Container>

            {/* BOTTOM IMAGE SECTION */}

            <section className={RegisterToHost.grouptalk}>
                <div>
                    <div className={RegisterToHost.groupParent}>
                        <Image
                            alt="group talk"
                            className={RegisterToHost.grouptalk}
                            src={Grouptalk}
                            fill
                        ></Image>
                    </div>

                    <Col md={4} className={RegisterToHost.newBtn}>
                        <h4 className={RegisterToHost.grouptalkTitle}>THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS</h4>
                        <Button className={RegisterToHost.search}>Search</Button>
                    </Col>
                </div>
            </section>
        </>
    )
}

export default Register_to_host
