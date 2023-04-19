import React from "react";
import Head from "next/head";
import { Container, Col, Row, Card, Carousel } from "react-bootstrap";
import Index from "../../styles/SearchIndex.module.css";
import { Input } from "antd";
import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import Image from "next/image";
import { Pagination } from "antd";
import Link from "next/link";
import Buildings from "../../../public/images/buildings.png";
import BottomSection from "../../../common components/bottomGroup";
import CarouselImages from "../../../common components/carouselMap";

const { RangePicker } = DatePicker;

const index = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

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
      <Head>
        <title>Golfhom | Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/********** EDIT DETAILS SECTION  ***********/}
      <section>
        <main className={Index.edit_details_main_section}>
          <Container>
            <div className={Index.edit_details_main_container}>
              <Row className={Index.edit_details_container_row}>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>Destination</p>

                    <div className={Index.edit_details_inputs_container}>
                      <Input
                        size="large"
                        className={Index.edit_details_inputs}
                        placeholder="Basic usage"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>
                      Stay Dates (1 Night)
                    </p>

                    <div className={Index.edit_details_inputs_container}>
                      <RangePicker
                        size="large"
                        className={Index.edit_details_date_picker}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_divs}>
                    <p className={Index.edit_details_titles}>Room & Guests</p>
                    <div className={Index.edit_details_inputs_container}>
                      <Dropdown menu={menuProps}>
                        <Button
                          size="large"
                          className={Index.edit_room_dropdown_btn}
                        >
                          <Space className={Index.edit_room_dropdown_btn_space}>
                            Button Drop Down
                            <DownOutlined
                              className={Index.edit_room_dropdown_icon}
                            />
                          </Space>
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
                <Col md={3} className={Index.edit_details_container_cols}>
                  <div className={Index.edit_details_btn_parent_container}>
                    <div className={Index.edit_details_btn_child_container}>
                      <Button size="large" className={Index.edit_details_btn}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </main>
      </section>

      {/* -----------------------           HEAD IMAGE SECTION             ---------------------  */}

      <section>
        <div className={Index.buildings}>
          <Image
            className={Index.buildingImg}
            src={Buildings}
            alt="buildings"
            fill
          ></Image>
        </div>
      </section>

      {/* -----------------------            ORLANDO SECTION             ---------------------  */}

      <section className={Index.search_main_section}>
        <Container>
          <Row>
            <h4 className={Index.orlandoHead}>Orlando</h4>

            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={Index.orlandParent}>
                <div className={Index.sortSection}>
                  <h5 className={Index.rental}>150 Rentals</h5>

                  <div className={Index.sortdiv}>
                    <h6 className={Index.sort}>Sort By:</h6>

                    <Dropdown menu={menuProps} className={Index.default}>
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
            <Col md={4} className={Index.mapParent}>
              <Image
                fill
                src="/images/mapGroup.svg"
                alt="Map"
                className={Index.map}
              />
            </Col>
          </Row>

          <div className={Index.pagination_container}>
            <Pagination
              colorText="#FF0000"
              showQuickJumper
              defaultCurrent={2}
              total={500}
              onChange={onChange}
              className={Index.pagination}
            />
          </div>
        </Container>
      </section>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default index;
