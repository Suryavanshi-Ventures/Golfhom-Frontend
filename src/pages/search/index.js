import React from "react";
import Head from "next/head";
import { Container, Col, Row, Card } from "react-bootstrap";
import Index from "../../styles/SearchIndex.module.css";
import { Input } from "antd";
import { DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import Image from "next/image";


const { RangePicker } = DatePicker;

const index = () => {
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

        {/* -----------------------            ORLANDO SECTION             ---------------------  */}

        <Container className={Index.containerBack}>
          <h4 className={Index.orlandoHead}>Orlando</h4>


          <div className={Index.mainOrland}>
            <div className={Index.orlandParent}>
              <Col className={Index.sortSection}>
                <h5 className={Index.rental}>150 Rentals</h5>

                <div className={Index.sortdiv}>
                  <h6 className={Index.sort}>Sort By:</h6>

                  <Dropdown menu={menuProps} className={Index.default}>
                    <Button
                      size="large"
                    >
                      <Space>
                        Default order
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
              </Col>

              <div className={Index.combo}>
                <div>
                  <Image
                    fill
                    src="/images/orlandoPool.svg"
                    alt="orlandoPool"
                    className={Index.orlandoImg}
                  /></div>

                <div className={Index.text}>
                  <div>
                    <h5>Hotel Empire Moscow Sokoliki</h5>

                    <p className={Index.saddle}>Saddlebrook Resort - Saddlebrook & 1 more</p>

                    <div className={Index.iconSmall}>
                      <Image
                        width={18}
                        height={18}
                        src="/images/vector/bed.svg"
                        alt="Bed"
                        className={Index.bed}
                      />
                      <p className={Index.iconName}>5 Bed Rooms</p>

                      <Image
                        width={18}
                        height={18}
                        src="/images/vector/bath-tub.svg"
                        alt="bath-tub"
                        className={Index.bathTub}
                      />
                      <p className={Index.iconName}>4 Baths</p>

                      <Image
                        width={18}
                        height={18}
                        src="/images/vector/guest.svg"
                        alt="guest"
                        className={Index.guest}
                      />
                      <p className={Index.iconName}>5 Guests Villa</p>

                      <Image
                        width={20}
                        height={20}
                        src="/images/vector/parking-area.svg"
                        alt="Car"
                        className={Index.car}
                      />
                      <p className={Index.iconName}>Parking Area</p>
                    </div>
                  </div>

                  <div className={Index.price}>
                    <div>
                      <h5 className={Index.amount}>$420/ <span className={Index.night}>Night</span></h5>
                    </div>

                    <div className={Index.heartBtn}>
                      <div className={Index.heart}>
                        <Image
                          width={20}
                          height={20}
                          src="/images/heart.svg"
                          alt="heart"
                        />
                      </div>
                      <Button className={Index.btnD}>Details</Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className={Index.mapParent}>
              <Image
                fill
                src="/images/mapGroup.svg"
                alt="Map"
                className={Index.map}
              />
            </div>
          </div>
        </Container>

      </section>
    </>
  );
};

export default index;
