import React from "react";
import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import Image from "next/image";

const tab_content_overview = () => {
  return (
    <>
      <main className={ViewPropertyCss.tab_overview_section}>
        <h1 className={ViewPropertyCss.tab_overview_prop_heading}>
          Pool, BBQ, Fire-pit | Sonoran Hill by RoveTravel
        </h1>
        <p className={ViewPropertyCss.tab_overview_prop_small_subheading}>
          Golf Course Vicinity:
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
                8 Guests
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
                4 Bedrooms / 8 Beds
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
                Bathrooms
              </h1>
              <p className={ViewPropertyCss.amenities_details_main_subheading}>
                2 Full
              </p>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default tab_content_overview;
