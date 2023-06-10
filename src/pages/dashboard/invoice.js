import React, { useState, Suspense } from "react";
import FAQBannerImg from "../../../public/images/faq_banner_img.png";
import InvoiceCss from "../../styles/dashboard/Invoices.module.css";
import Image from "next/image";
import { Container, Table } from "react-bootstrap";
import Nextimg from "../../../public/images/vector/next.svg";
import Head from "next/head";
import { Space, Typography, DatePicker, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProtectedRoute from "../../../common components/protected_route";
import Link from "next/link";
import moment from "moment";
import "moment/locale/en-gb";
moment.locale("en-gb");
import dynamic from "next/dynamic";
const dateFormat = "MMMM D,YYYY";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);

const Invoice = () => {
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | Invoice</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

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
          <h3 className={InvoiceCss.invoices}>Invoices</h3>

          <h4 className={InvoiceCss.manage}>Manage</h4>
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
                    <div className={InvoiceCss.dateParent}>
                      <DatePicker
                        placeholder="Start date"
                        showToday={false}
                        format={dateFormat}
                        size="large"
                        className={InvoiceCss.inner_input_date_picker}
                      />
                    </div>
                  </td>

                  <td>
                    <div className={InvoiceCss.dateParent}>
                      <DatePicker
                        placeholder="End date"
                        showToday={false}
                        format={dateFormat}
                        size="large"
                        className={InvoiceCss.inner_input_date_picker}
                      />
                    </div>
                  </td>

                  <td>
                    <Select
                      defaultValue=" Marmot Ridge Golf Course"
                      options={[
                        {
                          value: "Any",
                          label: "Any",
                        },
                        {
                          value: "Reservation Fee",
                          label: "Reservation Fee",
                        },
                        {
                          value: "Upgrade to Featured",
                          label: "Upgrade to Featured",
                        },
                      ]}
                      trigger={["click"]}
                      // className={InvoiceCss.colB}
                      size="large"
                    >
                      <Select.Option onClick={(e) => e.preventDefault()}>
                        <Typography.Link>
                          <Space
                            className={
                              InvoiceCss.search_by_golf_input_search_by_tourni
                            }
                          >
                            Reservation Fee
                            <DownOutlined />
                          </Space>
                        </Typography.Link>
                      </Select.Option>
                    </Select>
                  </td>

                  <td>
                    <Select
                      defaultValue=" Marmot Ridge Golf Course"
                      options={[
                        {
                          value: "Any",
                          label: "Any",
                        },
                        {
                          value: "Paid",
                          label: "Paid",
                        },
                        {
                          value: "Not Paid",
                          label: "Not Paid",
                        },
                      ]}
                      trigger={["click"]}
                      // className={InvoiceCss.colB}
                      size="large"
                    >
                      <Select.Option onClick={(e) => e.preventDefault()}>
                        <Typography.Link>
                          <Space
                            className={
                              InvoiceCss.search_by_golf_input_search_by_tourni
                            }
                          >
                            Paid
                            <DownOutlined />
                          </Space>
                        </Typography.Link>
                      </Select.Option>
                    </Select>
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
                      alt="Next Image"
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
      </ProtectedRoute>
    </>
  );
};

export default Invoice;
