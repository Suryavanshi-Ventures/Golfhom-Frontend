import React from "react";
import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";

import Image from "next/image";

const TabContentOverview = (PropData) => {
  return (
    <>
      <main className={ViewPropertyCss.tab_overview_section}>
        <h1 className={ViewPropertyCss.tab_overview_prop_heading}>
          {PropData.data.name}
        </h1>
        <p className={ViewPropertyCss.tab_overview_prop_small_subheading}>
          Golf Course Vicinity:{" "}
          {PropData.data.golfCourseName ? PropData.data.golfCourseName : "N/A"}
        </p>
        <p className={ViewPropertyCss.tab_overview_prop_subheading}>
          Orange Tree Golf Club - Orange Tree
        </p>
        {/* PROP AMENITES DETAILS  */}
        <Row className={ViewPropertyCss.amenities_details_row}>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBedIcon}
                  height={50}
                  width={50}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>
              <h1 className={ViewPropertyCss.amenities_details_main_heading}>
                Accommodation
              </h1>
              <p className={ViewPropertyCss.amenities_details_main_subheading}>
                {PropData.data.accomodation} Guests
              </p>
            </div>
          </Col>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBedIcon}
                  height={50}
                  width={50}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>
              <h1 className={ViewPropertyCss.amenities_details_main_heading}>
                Bedrooms
              </h1>
              <p className={ViewPropertyCss.amenities_details_main_subheading}>
                {PropData.data.bedrooms}
              </p>
            </div>
          </Col>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBathroomIcon}
                  height={50}
                  width={50}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>
              <h1 className={ViewPropertyCss.amenities_details_main_heading}>
                Bathrooms
              </h1>
              <p className={ViewPropertyCss.amenities_details_main_subheading}>
                {PropData.data.bathrooms}
              </p>
            </div>
          </Col>
        </Row>

        {/* ABOUT SECTION START HERE */}
        <Row className={ViewPropertyCss.about_section_row}>
          <Col md={"auto"} className={ViewPropertyCss.about_section_cols}>
            <div className={ViewPropertyCss.about_section_container}>
              <h1 className={ViewPropertyCss.about_section_main_heading}>
                About this listing
              </h1>
              <p className={ViewPropertyCss.about_section_para}>
                {PropData.data.description}
              </p>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default TabContentOverview;
