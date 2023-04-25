import React from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import FavoritesCss from "../../styles/dashboard/Favorites.module.css";
import Image from 'next/image';
import { Button, Container, Table } from 'react-bootstrap';
import Delete from "../../../public/images/vector/delete.svg";
import Nextimg from "../../../public/images/vector/next.svg";
import golfhom from "../../../public/images/vector/golfhom.svg";

const Favorites = () => {
    return (
        <>
            {/* BANNER IMAGE FAQ */}
            <div className={FavoritesCss.banner_img_container}>
                <Image
                    fill
                    className={FavoritesCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>

            {/*     -------------------------     TEXT AREA      ----------------------------    */}

            <Container>
                <h2 className={FavoritesCss.reservation}>Reservations</h2>

                <h3 className={FavoritesCss.manage}>Manage</h3>

                <Table responsive className={FavoritesCss.bodyRow}>
                    <thead className={FavoritesCss.heading}>
                        <tr className={FavoritesCss.tableHead}>
                            <th className={FavoritesCss.thum}>Thumbnail</th>
                            <th className={FavoritesCss.add}>Address</th>
                            <th className={FavoritesCss.type}>Type</th>
                            <th className={FavoritesCss.price}>Price</th>
                            <th className={FavoritesCss.bed}>Bedrooms</th>
                            <th className={FavoritesCss.bath}>Baths</th>
                            <th className={FavoritesCss.guest}>Guests</th>
                            <th className={FavoritesCss.action}>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        <tr className={FavoritesCss.tableRow}>
                            <td><Image className={FavoritesCss.golfhom}
                                src={golfhom}
                                alt='golfhom'
                                fill
                            /></td>
                            <td><span className={FavoritesCss.oldTown}> Old Town’s Farm to Table </span>
                                6826 E 5th St, Scottsdale, Arizona, United States</td>
                            <td>Villa</td>
                            <td className={FavoritesCss.form}>From $435.69/Night</td>
                            <td>4</td>
                            <td>3</td>
                            <td>10</td>
                            <td>
                                <Image
                                    src={Delete}
                                    alt='Delete'
                                    fill
                                    className={FavoritesCss.imgChild}
                                />

                                <Image
                                    src={Nextimg}
                                    alt='Next Image'
                                    fill
                                    className={FavoritesCss.imgChild}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Favorites
