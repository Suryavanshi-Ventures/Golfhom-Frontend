import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";
import { Input } from "antd";
const { TextArea } = Input;
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

const TabContentOverview = (PropData) => {
  const [GolfCourseData, setGolfCourseData] = useState([{}]);

  useEffect(() => {
    const GetGolfCourseByLatLong = async () => {
      try {
        const GetGolfCourseRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/golfcourse?latitude=${PropData?.data?.latitude}&longitude=${PropData?.data?.longitude}&distance=20`
        );
        if (GetGolfCourseRes.status === 200) {
          setGolfCourseData(GetGolfCourseRes.data.data);
          console.log(GetGolfCourseRes.data.data.splice(0, 5));
        }
      } catch (error) {
        console.log("ERROR: GETTING GOLFCOURSE", error);
      }
    };
    GetGolfCourseByLatLong();

    return () => {
      GetGolfCourseByLatLong();
    };
  }, [PropData?.data?.latitude, PropData?.data?.longitude]);

  return (
    <>
      <main className={ViewPropertyCss.tabOverviewSection}>
        <h3 className={ViewPropertyCss.tabOverviewPropHeading}>
          {PropData.data?.name ? PropData.data?.name : "N/A"}{" "}
          {`(${
            PropData?.data?.externalPropertyType
              ? PropData?.data?.externalPropertyType
              : "N/A"
          })`}
        </h3>
        <div className={ViewPropertyCss.host_name_div}>
          <span className={ViewPropertyCss.owner_name}>
            Golf Course Vicinity:{" "}
          </span>{" "}
          <span className={ViewPropertyCss.owner_name_text}>
            <span className={ViewPropertyCss.more_golfcourse_name_text}>
              {GolfCourseData.map((data, index) =>
                data.club_name ? data.club_name : "N/A"
              )
                .splice(0, 5)
                .join(",  ")}
            </span>
          </span>
        </div>

        <div className={ViewPropertyCss.host_name_div}>
          <span className={ViewPropertyCss.owner_name}>Host: </span>
          <span className={ViewPropertyCss.owner_name_text}>
            {PropData?.data?.ownerName ? PropData?.data?.ownerName : "N/A"}
          </span>
        </div>
        {/* PROP AMENITES DETAILS  */}
        <Row className={ViewPropertyCss.amenities_details_row}>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBedIcon}
                  height={24}
                  width={24}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>

              <div className={ViewPropertyCss.heading_para}>
                <h5 className={ViewPropertyCss.amenities_details_main_heading}>
                  Accommodation
                </h5>
                <p
                  className={ViewPropertyCss.amenities_details_main_subheading}
                >
                  {PropData.data?.accomodation
                    ? PropData.data?.accomodation
                    : "N/A"}{" "}
                  Guests
                </p>
              </div>
            </div>
          </Col>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBedIcon}
                  height={24}
                  width={24}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>

              <div className={ViewPropertyCss.heading_para}>
                <h5 className={ViewPropertyCss.amenities_details_main_heading}>
                  Bedrooms
                </h5>
                <p
                  className={ViewPropertyCss.amenities_details_main_subheading}
                >
                  {PropData.data?.bedrooms ? PropData.data?.bedrooms : 1}{" "}
                  Bedrooms / {PropData.data?.beds ? PropData.data?.beds : 1}{" "}
                  Beds
                </p>
              </div>
            </div>
          </Col>
          <Col md={"auto"} className={ViewPropertyCss.amenities_details_cols}>
            <div className={ViewPropertyCss.amenities_details_container}>
              <div className={ViewPropertyCss.amenities_details_img_container}>
                <Image
                  src={ViewPropBathroomIcon}
                  height={24}
                  width={24}
                  className={ViewPropertyCss.amenities_imgs}
                  alt="Golfhom amenities"
                ></Image>
              </div>

              <div className={ViewPropertyCss.heading_para}>
                <h5 className={ViewPropertyCss.amenities_details_main_heading}>
                  Bathrooms
                </h5>
                <p
                  className={ViewPropertyCss.amenities_details_main_subheading}
                >
                  {PropData.data?.bathrooms ? PropData.data?.bathrooms : "1"}{" "}
                  Full
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {/* ABOUT SECTION START HERE */}
        <Row className={ViewPropertyCss.about_section_row}>
          <Col className={ViewPropertyCss.about_section_cols}>
            <div className={ViewPropertyCss.about_section_container}>
              <h4 className={ViewPropertyCss.about_section_main_heading}>
                Description
              </h4>
              <TextArea
                value={
                  PropData.data?.description?.replace(/\*|BR|BA|#|/g, "")
                    ? PropData.data?.description
                    : "N/A"
                }
                placeholder="Controlled autosize"
                className={ViewPropertyCss.about_section_para}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                readOnly
              />
            </div>
          </Col>
        </Row>
        {/* Rest of the code */}
      </main>
    </>
  );
};

export default TabContentOverview;
