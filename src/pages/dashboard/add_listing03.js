import AddListing03Css from "../../styles/dashboard/AddListing03.module.css";
import ProtectedRoute from "../../../common components/protected_route";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input } from "antd";
import React from "react";

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

  for (let rowAcolA = 0; rowAcolA < 20; rowAcolA++) {
    elements.push(
      <div key={rowAcolA} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"uprowA-${rowAcolA}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowAcolA}"}>{beds}</label>
      </div>
    );
  }

  for (let rowAcolB = 0; rowAcolB < 20; rowAcolB++) {
    hour.push(
      <div key={rowAcolB} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"uprowB-${rowAcolB}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowAcolB}"}>{security}</label>
      </div>
    );
  }

  for (let rowAcolC = 0; rowAcolC < 20; rowAcolC++) {
    door.push(
      <div key={rowAcolC} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"uprowC-${rowAcolC}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowAcolC}"}>{terrace}</label>
      </div>
    );
  }

  for (let rowBcolA = 0; rowBcolA < 10; rowBcolA++) {
    back.push(
      <div key={rowBcolA} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"downrowA-${rowBcolA}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowBcolA}"}>{generator}</label>
      </div>
    );
  }

  for (let rowBcolB = 0; rowBcolB < 10; rowBcolB++) {
    center.push(
      <div key={rowBcolB} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"downrowB-${rowBcolB}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowBcolB}"}>{condition}</label>
      </div>
    );
  }

  for (let rowBcolC = 0; rowBcolC < 10; rowBcolC++) {
    centeral.push(
      <div key={rowBcolC} className={AddListing03Css.checkWord}>
        <Input
          type="checkbox"
          id={"downrowC-${rowBcolC}"}
          className={AddListing03Css.tickbox}
        />
        <label htmlFor={"chekcbox-${rowBcolC}"}>{heat}</label>
      </div>
    );
  }

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Add Listing-03</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
        <div>
          <Image
            fill
            className={AddListing03Css.banner_img}
            src="https://golf-hom-latest-assets.s3.amazonaws.com/images/faq_banner_img.png"
            alt="faq golfhom banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <Container>
          <Col md={10}>
            <h3 className={AddListing03Css.addListing}>Add Listing</h3>

            <h4 className={AddListing03Css.info}>Features</h4>

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
                <Button className={AddListing03Css.savebtn}>Back</Button>
                <Button className={AddListing03Css.savebtn}>
                  Save as Draft
                </Button>
              </div>

              <div className={AddListing03Css.addbtnparent}>
                <Button className={AddListing03Css.addbtn}> Continue</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default Addlisting03;
