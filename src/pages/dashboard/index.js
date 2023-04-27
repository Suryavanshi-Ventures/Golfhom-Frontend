import React from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import Image from "next/image";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import DashboardCss from "../../styles/dashboard/DashboardIndex.module.css";
import Profile from "../../../public/images/vector/profile.svg";
import Advertise from "../../advertise";
import ads from "../ads.json";


function index() {
  return <>
    {/*   -------------------------     BANNER IMAGE   -------------------------------   */}
    <div className={DashboardCss.banner_img_container}>
      <Image
        fill
        className={DashboardCss.banner_img}
        src={FAQBannerImg}
        alt="faq golfhom banner image"
      ></Image>
    </div>

    {/*     -------------------------     TEXT AREA      ----------------------------    */}

    <Container className={DashboardCss.introParent}>
      <Row><h2 className={DashboardCss.welcome}>Welcome back, AkashSuryavanshi </h2></Row>
      <hr />

      <Row>
        <Col md={4}>
          <h2 className={DashboardCss.welcome}>Listings</h2>
          <h4 className={DashboardCss.fromP}>0</h4>
          <p className={DashboardCss.addManWal}>Add new</p>
        </Col>

        <Col md={4}>
          <h2 className={DashboardCss.welcome}>Reservations</h2>
          <h4 className={DashboardCss.fromP}>0</h4>
          <p className={DashboardCss.addManWal}>Mange</p>
        </Col>

        <Col md={4}>
          <h2 className={DashboardCss.welcome}>Earnings</h2>
          <h4 className={DashboardCss.fromP}>From $0</h4>
          <p className={DashboardCss.addManWal}>Wallet</p>
        </Col>
      </Row>
    </Container>

    <Container>

      <h3 className={DashboardCss.reservation}>My Reservations</h3>

      <Table responsive className={DashboardCss.bodyRow}>
        <thead className={DashboardCss.heading}>
          <tr className={DashboardCss.tableHead}>
            <th className={DashboardCss.blank}></th>
            <th className={DashboardCss.id}>ID</th>
            <th className={DashboardCss.status}>Status</th>
            <th className={DashboardCss.date}>Date</th>
            <th className={DashboardCss.address}>Address</th>
            <th className={DashboardCss.checkin}>Check-in</th>
            <th className={DashboardCss.checkout}>Check-out</th>
            <th className={DashboardCss.guest}>Guests</th>
            <th className={DashboardCss.pet}>Pets</th>
            <th className={DashboardCss.subtotal}>Subtotal</th>
            <th className={DashboardCss.action}>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className={DashboardCss.tableRow}>
            <td className={DashboardCss.imgChild}>
              <Image
                src={Profile}
                alt='Profile'
                fill className={DashboardCss.imageChild}>
              </Image>
            </td>

            <td>#66628</td>
            <td><Button className={DashboardCss.under}>Under Review</Button></td>
            <td>April 6, 20237:38 am</td>
            <td><span className={DashboardCss.oldTown}> Old Town’s Farm to Table </span>
              6826 E 5th St, Scottsdale, Arizona, United States</td>
            <td>05-16-2023 Stay</td>
            <td>05-20-2023 Stay</td>
            <td>5 Stay</td>
            <td>Yes</td>
            <td className={DashboardCss.form}>From $6,386.06</td>
            <td><Button className={DashboardCss.detailBtn}>Details</Button></td>
          </tr>


          <tr className={DashboardCss.tableRow}>
            <td className={DashboardCss.imgChild}>
              <Image
                src={Profile}
                alt='Profile'
                fill className={DashboardCss.imageChild}>
              </Image>
            </td>

            <td>#66612</td>
            <td><Button className={DashboardCss.Completed}>Completed</Button></td>
            <td>April 6, 20237:38 am</td>
            <td><span className={DashboardCss.oldTown}> Old Town’s Farm to Table </span>
              6826 E 5th St, Scottsdale, Arizona, United States</td>
            <td>05-16-2023 Stay</td>
            <td>05-20-2023 Stay</td>
            <td>5 Stay</td>
            <td>No</td>
            <td className={DashboardCss.dollar}>From $6,386.06</td>
            <td><Button className={DashboardCss.detailBtn}>Details</Button></td>
          </tr>


          <tr className={DashboardCss.tableRow}>
            <td className={DashboardCss.imgChild}>
              <Image
                src={Profile}
                alt='Profile'
                fill className={DashboardCss.imageChild}>
              </Image>
            </td>

            <td>#66629</td>
            <td><Button className={DashboardCss.expired}>Expired</Button></td>
            <td>April 6, 20237:38 am</td>
            <td><span className={DashboardCss.oldTown}> Old Town’s Farm to Table </span>
              6826 E 5th St, Scottsdale, Arizona, United States</td>
            <td>05-16-2023 Stay</td>
            <td>05-20-2023 Stay</td>
            <td>5 Stay</td>
            <td>Yes</td>
            <td className={DashboardCss.dollar}>From $6,386.06</td>
            <td><Button className={DashboardCss.detailBtn}>Details</Button></td>
          </tr>

        </tbody>

      </Table>
    </Container>

    {/* ------------------------------        GOLFING AND TRAVELING     ------------------------  */}

    <Container className={DashboardCss.ads}>
      <h2 className={DashboardCss.adsTitle}>
        Golfing and Traveling, Both Better with Friends
      </h2>

      <Advertise ads={ads} />
    </Container>

    {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

    <BottomSection />
  </>;
}

export default index;
