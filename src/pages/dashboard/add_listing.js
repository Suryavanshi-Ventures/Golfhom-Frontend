import { useState } from "react";
import AddListingCss from "../../styles/dashboard/AddListing.module.css";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import ProtectedRoute from "../../../common components/protected_route";
import { Checkbox, Input, Select, Space, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Addlisting = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Add Listing</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
        <div>
          <Image
            fill
            className={AddListingCss.banner_img}
            src="https://golf-hom-latest-assets.s3.amazonaws.com/images/faq_banner_img.png"
            alt="faq golfhom banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <Container>
          <Col md={9}>
            <h3 className={AddListingCss.addListing}>Add Listing</h3>

            <h4 className={AddListingCss.info}>Information</h4>

            <hr />

            <Row className={AddListingCss.parentCheckbox}>
              <Col md={3}>
                <Checkbox>Golf Course Front</Checkbox>
              </Col>

              <Col md={3}>
                {" "}
                <Checkbox>Golf Course Community</Checkbox>
              </Col>

              <Col md={3}>
                <Checkbox>Golf Course Vicinity</Checkbox>
              </Col>

              <Col md={3}>
                {" "}
                <p>Please check all that applies</p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h4 className={AddListingCss.title}>Title*</h4>

                <Input
                  type="text"
                  placeholder="Enter the listing title"
                  className={AddListingCss.listing}
                />
              </Col>
            </Row>

            <p className={AddListingCss.para}>
              Vicinity Golf Course(s) - Please highlight all courses within 1
              mile of the listing* (Hold command button down if selecting
              multiple courses)
            </p>

            <Row>
              <Col md={3}>
                <Select
                  defaultValue="Location"
                  options={[
                    {
                      value: "Florida",
                      label: "Florida",
                    },
                    {
                      value: "Arizona",
                      label: "Arizona",
                    },
                    {
                      value: "Sanfrancisco",
                      label: "Sanfrancisco",
                    },
                  ]}
                  trigger={["click"]}
                  size="large"
                >
                  <Select.Option onClick={(e) => e.preventDefault()}>
                    <Typography.Link
                      href="https://www.google.com/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space
                        className={
                          AddListingCss.search_by_golf_input_search_by_tourni
                        }
                      >
                        Reservation Fee
                        <CaretDownOutlined />
                      </Space>
                    </Typography.Link>
                  </Select.Option>
                </Select>
              </Col>

              <Col md={5}></Col>
            </Row>

            <Row className={AddListingCss.listingbed}>
              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Type of listing*</h4>
                <Select
                  defaultValue="Location"
                  options={[
                    {
                      value: "Florida",
                      label: "Florida",
                    },
                    {
                      value: "Arizona",
                      label: "Arizona",
                    },
                    {
                      value: "Sanfrancisco",
                      label: "Sanfrancisco",
                    },
                  ]}
                  trigger={["click"]}
                  size="large"
                >
                  <Select.Option onClick={(e) => e.preventDefault()}>
                    <Typography.Link
                      href="https://www.google.com/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space
                        className={
                          AddListingCss.search_by_golf_input_search_by_tourni
                        }
                      >
                        {" "}
                        Select listing Type
                        <CaretDownOutlined />
                      </Space>
                    </Typography.Link>
                  </Select.Option>
                </Select>
              </Col>

              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>
                  Number of bedrooms*
                </h4>
                <div>
                  <Input
                    type="number"
                    placeholder="Enter number of bedrooms"
                    className={AddListingCss.colA}
                  />
                </div>
              </Col>
            </Row>

            <Row className={AddListingCss.listingbed}>
              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>
                  Number of bedrooms*
                </h4>
                <Input
                  type="number"
                  placeholder=" Enter number of bedrooms"
                  className={AddListingCss.colA}
                />
              </Col>

              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Number of beds*</h4>
                <Input
                  type="number"
                  placeholder="Enter number of bed"
                  className={AddListingCss.colA}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h4 className={AddListingCss.subheading}>
                  Max number or overnight guests*
                </h4>
                <Input
                  type="text"
                  placeholder="Numbers of guests"
                  className={AddListingCss.listingA}
                />
              </Col>
            </Row>

            <div className={AddListingCss.twobtn}>
              <button className={AddListingCss.savebtn}>Save as Draft</button>
              <button className={AddListingCss.continuebtn}>Continue</button>
            </div>
          </Col>

          <Col md={3}></Col>
        </Container>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </ProtectedRoute>
    </>
  );
};

export default Addlisting;
