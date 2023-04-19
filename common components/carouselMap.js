import React from 'react'
import CarouselMapCss from "../src/styles/CarouselMap.module.css";
import { Carousel, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import HotelA from "../public/images/hotelA.svg";
import HotelB from "../public/images/hotelB.svg";
import HotelC from "../public/images/hotelC.svg";
import HotelD from "../public/images/hotelD.svg";
import beachView from "../public/images/beachView.svg";
import Heart from "../public/images/vector/heart.svg";
import Dot from "../public/images/vector/dot.svg";

const carouselMap = () => {
    return (
        <>
            <Row>
                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelA}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelA}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelA}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>

                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelB}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelB}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelB}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image>
                            </Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image>
                                </Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>
            </Row>

            <Row>
                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>

                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>
            </Row>

            <Row>
                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelC}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>

                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki.</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>
            </Row>

            <Row>
                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={beachView}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={beachView}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={beachView}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>

                <Col md={6} className={CarouselMapCss.carouselBlock}>
                    <Carousel className={CarouselMapCss.carouselParent}>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className={CarouselMapCss.imageGap}>
                            <Link href="/search/view_property">
                                <Image
                                    src={HotelD}
                                    alt="Hotel View"
                                    fill
                                    className={CarouselMapCss.carouselImage}
                                >
                                </Image></Link>

                            <div className={CarouselMapCss.heartParent}>
                                <Link href="/search/view_property">
                                    <Image
                                        src={Heart}
                                        alt="Heart"
                                        fill
                                        className={CarouselMapCss.heart}
                                    >
                                    </Image></Link>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    <Link href="/search/view_property" style={{ textDecoration: "none" }}>
                        <h4 className={CarouselMapCss.carouselHeading}>Hotel Empire Moscow Sokoliki</h4></Link>
                    <p className={CarouselMapCss.discribeOfCard}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div><span className={CarouselMapCss.discribeOfCard}>5 Bed Rooms</span>
                        <Image src={Dot} alt="Dot" className={CarouselMapCss.dot}></Image>
                        <span className={CarouselMapCss.discribeOfCard}>8 Guests Villa</span></div>
                </Col>
            </Row>

        </>
    )
}

export default carouselMap
