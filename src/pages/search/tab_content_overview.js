import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";
import { Button, Input, Modal } from "antd";
const { TextArea } = Input;
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TabContentOverview = (PropData) => {
  const RouterRef = useRouter();
  const { golfcourse_name } = RouterRef.query;
  const [GolfCourseData, setGolfCourseData] = useState([{}]);

  useEffect(() => {
    const GetGolfCourseByLatLong = async () => {
      try {
        const GetGolfCourseRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/golfcourse?latitude=${PropData?.data?.latitude}&longitude=${PropData?.data?.longitude}&distance=8`
        );
        if (GetGolfCourseRes.status === 200) {
          //* Execute only when the URL "golfcourse_name" parameter exist
          if (golfcourse_name) {
            //* Filter out the url parameter golf course name from all the golf course name
            const FilterObj = GetGolfCourseRes.data.data.find(
              (item) => item.club_name === golfcourse_name
            );
            const newArray = [
              FilterObj,
              ...GetGolfCourseRes.data.data.filter(
                (item) => item.club_name !== golfcourse_name
              ),
            ];
            //! END
          }
          setGolfCourseData(GetGolfCourseRes.data.data.slice(0, 5));
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

  // DATA MODAL

  const [modalOpen, setModalOpen] = useState(false);
  const [golfCourseDataModal, setGolfCourseDataModal] = useState(null);

  const showModal = (data) => {
    setGolfCourseDataModal(data);
    setModalOpen(true);
  };
  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

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
            Golf Course Vicinity:-{" "}
          </span>{" "}
          <span className={ViewPropertyCss.owner_name_text}>
            <span className={ViewPropertyCss.more_golfcourse_name_text}>
              <ul className={ViewPropertyCss.list_bullet}>
                {GolfCourseData.length === 0 ? (
                  <>
                    <li className={ViewPropertyCss.list_bullet_lis}>N/A</li>
                  </>
                ) : (
                  <>
                    {GolfCourseData.map((data, index) => (
                      <li
                        className={ViewPropertyCss.list_bullet_lis}
                        onClick={() => showModal(data)}
                        key={index}
                      >
                        {data.club_name ? data.club_name : "N/A"}
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <Modal
                open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                width={700}
                footer={[
                  <Button
                    key="submit"
                    className={ViewPropertyCss.modal_ok_button}
                    onClick={handleOk}
                  >
                    OK
                  </Button>,
                ]}
              >
                {golfCourseDataModal ? (
                  <Row
                    style={{ justifyContent: "space-between" }}
                    className={ViewPropertyCss.modal_data_parent_div}
                  >
                    <div
                      className={ViewPropertyCss.modal_golf_course_banner_div}
                    >
                      <Image
                        className={ViewPropertyCss.modal_golf_course_banner_img}
                        fill
                        alt="Golf Course"
                        src="/images/GolfhomCourseIndex.webp"
                      ></Image>
                    </div>
                    <h5 className={ViewPropertyCss.club_name_heading}>
                      <span className={ViewPropertyCss.title_of_modal}>
                        Club Name:{" "}
                      </span>
                      {golfCourseDataModal.club_name}
                    </h5>
                    <Col md={5} sm={6}>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Postal Code:{" "}
                        </span>
                        {golfCourseDataModal.postal_code}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Address:{" "}
                        </span>
                        {golfCourseDataModal.address}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          City:
                        </span>{" "}
                        {golfCourseDataModal.city}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          State:{" "}
                        </span>
                        {golfCourseDataModal.state}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Country:{" "}
                        </span>
                        {golfCourseDataModal.country}
                      </p>
                    </Col>

                    <Col md={5} sm={6}>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Driving Range:{" "}
                        </span>
                        {golfCourseDataModal.driving_range}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Practice Green:{" "}
                        </span>
                        {golfCourseDataModal.putting_green}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Number of Hole:{" "}
                        </span>{" "}
                        {golfCourseDataModal.number_of_holes}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Club Membership:{" "}
                        </span>
                        {golfCourseDataModal.club_membership}
                      </p>
                      <p className={ViewPropertyCss.club_detail_member}>
                        <span className={ViewPropertyCss.title_of_modal}>
                          Website:{" "}
                        </span>
                        <Link
                          href={
                            golfCourseDataModal.website.includes("https://")
                              ? golfCourseDataModal.website
                              : golfCourseDataModal.website.includes("http://")
                              ? golfCourseDataModal.website
                              : !golfCourseDataModal.website.includes(
                                  "http://"
                                ) ||
                                !golfCourseDataModal.website.includes(
                                  "https://"
                                )
                              ? `https://${golfCourseDataModal.website}`
                              : ""
                          }
                          target="_blank"
                        >
                          {/* `https://${golfCourseDataModal.website}` */}
                          {golfCourseDataModal.website.includes("https://")
                            ? golfCourseDataModal.website
                            : golfCourseDataModal.website.includes("http://")
                            ? golfCourseDataModal.website
                            : !golfCourseDataModal.website.includes(
                                "http://"
                              ) ||
                              !golfCourseDataModal.website.includes("https://")
                            ? `https://${golfCourseDataModal.website}`
                            : ""}
                        </Link>
                      </p>
                    </Col>
                  </Row>
                ) : null}
              </Modal>
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
