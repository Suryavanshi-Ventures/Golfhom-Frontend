import React, { useState } from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.png";
import AddListing01Css from "../../styles/dashboard/AddListing01.module.css";
import ProtectedRoute from "../../../common components/protected_route";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Dropdown, Input, Space, Typography } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from "@ant-design/icons";

const Addlisting01 = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                    <Col md={10}>
                        <h2 className={AddListing01Css.addListing}>Add Listing</h2>

                        <h3 className={AddListing01Css.info}>Pricing</h3>

                        <hr />


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

                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: "1",
                                                    label: "Action",
                                                },
                                                {
                                                    key: "2",
                                                    label: "Another action",
                                                },
                                                {
                                                    key: "3",
                                                    label: "Something else",
                                                },
                                            ],
                                            selectable: true,
                                            defaultSelectedKeys: ["3"],
                                        }}
                                        trigger={["click"]}
                                        value={selectedOption}
                                        onChange={handleOptionChange}
                                        className={AddListing01Css.colA}
                                    >
                                        <span onClick={(e) => e.preventDefault()}>
                                            <Typography.Link href="https://www.google.com/" onClick={(e) => e.preventDefault()}>
                                                <Space className={AddListing01Css.search_by_golf_input_search_by_tourni}>
                                                    Single free
                                                    <CaretDownOutlined />
                                                </Space>
                                            </Typography.Link>
                                        </span>
                                    </Dropdown>
                                </Col>

                                <div className={AddListing01Css.btnparent}>
                                    <Button className={AddListing01Css.deletebtn}>Delete</Button>
                                </div>
                            </Row>

                            <div className={AddListing01Css.addbtnparent}>
                                <Button className={AddListing01Css.addbtn}><PlusOutlined className={AddListing01Css.plus} /> Add More</Button>
                            </div>
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
                                        <Col md={8}>
                                            <p className={AddListing01Css.daily}>Daily</p>
                                        </Col>

                                        <Col md={4} className={AddListing01Css.circle}>
                                            <Input type="radio" />
                                        </Col>
                                    </div>
                                </Col>

                                <Col md={4} className={AddListing01Css.radio}>
                                    <div className={AddListing01Css.radioA}>
                                        <Col md={8}>
                                            <p className={AddListing01Css.perStay}>Per Stay</p>
                                        </Col>

                                        <Col md={4} className={AddListing01Css.circle}>
                                            <Input type="radio" className={AddListing01Css.dot} />
                                        </Col>
                                    </div>
                                </Col>

                                <div className={AddListing01Css.twobtn}>
                                    <Button className={AddListing01Css.savebtn}>Back</Button>
                                    <Button className={AddListing01Css.savebtn}>Save as Draft</Button>
                                </div>

                                <div className={AddListing01Css.addbtnparent}>
                                    <Button className={AddListing01Css.addbtn}> Continue</Button>
                                </div>
                            </Row>
                        </Row>
                    </Col>
                </Container>
            </ProtectedRoute>
        </>
    )
}

export default Addlisting01
