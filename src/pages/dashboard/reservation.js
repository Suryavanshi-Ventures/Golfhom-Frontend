import { useState, useEffect, useContext } from "react";
import ReservationCss from "../../styles/dashboard/Reservation.module.css";
import Image from "next/image";
import { Container, Table } from "react-bootstrap";
import Profile from "../../../public/images/vector/profile.svg";
import Head from "next/head";
import ProtectedRoute from "../../../common components/protected_route";
import dynamic from "next/dynamic";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import NoReservation from "../../../public/images/vector/golf-hole.png";
import dayjs from "dayjs";
import { Pagination } from "antd";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);

const Reservation = () => {
  const ContextUserDetails = useContext(AuthContext);
  const [AllBookingData, setAllBookingData] = useState([{}]);
  const [PaginationState, setPaginationState] = useState(1);
  const [TotalDataCount, setTotalDataCount] = useState(0);

  useEffect(() => {
    console.log(ContextUserDetails.UserState, "CONTAXT DETAILS");
    const GetAllBookings = async () => {
      try {
        const GetAllBookingRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/booking/getMyBooking?limit=10&page=${PaginationState}`,
          {
            headers: {
              Authorization: `Bearer ${ContextUserDetails.UserState}`,
            },
          }
        );

        if (GetAllBookingRes.status === 200) {
          setAllBookingData(GetAllBookingRes.data.data);
          setTotalDataCount(GetAllBookingRes.data.count);
          console.log(GetAllBookingRes.data.data, "MY BOOKING DATA");
        }
      } catch (error) {
        console.log(error, "ERROR IN GET ALL BOOKINGS");
      }
    };
    GetAllBookings();

    return () => {};
  }, [ContextUserDetails, PaginationState]);

  const OnPaginationChange = (e) => {
    console.log(e);
    setPaginationState(e);
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Reservation</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className={ReservationCss.my_reservation_main_section}>
          {/*   -------------------------     BANNER IMAGE   -------------------------------   */}
          <div>
            <Image
              fill
              className={ReservationCss.banner_img}
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/faq_banner_img.png"
              alt="faq golfhom banner image"
            ></Image>
          </div>

          {/*     -------------------------     TEXT AREA      ----------------------------    */}

          <Container>
            <h3 className={ReservationCss.reservation}>Reservations</h3>

            {/* <h4 className={ReservationCss.manage}>Manage</h4> */}

            <Table border={1} responsive className={ReservationCss.bodyRow}>
              <thead className={ReservationCss.heading}>
                <tr className={ReservationCss.tableHead}>
                  <th className={ReservationCss.blank}>#</th>
                  <th className={ReservationCss.id}>ID</th>
                  <th className={ReservationCss.status}>Status</th>
                  <th className={ReservationCss.date}>Date</th>
                  <th className={ReservationCss.address}>Address</th>
                  <th className={ReservationCss.checkin}>Check-in</th>
                  <th className={ReservationCss.checkout}>Check-out</th>
                  <th className={ReservationCss.guest}>Guests</th>
                  <th className={ReservationCss.pet}>Pets</th>
                  <th className={ReservationCss.subtotal}>Subtotal</th>
                  {/* <th className={ReservationCss.action}>Actions</th> */}
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
                        className={ReservationCss.no_reservation_img}
                      ></Image>
                      <p className={ReservationCss.no_reservation_text}>
                        No Reservation!
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {AllBookingData.map((Data, Index) => {
                    return (
                      <tr key={Index} className={ReservationCss.tableRow}>
                        <td
                          className={ReservationCss.reservation_table_td_others}
                        >
                          <Image
                            src={Profile}
                            alt="Profile"
                            height={30}
                            width={30}
                            className={ReservationCss.imgChild}
                          ></Image>
                        </td>

                        <td
                          className={ReservationCss.reservation_table_td_others}
                        >
                          #{Data?.Property?.externalPropertyId}
                        </td>

                        {Data.isCanceled === true ? (
                          <td className={ReservationCss.reservation_table_td}>
                            <span className={ReservationCss.expired}>
                              Canceled
                            </span>
                          </td>
                        ) : (
                          <td className={ReservationCss.reservation_table_td}>
                            <span className={ReservationCss.Completed}>
                              Confirmed
                            </span>
                          </td>
                        )}

                        <td className={ReservationCss.reservation_table_td}>
                          {dayjs(Data.createdAt).format("MM-DD-YYYY")}
                        </td>
                        <td className={ReservationCss.reservation_table_td}>
                          <span className={ReservationCss.oldTown}>
                            {" "}
                            Old Town’s Farm to Table{" "}
                          </span>
                          6826 E 5th St, Scottsdale, Arizona, United States
                        </td>
                        <td className={ReservationCss.reservation_table_td}>
                          {dayjs(Data.from).format("MM-DD-YYYY")}
                        </td>
                        <td className={ReservationCss.reservation_table_td}>
                          {dayjs(Data.to).format("MM-DD-YYYY")}
                        </td>
                        <td className={ReservationCss.reservation_table_td}>
                          {Data.guest}
                        </td>
                        <td className={ReservationCss.reservation_table_td}>
                          {Data.pets > 0 ? "Yes" : "No"}
                        </td>
                        <td className={ReservationCss.table_date}>
                          ${Data.amount}
                        </td>
                        {/* <td>
                          <Button className={ReservationCss.detailBtn}>Details</Button>
                         </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
            <div className={ReservationCss.pagination_container}>
              <Pagination
                current={PaginationState}
                colorText="#FF0000"
                showQuickJumper={false}
                showSizeChanger={false}
                defaultCurrent={1}
                total={TotalDataCount}
                onChange={OnPaginationChange}
                className={ReservationCss.pagination}
              />
            </div>
          </Container>
        </section>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </ProtectedRoute>
    </>
  );
};

export default Reservation;
