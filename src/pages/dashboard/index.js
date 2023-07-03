import { useEffect, useState, useContext } from "react";
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
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Link from "next/link";
import NoReservation from "../../../public/images/vector/golf-hole.png";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Index = () => {
  const ContextUserDetails = useContext(AuthContext);
  const [UserName, SetUserName] = useState("");
  const [AllBookingData, setAllBookingData] = useState([{}]);
  const [TotalDataCount, setTotalDataCount] = useState(0);

  useEffect(() => {
    if (!UserName) {
      SetUserName(
        sessionStorage.getItem("Uname") || localStorage.getItem("Uname")
      );
    }
    console.log(ContextUserDetails.UserState, "CONTAXT DETAILS");
    const GetAllBookings = async () => {
      try {
        const GetAllBookingRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/booking/getMyBooking?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${ContextUserDetails.UserState}`,
            },
          }
        );

        if (GetAllBookingRes.status === 200) {
          setAllBookingData(GetAllBookingRes.data.data);
          setTotalDataCount(GetAllBookingRes.data.count);
        }
      } catch (error) {
        console.log(error, "ERROR IN GET ALL BOOKINGS");
      }
    };
    GetAllBookings();
  }, [UserName, ContextUserDetails]);

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
        <div>
          <Image
            fill
            className={DashboardCss.banner_img}
            src="https://golf-hom-latest-assets.s3.amazonaws.com/images/faq_banner_img.png"
            alt="faq golfhom banner image"
          ></Image>
        </div>

        {/*     -------------------------     TEXT AREA      ----------------------------    */}

        <Container className={DashboardCss.introParent}>
          <Row>
            <h3 className={DashboardCss.title_words}>
              Welcome back,{" "}
              {UserName
                ? UserName.charAt(0).toUpperCase() + UserName.slice(1)
                : "Anyonums "}
            </h3>
          </Row>
          <hr />

          <Row style={{ justifyContent: "center" }}>
            <Col md={4}>
              <h4 className={DashboardCss.title_words}>Total Reservations</h4>
              <h4 className={DashboardCss.price}>{TotalDataCount}</h4>
            </Col>
          </Row>
        </Container>

        <Container>
          <h4 className={DashboardCss.reservation}>My Reservations</h4>

          <Table border={1} responsive className={DashboardCss.bodyRow}>
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
                {/* <th className={DashboardCss.action}>Actions</th> */}
              </tr>
            </thead>

            {AllBookingData.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={11} style={{ textAlign: "center" }}>
                    <Image
                      width={70}
                      height={70}
                      src={NoReservation}
                      alt="No Reservation!"
                      className={DashboardCss.no_reservation_img}
                    ></Image>
                    <p className={DashboardCss.no_reservation_text}>
                      No Reservation!
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {AllBookingData.map((Data, Index) => {
                  return (
                    <tr key={Index} className={DashboardCss.tableRow}>
                      <td className={DashboardCss.reservation_table_td_others}>
                        <Image
                          src={Profile}
                          alt="Profile"
                          width={30}
                          height={30}
                          // className={DashboardCss.imgChild}
                        ></Image>
                      </td>

                      <td className={DashboardCss.reservation_table_td_others}>
                        #{Data?.Property?.externalPropertyId}
                      </td>

                      {Data.isCanceled === true ? (
                        <td className={DashboardCss.reservation_table_td}>
                          <span className={DashboardCss.expired}>Canceled</span>
                        </td>
                      ) : (
                        <td className={DashboardCss.reservation_table_td}>
                          <span className={DashboardCss.Completed}>
                            Confirmed
                          </span>
                        </td>
                      )}

                      <td className={DashboardCss.reservation_table_td}>
                        {dayjs(Data.createdAt).format("MM-DD-YYYY")}
                      </td>
                      <td className={DashboardCss.reservation_table_td}>
                        <span className={DashboardCss.oldTown}>
                          {" "}
                          Old Town’s Farm to Table{" "}
                        </span>
                        6826 E 5th St, Scottsdale, Arizona, United States
                      </td>
                      <td className={DashboardCss.reservation_table_td}>
                        {dayjs(Data.from).format("MM-DD-YYYY")}
                      </td>
                      <td className={DashboardCss.reservation_table_td}>
                        {dayjs(Data.to).format("MM-DD-YYYY")}
                      </td>
                      <td className={DashboardCss.reservation_table_td}>
                        {Data.guest}
                      </td>
                      <td className={DashboardCss.reservation_table_td}>
                        {Data.pets > 0 ? "Yes" : "No"}
                      </td>
                      <td className={DashboardCss.table_date}>
                        ${Data.amount}
                      </td>
                      {/* <td>
                          <Button className={DashboardCss.detailBtn}>Details</Button>
                         </td> */}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>

          {TotalDataCount > 5 ? (
            <div className={DashboardCss.show_more_btn_div}>
              <Link
                className={DashboardCss.show_more_btn_a}
                href={"dashboard/reservation"}
              >
                <Button className={DashboardCss.show_more_btn}>
                  Show More
                </Button>
              </Link>
            </div>
          ) : (
            ""
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
