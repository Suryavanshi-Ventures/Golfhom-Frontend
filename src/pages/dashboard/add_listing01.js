import React, { useState } from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import AddListing01Css from "../../styles/dashboard/AddListing01.module.css";
import ProtectedRoute from "../../../common components/protected_route";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Input } from "antd";
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';

const Addlisting01 = () => {
    const [val, setVal] = useState(' ');
    const data = ["One", "Two", "Three"]

    return (
        <>
            <ProtectedRoute>
                <Head>
                    <title>Golfhom | Add Listing-01</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
                <div className={AddListing01Css.banner_img_container}>
                    <Image
                        fill
                        className={AddListing01Css.banner_img}
                        src={FAQBannerImg}
                        alt="faq golfhom banner image"
                    ></Image>
                </div>

                {/*     -------------------------     TEXT AREA      ----------------------------    */}

                <Container>
                    <Col md={9}>
                        <h2 className={AddListing01Css.addListing}>Add Listing</h2>

                        <h3 className={AddListing01Css.info}>Pricing</h3>

                        <hr />
                    </Col>

                    <Row>
                        <Col md={7}>
                            <h4 className={AddListing01Css.title}>Nightly*</h4>

                            <Input
                                type="text"
                                placeholder="Enter price for 1 night"
                                className={AddListing01Css.listing}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className={AddListing01Css.colParent}>
                            <h4 className={AddListing01Css.title}>Nightly*</h4>

                            <Input
                                type="text"
                                placeholder="Enter price for 1 night"
                                className={AddListing01Css.listing}
                            />
                        </Col>
                    </Row>
                    <hr />

                    <Row>
                        <Col md={12} className={AddListing01Css.colParent}>
                            <h4 className={AddListing01Css.title}>Long-term pricing</h4>
                            <h5 className={AddListing01Css.weekly}>Weekly - 7+ nights</h5>

                            <Input
                                type="text"
                                placeholder="Enter the Unit price for a single day"
                                className={AddListing01Css.listing}
                            />
                        </Col>
                    </Row>
                    <hr />

                    <Row>
                        <h3 className={AddListing01Css.info}>Setup Extra Services Price</h3>

                        <Row className={AddListing01Css.twoinputDropdown}>
                            <Col md={4}>
                                <h5 className={AddListing01Css.name}>Name</h5>
                                <Input type="text" placeholder="Enter Service name" className={AddListing01Css.listing} />
                            </Col>

                            <Col md={4}>
                                <h5 className={AddListing01Css.price}>Price</h5>
                                <Input type="text" placeholder="Enter price - only digits" className={AddListing01Css.listing} />

                            </Col>

                            <Col md={4}>
                                <h5 className={AddListing01Css.type}>Type</h5>
                                <Input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Single free" suffix={<CaretDownOutlined />} className={AddListing01Css.listing} />
                                <datalist id="data">
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                    <option>Four</option>
                                    {data.map((op) => <optiopn>{op}</optiopn>)}
                                </datalist>
                            </Col>

                            <Row className={AddListing01Css.btnparent}>
                                <button className={AddListing01Css.deletebtn}>Delete</button>
                            </Row>
                        </Row>

                        <Row className={AddListing01Css.addbtnparent}>
                            <button className={AddListing01Css.addbtn}><PlusOutlined className={AddListing01Css.plus} /> Add More</button>
                        </Row>
                    </Row>
                    <hr />

                    <Row>
                        <h3 className={AddListing01Css.info}>Additional costs</h3>

                        <Row>
                            <Col md={4}>
                                <h5 className={AddListing01Css.name}>Cleaning fee</h5>
                                <Input type="text" placeholder="Enter the Unit price for a single day" className={AddListing01Css.listing} />
                            </Col>

                            <Col md={4} className={AddListing01Css.radio}>
                                <div className={AddListing01Css.radioA}>
                                    <p className={AddListing01Css.daily}>Daily</p>
                                    <input type="radio" />
                                </div>
                            </Col>

                            <Col md={4} className={AddListing01Css.radio}>
                                <div className={AddListing01Css.radioA}>
                                    <p className={AddListing01Css.perStay}>Per Stay</p>
                                    <input type="radio" className={AddListing01Css.dot} />
                                </div>
                            </Col>

                            <div className={AddListing01Css.twobtn}>
                                <button className={AddListing01Css.savebtn}>Back</button>
                                <button className={AddListing01Css.savebtn}>Save as Draft</button>
                            </div>

                            <Row className={AddListing01Css.addbtnparent}>
                                <button className={AddListing01Css.addbtn}> Continue</button>
                            </Row>
                        </Row>
                    </Row>
                </Container>
            </ProtectedRoute>
        </>
    )
}

export default Addlisting01
