import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Button } from "react-bootstrap";
import ViewAllPropertyCss from "../../styles/ViewAllProperty.module.css";
import Image from "next/image";
import ViewAllProps from "../../../public/images/viewAllProps.png";
import Grouptalk from "../../../public/images/grouptalk.png";
import { Pagination } from "antd";
import Florida from "../../../public/images/florida.png"
import Arizona from "../../../public/images/arizona.png"
import Sanfrancisco from "../../../public/images/sanfrancisco.png"
import Newyork from "../../../public/images/newyork.png"


const view_all_property = () => {
    const onChange = (pageNumber) => {
        console.log("Page: ", pageNumber);
    };


    return (
        <>
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
                    <h2 className={ViewAllPropertyCss.heading}>Find Great Vacation Rentals near Florida & Arizona</h2>

                    <h2 className={ViewAllPropertyCss.golfCourse}> Golf Courses!</h2>

                    <p className={ViewAllPropertyCss.para}>Arizona and Florida are renowned for their beautiful surroundings, outdoor lifestyles, & of course for having some of the world’s best golf courses! Golfhōm has a growing selection of golf course-vicinity vacation rentals that deliver the comforts of home, luxe amenities, and access to plenty of Arizona and Florida attractions! </p>

                    <p className={ViewAllPropertyCss.para}>Golfhōm is transforming how golfers locate and book their next luxury golf vacation rental. Book with us today!</p>
                </Container>
            </section>


            <section>
                <Container>
                    <Row className={ViewAllPropertyCss.columnParent}>
                        <div className={ViewAllPropertyCss.columnsA}><Image fill src={Florida} alt="Florida"></Image>
                            <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
                        </div>
                        <div className={ViewAllPropertyCss.columnsB}><Image fill src={Arizona} alt="Arizona"></Image><h4 className={ViewAllPropertyCss.countryName}>Arizona</h4></div>
                        <div className={ViewAllPropertyCss.columnsC}><Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image><h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4></div>
                        <div className={ViewAllPropertyCss.columnsD}><Image fill src={Newyork} alt="Newyork"></Image><h4 className={ViewAllPropertyCss.countryName}>Newyork</h4></div>
                    </Row>

                    <Row className={ViewAllPropertyCss.columnParent}>
                        <div className={ViewAllPropertyCss.columnsA}><Image fill src={Florida} alt="Florida"></Image>
                            <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
                        </div>
                        <div className={ViewAllPropertyCss.columnsB}><Image fill src={Arizona} alt="Arizona"></Image><h4 className={ViewAllPropertyCss.countryName}>Arizona</h4></div>
                        <div className={ViewAllPropertyCss.columnsC}><Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image><h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4></div>
                        <div className={ViewAllPropertyCss.columnsD}><Image fill src={Newyork} alt="Newyork"></Image><h4 className={ViewAllPropertyCss.countryName}>Newyork</h4></div>
                    </Row>

                    <Row className={ViewAllPropertyCss.columnParent}>
                        <div className={ViewAllPropertyCss.columnsA}><Image fill src={Florida} alt="Florida"></Image>
                            <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
                        </div>
                        <div className={ViewAllPropertyCss.columnsB}><Image fill src={Arizona} alt="Arizona"></Image><h4 className={ViewAllPropertyCss.countryName}>Arizona</h4></div>
                        <div className={ViewAllPropertyCss.columnsC}><Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image><h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4></div>
                        <div className={ViewAllPropertyCss.columnsD}><Image fill src={Newyork} alt="Newyork"></Image><h4 className={ViewAllPropertyCss.countryName}>Newyork</h4></div>
                    </Row>

                    <Row className={ViewAllPropertyCss.columnParent}>
                        <div className={ViewAllPropertyCss.columnsA}><Image fill src={Florida} alt="Florida"></Image>
                            <h4 className={ViewAllPropertyCss.countryName}>Florida</h4>
                        </div>
                        <div className={ViewAllPropertyCss.columnsB}><Image fill src={Arizona} alt="Arizona"></Image><h4 className={ViewAllPropertyCss.countryName}>Arizona</h4></div>
                        <div className={ViewAllPropertyCss.columnsC}><Image fill src={Sanfrancisco} alt="Sanfrancisco"></Image><h4 className={ViewAllPropertyCss.countryName}>Sanfrancisco</h4></div>
                        <div className={ViewAllPropertyCss.columnsD}><Image fill src={Newyork} alt="Newyork"></Image><h4 className={ViewAllPropertyCss.countryName}>Newyork</h4></div>
                    </Row>
                </Container>
            </section>


            <div className={ViewAllPropertyCss.pagination_container}>
                <Pagination
                    colorText="#FF0000"
                    showQuickJumper
                    defaultCurrent={2}
                    total={500}
                    onChange={onChange}
                    className={ViewAllPropertyCss.pagination}
                />
            </div>


            {/* BOTTOM IMAGE SECTION */}
            <section className={ViewAllPropertyCss.grouptalk}>
                <div>
                    <div className={ViewAllPropertyCss.groupParent}>
                        <Image
                            alt="group talk"
                            className={ViewAllPropertyCss.grouptalk}
                            src={Grouptalk}
                            fill
                        ></Image>
                    </div>

                    <Col md={4} className={ViewAllPropertyCss.newBtn}>
                        <h4 className={ViewAllPropertyCss.grouptalkTitle}>THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS</h4>
                        <Button className={ViewAllPropertyCss.search}>Search</Button>
                    </Col>
                </div>
            </section>
        </>
    )
}

export default view_all_property
