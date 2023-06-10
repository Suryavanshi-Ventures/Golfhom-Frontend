import { React, useEffect, useState, useContext, Suspense } from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.png";
import ProtectedRoute from "../../../common components/protected_route";
import Image from "next/image";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import DashboardCss from "../../styles/dashboard/DashboardIndex.module.css";
import Profile from "../../../public/images/vector/profile.svg";
import Advertise from "../../advertise";
import ads from "../json/ads.json";
import Head from "next/head";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import Loader from "../../../common components/loader";
import moment from "moment";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Index = () => {
  const ContextUserDetails = useContext(AuthContext);
  const [UserName, SetUserName] = useState("");
  const [BookingData, setBookingData] = useState([{}]);

  useEffect(() => {
    if (!UserName) {
      SetUserName(
        sessionStorage.getItem("Uname") || localStorage.getItem("Uname")
      );
    }

    const Token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    const GetBookingData = async () => {
      try {
        const BookingDataResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (BookingDataResponse.status === 200) {
          setBookingData(BookingDataResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    GetBookingData();
  }, [UserName]);

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
          <Row>
            <h3 className={DashboardCss.welcome}>
              Welcome back,{" "}
              {UserName
                ? UserName.charAt(0).toUpperCase() + UserName.slice(1)
                : "Anyonums "}
            </h3>
          </Row>
          <hr />

          <Row>
            <Col md={4}>
              <h4 className={DashboardCss.welcome}>Listings</h4>
              <h5 className={DashboardCss.fromP}>0</h5>
              <p className={DashboardCss.addManWal}>Add new</p>
            </Col>

            <Col md={4}>
              <h4 className={DashboardCss.welcome}>Reservations</h4>
              <h4 className={DashboardCss.fromP}>0</h4>
              <p className={DashboardCss.addManWal}>Mange</p>
            </Col>

            <Col md={4}>
              <h4 className={DashboardCss.welcome}>Earnings</h4>
              <h4 className={DashboardCss.fromP}>From $0</h4>
              <p className={DashboardCss.addManWal}>Wallet</p>
            </Col>
          </Row>
        </Container>

        <Container>
          <h4 className={DashboardCss.reservation}>My Reservations</h4>

          {BookingData.length === 0 ? (
            <div className={DashboardCss.loader_main_div}>
              <Loader />
            </div>
          ) : (
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
                {BookingData.map((data, index) => {
                  return (
                    <tr key={index} className={DashboardCss.tableRow}>
                      <td className={DashboardCss.imgChild}>
                        <Image
                          src={Profile}
                          alt="Profile"
                          fill
                          className={DashboardCss.imageChild}
                        ></Image>
                      </td>

                      <td>#{data.id}</td>
                      <td>
                        <Button className={DashboardCss.under}>
                          Under Review
                        </Button>
                      </td>
                      <td>{moment(data.createdAt).format("MM-DD-YYYY")}</td>
                      <td>
                        <span className={DashboardCss.oldTown}>
                          {" "}
                          Old Town’s Farm to Table{" "}
                        </span>
                        6826 E 5th St, Scottsdale, Arizona, United States
                      </td>
                      <td>{moment(data.from).format("MM-DD-YYYY")} Stay</td>
                      <td>{moment(data.to).format("MM-DD-YYYY")} Stay</td>
                      <td>{data.guest} Stay</td>
                      <td>Yes</td>
                      <td className={DashboardCss.form}>
                        From ${data.amount ? data.amount : "N/A"}
                      </td>
                      <td>
                        <Button className={DashboardCss.detailBtn}>
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Container>

        {/* ------------------------------        GOLFING AND TRAVELING     ------------------------  */}

        <Container className={DashboardCss.ads}>
          <h3 className={DashboardCss.adsTitle}>
            Golfing and Traveling, Both Better with Friends
          </h3>

          <Advertise ads={ads} />
        </Container>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </ProtectedRoute>
    </>
  );
};

export default Index;
