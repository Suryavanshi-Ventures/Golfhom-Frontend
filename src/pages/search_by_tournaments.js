import SearchByTourCss from "../styles/SearchByTournament.module.css";
import Search from "../../public/images/search.png";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Pagination, Button, Space, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CarouselImages from "../../common components/carouselMap";
import Head from "next/head";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const SearchByTournaments = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <>
      <Head>
        <title>Golfhom | Search By Tournament</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*------------------------ SEARCH BY TOURNAMENT TOP IMAGE------------------------ */}
      <div className={SearchByTourCss.topImage}>
        <Image
          src={Search}
          alt="Privacy"
          fill
          className={SearchByTourCss.topImgChild}
        ></Image>
      </div>

      {/* -----------------------  SEARCH BY TOURNAMENT TEXT    --------------------------*/}

      <Container>
        <Row>
          <Col md={4} className={SearchByTourCss.textArea}>
            <h3 className={SearchByTourCss.searchTitle}>
              Search by Tournaments
            </h3>
            <p className={SearchByTourCss.checkOut}>
              Check out our growing list of tour-spot rentals
            </p>

            <Select
              defaultValue="The Tradition at Quinta"
              options={[
                {
                  value: "Any",
                  label: "Any",
                },
                {
                  value: "Reservation Fee",
                  label: "Reservation Fee",
                },
                {
                  value: "Upgrade to Featured",
                  label: "Upgrade to Featured",
                },
              ]}
              trigger={["click"]}
              className={SearchByTourCss.edit_room_dropdown_btn}
              size="large"
            >
              <Select.Option onClick={(e) => e.preventDefault()}>
                <Typography.Link>
                  <Space
                    className={SearchByTourCss.edit_room_dropdown_btn_space}
                  >
                    {" "}
                    The Tradition at Quinta
                    <DownOutlined
                      className={SearchByTourCss.edit_room_dropdown_icon}
                    />
                  </Space>
                </Typography.Link>
              </Select.Option>
            </Select>

            <Button className={SearchByTourCss.search}>Search</Button>
          </Col>
        </Row>
      </Container>

      {/* -----------------------            ORLANDO SECTION             ---------------------  */}

      <div className={SearchByTourCss.search_main_section}>
        <Container>
          <Row>
            <h5 className={SearchByTourCss.orlandoHead}>
              The Tradition at Quinta
            </h5>

            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={SearchByTourCss.orlandParent}>
                <div className={SearchByTourCss.sortSection}>
                  <h5 className={SearchByTourCss.rental}>150 Rentals</h5>

                  <div className={SearchByTourCss.sortdiv}>
                    <p className={SearchByTourCss.sort}>Sort By:</p>
                    <Select
                      defaultValue="Default order"
                      options={[
                        {
                          value: "Low to High",
                          label: "Low to High",
                        },
                        {
                          value: "High to Low",
                          label: "High to Low",
                        },
                      ]}
                      trigger={["click"]}
                      className={SearchByTourCss.default}
                      size="large"
                    >
                      <Select.Option onClick={(e) => e.preventDefault()}>
                        <Typography.Link>
                          <Space
                          // className={InvoiceCss.search_by_golf_input_search_by_tourni}
                          >
                            {" "}
                            Default order
                            <DownOutlined />
                          </Space>
                        </Typography.Link>
                      </Select.Option>
                    </Select>
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
                src="/images/mapGroup.svg"
                alt="Map"
                className={SearchByTourCss.map}
              />
            </Col>
          </Row>

          <div className={SearchByTourCss.pagination_container}>
            <Pagination
              colorText="#FF0000"
              showQuickJumper={false}
              showSizeChanger={false}
              defaultCurrent={2}
              total={500}
              onChange={onChange}
              className={SearchByTourCss.pagination}
            />
          </div>
        </Container>
      </div>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}
      <BottomSection />
    </>
  );
};

export default SearchByTournaments;
