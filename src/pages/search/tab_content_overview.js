import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";
import { Button, Input, Modal } from "antd";
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
          `${process.env.NEXT_PUBLIC_API_URL}/v1/golfcourse?&latitude=${PropData.data.latitude}&longitude=${PropData.data.longitude}`
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

  // DATA MODAL

  const [modalOpen, setModalOpen] = useState(false);
  const [golfCourseDataModal, setGolfCourseDataModal] = useState(null);

  const showModal = (data) => {
    setGolfCourseDataModal(data);
    console.log("props", data);
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
          {`(${PropData?.data?.externalPropertyType
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
                {GolfCourseData.slice(0, 5).map((data, index) => (
                  <li onClick={() => showModal(data)} key={index}>
                    {data.club_name ? data.club_name : "N/A"}</li>
                ))}
              </ul>
              <Modal
                title=" "
                open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="submit" className={ViewPropertyCss.modal_ok_button} onClick={handleOk}>
                    OK
                  </Button>,
                ]}
              >
                {golfCourseDataModal ? (
                  <Row className={ViewPropertyCss.modal_data_parent_div}>
                    <Col md={6}>
                      <p className={ViewPropertyCss.club_detail}><span className={ViewPropertyCss.title_of_modal}>Club Name: </span>{golfCourseDataModal.club_name}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Address: </span>{golfCourseDataModal.address}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>City:</span> {golfCourseDataModal.city}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>State: </span>{golfCourseDataModal.state}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Country: </span>{golfCourseDataModal.country}</p>
                    </Col>

                    <Col md={6}>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Club Membership: </span>{golfCourseDataModal.club_membership}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Email: </span>{golfCourseDataModal.email_address}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Phone: </span>{golfCourseDataModal.phone}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Number of Hole: </span> {golfCourseDataModal.number_of_holes}</p>
                      <p className={ViewPropertyCss.club_detail_member}><span className={ViewPropertyCss.title_of_modal}>Website: </span>{golfCourseDataModal.website}</p>
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
