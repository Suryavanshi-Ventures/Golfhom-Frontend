import React, { useState } from 'react'
import FAQBannerImg from "../../../public/images/faq_banner_img.svg";
import BottomSection from "../../../common components/bottomGroup";
import InvoiceCss from "../../styles/dashboard/Invoices.module.css";
import Image from 'next/image';
import { Container, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nextimg from "../../../public/images/vector/next.svg";

const Invoice = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            {/*  -------------------------         BANNER IMAGE FAQ         ------------------------------*/}
            <div className={InvoiceCss.banner_img_container}>
                <Image
                    fill
                    className={InvoiceCss.banner_img}
                    src={FAQBannerImg}
                    alt="faq golfhom banner image"
                ></Image>
            </div>


            {/*     -------------------------     TEXT AREA      ----------------------------    */}

            <Container>
                <h2 className={InvoiceCss.invoices}>Invoices</h2>

                <h3 className={InvoiceCss.manage}>Manage</h3>

            </Container>

            <section className={InvoiceCss.backgroundLight}>
                <Container>
                    <Table responsive>
                        <thead className={InvoiceCss.heading}>
                            <tr className={InvoiceCss.tableHead}>
                                <th className={InvoiceCss.start}>Start date</th>
                                <th className={InvoiceCss.end}>End date</th>
                                <th className={InvoiceCss.type}>Type</th>
                                <th className={InvoiceCss.price}>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className={InvoiceCss.tableRow}>
                                <td>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="April 12,2023"
                                        showMonthYearPicker
                                        className={InvoiceCss.colA}
                                    />
                                </td>

                                <td>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="April 12,2023"
                                        showMonthYearPicker
                                        className={InvoiceCss.colB}
                                    />
                                </td>

                                <td>
                                    <select id="my-dropdown" value={selectedOption} onChange={handleOptionChange}
                                        className={InvoiceCss.colC}>
                                        <option value="number">Reservation Fee</option>
                                        <option value="number">500</option>
                                        <option value="number">800</option>
                                    </select>
                                </td>

                                <td>
                                    <select id="my-dropdown" value={selectedOption} onChange={handleOptionChange}
                                        className={InvoiceCss.colD}>
                                        <option value="number">Paid</option>
                                        <option value="number">900</option>
                                        <option value="number">1000</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </section>

            <Container className={InvoiceCss.tableB}>

                <Table responsive>
                    <thead className={InvoiceCss.headingB}>
                        <tr className={InvoiceCss.tableHead}>
                            <th className={InvoiceCss.order}>Order</th>
                            <th className={InvoiceCss.date}>Date</th>
                            <th className={InvoiceCss.bilfor}>Billing for</th>
                            <th className={InvoiceCss.biltyp}>Billing Type</th>
                            <th className={InvoiceCss.status}>Status</th>
                            <th className={InvoiceCss.pay}>Payment Method</th>
                            <th className={InvoiceCss.total}>Total</th>
                            <th className={InvoiceCss.action}>Actions</th>
                        </tr>
                    </thead>

                    <tbody className={InvoiceCss.tableRow}>
                        <tr className={InvoiceCss.tableHead}>
                            <td className={InvoiceCss.order}>#66628</td>
                            <td>April 12,2023</td>
                            <td>Hotel Empire Moscow Sokoliki</td>
                            <td>Reservation Fee</td>
                            <td>Paid</td>
                            <td>Online</td>
                            <td>From $6,386.06</td>
                            <td>
                                <div className={InvoiceCss.imageParent}>
                                    <Image
                                        src={Nextimg}
                                        alt='Next Image'
                                        fill
                                        className={InvoiceCss.imgChild}
                                    />
                                </div>
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

export default Invoice
