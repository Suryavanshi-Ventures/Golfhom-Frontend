import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Button } from "react-bootstrap";
import ViewAllPropertyCss from "../../styles/ViewAllProperty.module.css";
import Image from "next/image";
import ViewAllProps from "../../../public/images/viewAllProps.png";
import BottomSection from "../../../common components/bottomGroup";
import { Pagination } from "antd";
import Florida from "../../../public/images/florida.svg";
import Arizona from "../../../public/images/arizona.svg";
import Sanfrancisco from "../../../public/images/sanfrancisco.svg";
import Newyork from "../../../public/images/Newyork.svg";

const ViewAllProperty = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <>
      <Head>
        <title>Golfhom | View All Property</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TOP IMAGE OF VIEW ALL PROPERTY PAGE */}
      <section className={ViewAllPropertyCss.headImage}>
        <Image
          src={ViewAllProps}
          alt="View All Property Image"
          fill
          className={ViewAllPropertyCss.imageChild}
        ></Image>
      </section>

      <section className={ViewAllPropertyCss.textContainer}>
        <Container>
          <h2 className={ViewAllPropertyCss.heading}>
            Find Great Vacation Rentals near Florida & Arizona
          </h2>

          <h2 className={ViewAllPropertyCss.golfCourse}> Golf Courses!</h2>

          <p className={ViewAllPropertyCss.para}>
            Arizona and Florida are renowned for their beautiful surroundings,
            outdoor lifestyles, & of course for having some of the world’s best
            golf courses! Golfhōm has a growing selection of golf
            course-vicinity vacation rentals that deliver the comforts of home,
            luxe amenities, and access to plenty of Arizona and Florida
            attractions!{" "}
          </p>

          <p className={ViewAllPropertyCss.para}>
            Golfhōm is transforming how golfers locate and book their next
            luxury golf vacation rental. Book with us today!
          </p>
        </Container>
      </section>

      <section>
        <Container>
          <Row className={ViewAllPropertyCss.columnParent}>
            <div className={ViewAllPropertyCss.columnsA}>
              <Image fill src={Florida} alt="Florida"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsB}>
              <Image fill src={Arizona} alt="Arizona"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Arizona</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsC}>
              <Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsD}>
              <Image fill src={Newyork} alt="Newyork"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Newyork</h4>
            </div>
          </Row>

          <Row className={ViewAllPropertyCss.columnParent}>
            <div className={ViewAllPropertyCss.columnsA}>
              <Image fill src={Florida} alt="Florida"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsB}>
              <Image fill src={Arizona} alt="Arizona"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Arizona</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsC}>
              <Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsD}>
              <Image fill src={Newyork} alt="Newyork"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Newyork</h4>
            </div>
          </Row>

          <Row className={ViewAllPropertyCss.columnParent}>
            <div className={ViewAllPropertyCss.columnsA}>
              <Image fill src={Florida} alt="Florida"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsB}>
              <Image fill src={Arizona} alt="Arizona"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Arizona</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsC}>
              <Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsD}>
              <Image fill src={Newyork} alt="Newyork"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Newyork</h4>
            </div>
          </Row>

          <Row className={ViewAllPropertyCss.columnParent}>
            <div className={ViewAllPropertyCss.columnsA}>
              <Image fill src={Florida} alt="Florida"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsB}>
              <Image fill src={Arizona} alt="Arizona"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Arizona</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsC}>
              <Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4>
            </div>
            <div className={ViewAllPropertyCss.columnsD}>
              <Image fill src={Newyork} alt="Newyork"></Image>
              <h4 className={ViewAllPropertyCss.countryName}>Newyork</h4>
            </div>
          </Row>
        </Container>
      </section>

      <Container className={ViewAllPropertyCss.pagination_container}>
        <Pagination
          colorText="#FF0000"
          showQuickJumper={false}
          showSizeChanger={false}
          defaultCurrent={2}
          total={500}
          onChange={onChange}
          className={ViewAllPropertyCss.pagination}
        />
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default ViewAllProperty;
