import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import AddListing03Css from "../../styles/dashboard/AddListing03.module.css";
import ProtectedRoute from "../../../common components/protected_route";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Input } from 'antd';

const Addlisting03 = () => {
    const beds = "2 single beds in the lounge";
    const elements = [];

    const security = "24 Hour Security";
    const hour = [];

    const terrace = "a door to the terrace";
    const door = [];

    const generator = "Back-up Generator";
    const back = [];

    const condition = "Central Air Conditioning";
    const center = [];

    const heat = "Central Heat";
    const centeral = [];

    for (let i = 0; i < 20; i++) {
        elements.push(
            <div key={i} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'uprowA-${i}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${i}'}>{beds}</label>
            </div>
        );
    }

    for (let j = 0; j < 20; j++) {
        hour.push(
            <div key={j} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'uprowB-${j}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${j}'}>{security}</label>
            </div>
        );
    }

    for (let k = 0; k < 20; k++) {
        door.push(
            <div key={k} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'uprowC-${k}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${k}'}>{terrace}</label>
            </div>
        );
    }

    for (let i = 0; i < 10; i++) {
        back.push(
            <div key={i} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'downrowA-${i}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${i}'}>{generator}</label>
            </div>
        );
    }

    for (let j = 0; j < 10; j++) {
        center.push(
            <div key={j} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'downrowB-${j}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${j}'}>{condition}</label>
            </div>
        );
    }

    for (let k = 0; k < 10; k++) {
        centeral.push(
            <div key={k} className={AddListing03Css.checkWord}>
                <Input type="checkbox" id={'downrowC-${k}'} className={AddListing03Css.tickbox} />
                <label htmlFor={'chekcbox-${k}'}>{heat}</label>
            </div>
        );
    }

    return (
        <>
            <ProtectedRoute>
                <Head>
                    <title>Golfhom | Add Listing-02</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
                <div className={AddListing03Css.banner_img_container}>
                    <Image
                        fill
                        className={AddListing03Css.banner_img}
                        src={FAQBannerImg}
                        alt="faq golfhom banner image"
                    ></Image>
                </div>

                {/*     -------------------------     TEXT AREA      ----------------------------    */}

                <Container>
                    <Col md={10}>
                        <h2 className={AddListing03Css.addListing}>Add Listing</h2>

                        <h3 className={AddListing03Css.info}>Features</h3>

                        <hr />

                    </Col>

                    <Row>
                        <h4 className={AddListing03Css.info}>Amenities</h4>
                        <Col md={4}>{elements}</Col>
                        <Col md={4}>{hour}</Col>
                        <Col md={4}>{door}</Col>
                    </Row>

                    <Row>
                        <h4 className={AddListing03Css.info}>Facilities</h4>
                        <Col md={4}>{back}</Col>
                        <Col md={4}>{center}</Col>
                        <Col md={4}>{centeral}</Col>

                        <Col md={10}>

                            <div className={AddListing03Css.twobtn}>
                                <button className={AddListing03Css.savebtn}>Back</button>
                                <button className={AddListing03Css.savebtn}>Save as Draft</button>
                            </div>

                            <div className={AddListing03Css.addbtnparent}>
                                <button className={AddListing03Css.addbtn}> Continue</button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={10}>
                            <h3 className={AddListing03Css.info}>Location</h3>

                            <Row>
                                <Col md={6}>
                                    <h4 className={AddListing03Css.title}>Address*</h4>

                                    <Input
                                        type="text"
                                        placeholder="1170 SE 12th Terrace, Miami, FL 33132, USA"
                                        className={AddListing03Css.listing}
                                    />
                                </Col>

                                <Col md={6}>
                                    <h4 className={AddListing03Css.title}>City</h4>

                                    <Input
                                        type="text"
                                        placeholder="Miami"
                                        className={AddListing03Css.listing}
                                    />
                                </Col>
                            </Row>


                            <Row>
                                <Col md={6}>
                                    <h4 className={AddListing03Css.title}>State</h4>

                                    <Input
                                        type="text"
                                        placeholder="Florida"
                                        className={AddListing03Css.listing}
                                    />
                                </Col>

                                <Col md={6}>
                                    <h4 className={AddListing03Css.title}>Zip Code</h4>

                                    <Input
                                        type="text"
                                        placeholder="33132"
                                        className={AddListing03Css.listing}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4 className={AddListing03Css.title}>Country</h4>

                                    <Input
                                        type="text"
                                        placeholder="United States"
                                        className={AddListing03Css.listing}
                                    />
                                </Col>
                            </Row>

                            <div className={AddListing03Css.twobtn}>
                                <button className={AddListing03Css.savebtn}>Back</button>
                                <button className={AddListing03Css.savebtn}>Save as Draft</button>
                            </div>

                            <div className={AddListing03Css.addbtnparent}>
                                <button className={AddListing03Css.addbtn}> Continue</button>
                            </div>
                        </Col>

                    </Row>
                </Container>

            </ProtectedRoute>
        </>
    )
}

export default Addlisting03
