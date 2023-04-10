import React from 'react'
import RegisterToHost from "../../styles/RegisterToHost.module.css";
import targetBall from "../../../public/images/targetBall.png"
import Image from 'next/image';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Checkbox } from 'antd';


const Register_to_host = () => {
    return (
        <>
            <section>
                <div className={RegisterToHost.targetBall}>
                    <Image
                        src={targetBall}
                        alt="Target Ball"
                        fill
                        className={RegisterToHost.imgTargetBall}
                    ></Image>
                </div>

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
        </>
    )
}

export default Register_to_host
