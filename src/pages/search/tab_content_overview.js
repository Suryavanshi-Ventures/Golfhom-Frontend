import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";

import Image from "next/image";

const TabContentOverview = (PropData) => {
  return (
    <>
      <main className={ViewPropertyCss.tabOverviewSection}>
        <h1 className={ViewPropertyCss.tabOverviewPropHeading}>
          {PropData.data.name ? PropData.data.name : "N/A"}
        </h1>
        <p className={ViewPropertyCss.tabOverviewPropSmallSubheading}>
          Golf Course Vicinity:{" "}
          {PropData.golfCourseName ? PropData.golfCourseName : "N/A"}
        </p>
        <p className={ViewPropertyCss.tabOverviewPropSubheading}>
          {PropData && PropData.description ? PropData.description : "N/A"}
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
                {PropData.data.accomodation
                  ? PropData.data.accomodation
                  : "N/A"}{" "}
                Guests
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
                {PropData.data.bedrooms ? PropData.data.bedrooms : "N/A"}{" "}
                Bedrooms / {PropData.data.beds ? PropData.data.beds : "N/A"}{" "}
                Beds
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
                {PropData.data.bathrooms ? PropData.data.bathrooms : "1"} Full
              </p>
            </div>
          </Col>
        </Row>

        {/* ABOUT SECTION START HERE */}
        <Row className={ViewPropertyCss.about_section_row}>
          <Col md={"auto"} className={ViewPropertyCss.about_section_cols}>
            <div className={ViewPropertyCss.about_section_container}>
              <h1 className={ViewPropertyCss.about_section_main_heading}>
                Description
              </h1>
              <p className={ViewPropertyCss.about_section_para}>
                {PropData.data.description}
              </p>
            </div>
          </Col>
        </Row>
        {/* Rest of the code */}
      </main>
    </>
  );
};

export default TabContentOverview;
