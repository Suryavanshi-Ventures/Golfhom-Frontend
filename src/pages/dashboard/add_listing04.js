import React from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.png";
import AddListing04Css from "../../styles/dashboard/AddListing04.module.css";
import ProtectedRoute from "../../../common components/protected_route";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input } from "antd";

const AddListing04 = () => {
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Add Listing-04</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
        <div className={AddListing04Css.banner_img_container}>
          <Image
            fill
            className={AddListing04Css.banner_img}
            src={FAQBannerImg}
            alt="faq golfhom banner image"
          ></Image>
        </div>

        <Container>
          <Row>
            <Col md={10}>
              <h2 className={AddListing04Css.addListing}>Add Listing</h2>

              <h3 className={AddListing04Css.info}>Location</h3>

              <hr />
            </Col>
          </Row>

          <Row>
            <Col md={10}>


              <Row>
                <Col md={6}>
                  <h4 className={AddListing04Css.title}>Address*</h4>

                  <Input
                    type="text"
                    placeholder="1170 SE 12th Terrace, Miami, FL 33132, USA"
                    className={AddListing04Css.listing}
                  />
                </Col>

                <Col md={6}>
                  <h4 className={AddListing04Css.title}>City</h4>

                  <Input
                    type="text"
                    placeholder="Miami"
                    className={AddListing04Css.listing}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h4 className={AddListing04Css.title}>State</h4>

                  <Input
                    type="text"
                    placeholder="Florida"
                    className={AddListing04Css.listing}
                  />
                </Col>

                <Col md={6}>
                  <h4 className={AddListing04Css.title}>Zip Code</h4>

                  <Input
                    type="text"
                    placeholder="33132"
                    className={AddListing04Css.listing}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h4 className={AddListing04Css.title}>Country</h4>

                  <Input
                    type="text"
                    placeholder="United States"
                    className={AddListing04Css.listing}
                  />
                </Col>
              </Row>

              <div className={AddListing04Css.twobtn}>
                <Button className={AddListing04Css.savebtn}>Back</Button>
                <Button className={AddListing04Css.savebtn}>
                  Save as Draft
                </Button>
              </div>

              <div className={AddListing04Css.addbtnparent}>
                <Button className={AddListing04Css.addbtn}>Continue</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default AddListing04;
