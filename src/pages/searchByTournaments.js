import React from 'react'
import SearchByTourCss from "../styles/SearchByTournament.module.css";
import Search from "../../public/images/search.svg";
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from "@ant-design/icons";

const searchByTournaments = () => {

    // DROPDOWN CONTENT

    const handleMenuClick = (e) => {
        console.log("click", e);
    };

    const items = [
        {
            label: "Select",
            key: "1",
        },
        {
            label: "Register to Rent",
            key: "2",
        },
        {
            label: "Register to Host",
            key: "3",
        }
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
                    <Col md={4}>
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
        </>
    )
}

export default searchByTournaments


