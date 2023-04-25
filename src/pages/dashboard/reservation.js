import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import ReservationCss from "../../styles/dashboard/Reservation.module.css";
import Image from 'next/image';
import { Button, Container, Table } from 'react-bootstrap';
import Profile from "../../../public/images/vector/profile.svg";

const Reservation = () => {
    return (
        <>
            {/*   -------------------------     BANNER IMAGE   -------------------------------   */}
            <div className={ReservationCss.banner_img_container}>
                <Image
                    fill
                    className={ReservationCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*     -------------------------     TEXT AREA      ----------------------------    */}

            <Container>
                <h2 className={ReservationCss.reservation}>Reservations</h2>

                <h3 className={ReservationCss.manage}>Manage</h3>

                <Table responsive className={ReservationCss.bodyRow}>
                    <thead className={ReservationCss.heading}>
                        <tr className={ReservationCss.tableHead}>
                            <th className={ReservationCss.blank}></th>
                            <th className={ReservationCss.id}>ID</th>
                            <th className={ReservationCss.status}>Status</th>
                            <th className={ReservationCss.date}>Date</th>
                            <th className={ReservationCss.address}>Address</th>
                            <th className={ReservationCss.checkin}>Check-in</th>
                            <th className={ReservationCss.checkout}>Check-out</th>
                            <th className={ReservationCss.guest}>Guests</th>
                            <th className={ReservationCss.pet}>Pets</th>
                            <th className={ReservationCss.subtotal}>Subtotal</th>
                            <th className={ReservationCss.action}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className={ReservationCss.tableRow}>
                            <td className={ReservationCss.imgChild}>
                                <Image
                                    src={Profile}
                                    alt='Profile'
                                    fill className={ReservationCss.imageChild}>
                                </Image>
                            </td>

                            <td>#66628</td>
                            <td><Button className={ReservationCss.under}>Under Review</Button></td>
                            <td>April 6, 20237:38 am</td>
                            <td><span className={ReservationCss.oldTown}> Old Town’s Farm to Table </span>
                                6826 E 5th St, Scottsdale, Arizona, United States</td>
                            <td>05-16-2023 Stay</td>
                            <td>05-20-2023 Stay</td>
                            <td>5 Stay</td>
                            <td>Yes</td>
                            <td className={ReservationCss.form}>From $6,386.06</td>
                            <td><Button className={ReservationCss.detailBtn}>Details</Button></td>
                        </tr>


                        <tr className={ReservationCss.tableRow}>
                            <td className={ReservationCss.imgChild}>
                                <Image
                                    src={Profile}
                                    alt='Profile'
                                    fill className={ReservationCss.imageChild}>
                                </Image>
                            </td>

                            <td>#66612</td>
                            <td><Button className={ReservationCss.Completed}>Completed</Button></td>
                            <td>April 6, 20237:38 am</td>
                            <td><span className={ReservationCss.oldTown}> Old Town’s Farm to Table </span>
                                6826 E 5th St, Scottsdale, Arizona, United States</td>
                            <td>05-16-2023 Stay</td>
                            <td>05-20-2023 Stay</td>
                            <td>5 Stay</td>
                            <td>No</td>
                            <td className={ReservationCss.dollar}>From $6,386.06</td>
                            <td><Button className={ReservationCss.detailBtn}>Details</Button></td>
                        </tr>


                        <tr className={ReservationCss.tableRow}>
                            <td className={ReservationCss.imgChild}>
                                <Image
                                    src={Profile}
                                    alt='Profile'
                                    fill className={ReservationCss.imageChild}>
                                </Image>
                            </td>

                            <td>#66629</td>
                            <td><Button className={ReservationCss.expired}>Expired</Button></td>
                            <td>April 6, 20237:38 am</td>
                            <td><span className={ReservationCss.oldTown}> Old Town’s Farm to Table </span>
                                6826 E 5th St, Scottsdale, Arizona, United States</td>
                            <td>05-16-2023 Stay</td>
                            <td>05-20-2023 Stay</td>
                            <td>5 Stay</td>
                            <td>Yes</td>
                            <td className={ReservationCss.dollar}>From $6,386.06</td>
                            <td><Button className={ReservationCss.detailBtn}>Details</Button></td>
                        </tr>

                    </tbody>

                </Table>
            </Container>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Reservation
