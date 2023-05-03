import React from "react";
import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import Image from "next/image";

const TabContentOverview = () => {
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

        {/* ABOUT SECTION START HERE */}
        <Row className={ViewPropertyCss.about_section_row}>
          <Col md={"auto"} className={ViewPropertyCss.about_section_cols}>
            <div className={ViewPropertyCss.about_section_container}>
              <h1 className={ViewPropertyCss.about_section_main_heading}>
                About this listing
              </h1>
              <p className={ViewPropertyCss.about_section_para}>
                Welcome to Red Rock, a Rove Travel Home! Rove is a brand of
                curated luxury property rentals equipped with remote-work setups
                designed for the modern traveler. Our dedicated concierge team
                ensures exceptional customer service for any requests or
                concerns.
              </p>
              <p className={ViewPropertyCss.about_section_para}>
                The Space: Experience the height of luxury and sophistication at
                Red Rock, a newly renovated home located in the heart of
                Scottsdale! Just a short drive away from the city’s best
                attractions, bask in the sun by the pool (unheated), challenge
                your friends to a game of cornhole, read a book on the hammock,
                or toast with your group by the grill in the patio area. Inside,
                the interior is a delightful blend of modern furnishings with
                vaulted ceilings, a perfect retreat featuring a billiards table
                and a chef-worthy kitchen. There’s even a wet bar and an indoor
                fireplace that awaits you after a day of exploring. Enjoy
                endless sunny days at Red Rock, a home with every amenity you
                need for an extraordinary experience that will leave you feeling
                relaxed and renewed.
              </p>
              <p className={ViewPropertyCss.about_section_para}>
                Amenities: Every Rove property is equipped with a fully-stocked
                kitchen, Nespresso machines, high thread count linens, and Malin
                & Goetz soaps. Our TVs are powered on Roku, and we provide
                complimentary access to streaming accounts for Netflix, Hulu,
                and Disney+.
              </p>

              <p className={ViewPropertyCss.about_section_para}>
                Workspace: Every Rove property is fitted for remote-friendly
                stays. Rove workstations are equipped with:-400 mbps WiFi
                throughout the property / High Speed Wifi-Ergonomic
                chairs-Electric standing desks-HP high-definition monitor with
                integrated docking station-Logitech wireless keyboard and mouse
              </p>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default TabContentOverview;
