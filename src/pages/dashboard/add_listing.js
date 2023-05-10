import React, { useState } from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import AddListingCss from "../../styles/dashboard/AddListing.module.css";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import ProtectedRoute from "../../../common components/protected_route";
import { Checkbox, Input } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const Addlisting = () => {
  const [val, setVal] = useState(' ');
  const data = ["One", "Two", "Three"]

  // const [value, setValue] = useState('');
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
        <div className={AddListingCss.banner_img_container}>
          <Image
            fill
            className={AddListingCss.banner_img}
            src={FAQBannerImg}
            alt="faq golfhom banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <Container>
          <Col md={9}>
            <h2 className={AddListingCss.addListing}>Add Listing</h2>

            <h3 className={AddListingCss.info}>Information</h3>

            <hr />

            <Row className={AddListingCss.parentCheckbox}>
              <Col md={3}><Checkbox>Golf Course Front</Checkbox></Col>

              <Col md={3}> <Checkbox>Golf Course Community</Checkbox></Col>

              <Col md={3}><Checkbox>Golf Course Vicinity</Checkbox></Col>

              <Col md={3}> <p className={AddListingCss.checkapply}>Please check all that applies</p></Col>
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

            <p className={AddListingCss.para}>Vicinity Golf Course(s) - Please highlight all courses within 1 mile of the listing* (Hold command button down if selecting multiple courses)</p>

            <Row>
              <Col md={3}>
                <Input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Location" suffix={<CaretDownOutlined />} className={AddListingCss.listing} />
                <datalist id="data">
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                  {data.map((op) => <optiopn>{op}</optiopn>)}
                </datalist>
              </Col>

              <Col md={5}></Col>
            </Row>

            {/* <Row>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={() => setValue(e.target.value)}
            />
          </Row> */}

            <Row className={AddListingCss.listingbed}>
              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Type of listing*</h4>
                <Input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Select listing Type" suffix={<CaretDownOutlined />} className={AddListingCss.listing} />
                <datalist id="data">
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                  {data.map((op) => <optiopn>{op}</optiopn>)}
                </datalist>
              </Col>

              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Number of bedrooms*</h4>
                <Input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Enter number of bedrooms" suffix={<CaretDownOutlined />} className={AddListingCss.listing} />
                <datalist id="data">
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                  {data.map((op) => <optiopn>{op}</optiopn>)}
                </datalist>
              </Col>
            </Row>

            <Row className={AddListingCss.listingbed}>
              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Number of bedrooms*</h4>
                <Input list="data" onChange={(e) => setVal(e.target.value)} placeholder="Enter number of bedrooms" suffix={<CaretDownOutlined />} className={AddListingCss.listing} />
                <datalist id="data">
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                  {data.map((op) => <optiopn>{op}</optiopn>)}
                </datalist>
              </Col>

              <Col md={6} className={AddListingCss.inputBox}>
                <h4 className={AddListingCss.subheading}>Number of beds*</h4>
                <Input type="text" placeholder="Enter number of bed" className={AddListingCss.listing} />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h4 className={AddListingCss.subheading}>Max number or overnight guests*</h4>
                <Input type="text" placeholder="Numbers of guests" className={AddListingCss.listingA} />
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
