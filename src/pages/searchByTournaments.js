import React from 'react'
import SearchByTourCss from "../styles/SearchByTournament.module.css";
import Search from "../../public/images/search.svg";
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { Dropdown, Pagination, Button, Space } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import BottomSection from "../../common components/bottomGroup";
import CarouselImages from "../../common components/carouselMap";

const searchByTournaments = () => {
    const onChange = (pageNumber) => {
        console.log("Page: ", pageNumber);
    };

    // DROPDOWN CONTENT

    const handleMenuClick = (e) => {
        console.log("click", e);
    };

    const items = [
        {
            label: "1st menu item",
            key: "1",
        },
        {
            label: "2nd menu item",
            key: "2",
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <>
            {/*------------------------ SEARCH BY TOURNAMENT TOP IMAGE------------------------ */}
            <div className={SearchByTourCss.topImage}>
                <Image src={Search}
                    alt="Privacy"
                    fill
                    className={SearchByTourCss.topImgChild}>
                </Image>
            </div>

            {/* -----------------------  SEARCH BY TOURNAMENT TEXT    --------------------------*/}

            <Container>
                <Row>
                    <Col md={4} className={SearchByTourCss.textArea}>
                        <h2 className={SearchByTourCss.searchTitle}>Search by Tournaments</h2>
                        <h6 className={SearchByTourCss.checkOut}>Check out our growing list of tour-spot rentals</h6>

                        <Dropdown menu={menuProps}>
                            <Button
                                size="large"
                                className={SearchByTourCss.edit_room_dropdown_btn}
                            >
                                <Space className={SearchByTourCss.edit_room_dropdown_btn_space}>
                                    The Tradition at Quinta
                                    <DownOutlined
                                        className={SearchByTourCss.edit_room_dropdown_icon}
                                    />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Button className={SearchByTourCss.search}>Search</Button>
                    </Col>
                </Row>
            </Container>

            {/* -----------------------            ORLANDO SECTION             ---------------------  */}

            <section className={SearchByTourCss.search_main_section}>
                <Container>
                    <Row>
                        <h4 className={SearchByTourCss.orlandoHead}>The Tradition at Quinta</h4>

                        {/*    ----------------      CARD MAP SECTION      -------------------   */}
                        <Col md={8}>
                            <hr />

                            <div className={SearchByTourCss.orlandParent}>
                                <div className={SearchByTourCss.sortSection}>
                                    <h5 className={SearchByTourCss.rental}>150 Rentals</h5>

                                    <div className={SearchByTourCss.sortdiv}>
                                        <h6 className={SearchByTourCss.sort}>Sort By:</h6>

                                        <Dropdown menu={menuProps} className={SearchByTourCss.default}>
                                            <Button size="large">
                                                <Space>
                                                    Default order
                                                    <DownOutlined />
                                                </Space>
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </div>
                                {/* ------------------- CAROUSEL IMAGES STARTS  -----------------------  */}
                                <CarouselImages />
                            </div>
                        </Col>

                        {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
                        <Col md={4} className={SearchByTourCss.mapParent}>
                            <Image
                                fill
                                src="/images/mapGroup.png"
                                alt="Map"
                                className={SearchByTourCss.map}
                            />
                        </Col>
                    </Row>

                    <div className={SearchByTourCss.pagination_container}>
                        <Pagination
                            colorText="#FF0000"
                            showQuickJumper
                            defaultCurrent={2}
                            total={500}
                            onChange={onChange}
                            className={SearchByTourCss.pagination}
                        />
                    </div>
                </Container>
            </section>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}
            <BottomSection />
        </>
    )
}

export default searchByTournaments


