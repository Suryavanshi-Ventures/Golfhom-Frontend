import Image from "next/image";
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import SuccessfullyGif from "../../../../public/images/vector/successfully-done.gif";
import Checkout2Css from "../../../styles/Checkout2.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";

const Success = () => {
  const UrlParams = useRouter();
  console.log(UrlParams);

  return (
    <>
      <Head>
        <title>Golfhom | Payment Confirm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={Checkout2Css.grand}>
        <Row className={Checkout2Css.parentRow}>
          <div className={Checkout2Css.gifParent}>
            <Image
              src={SuccessfullyGif}
              alt="SuccessfullyGif"
              width={270}
              height={262}
              className={Checkout2Css.gifChild}
            />
          </div>
          <h2 className={Checkout2Css.payment}>Payment Successful</h2>
          <h5 className={Checkout2Css.payment_discription}>
            Your payment has been processed
            <br />
            successfully!
          </h5>

          {/* BOOKING DETAILS COL */}
          <Col md={5} className={Checkout2Css.details_main_cols}>
            <h4 className={Checkout2Css.transaction}>Booking Details</h4>
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Hotel Name</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.hotel_name
                  ? UrlParams.query.hotel_name
                  : "N/A"}
              </h5>
            </div>
            <hr />
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>From</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.from_date ? UrlParams.query.from_date : "N/A"}
              </h5>
            </div>
            <hr />
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>To</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.to_date ? UrlParams.query.to_date : "N/A"}
              </h5>
            </div>
            <hr />
            <div>
              <div className={Checkout2Css.total_payed_transaction}>
                <h5 className={Checkout2Css.amount_master}>Adults</h5>
                <h5 className={Checkout2Css.details_text_value}>
                  {UrlParams.query.adult ? UrlParams.query.adult : 0}
                </h5>
              </div>

              <div className={Checkout2Css.total_payed_transaction}>
                <h5 className={Checkout2Css.amount_master}>Children</h5>
                <h5 className={Checkout2Css.details_text_value}>
                  {UrlParams.query.children ? UrlParams.query.children : 0}
                </h5>
              </div>
              <div className={Checkout2Css.total_payed_transaction}>
                <h5 className={Checkout2Css.amount_master}>Babies</h5>
                <h5 className={Checkout2Css.details_text_value}>
                  {UrlParams.query.babies ? UrlParams.query.babies : 0}
                </h5>
              </div>
              <div className={Checkout2Css.total_payed_transaction}>
                <h5 className={Checkout2Css.amount_master}>Pets</h5>
                <h5 className={Checkout2Css.details_text_value}>
                  {UrlParams.query.pets ? UrlParams.query.pets : 0}
                </h5>
              </div>
            </div>
            <hr />
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Total Guests</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.total_guests
                  ? UrlParams.query.total_guests
                  : 0}
              </h5>
            </div>
          </Col>
          {/* PAYMENT DETAILS COL */}
          <Col md={5} className={Checkout2Css.details_main_cols}>
            <h4 className={Checkout2Css.transaction}>Payment Details</h4>

            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Booking ID</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.transaction_id
                  ? UrlParams.query.transaction_id
                  : "N/A"}
              </h5>
            </div>
            <hr />

            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Booking Number</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.booking_number
                  ? UrlParams.query.booking_number
                  : "N/A"}
              </h5>
            </div>

            <hr />
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Payment Method</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {UrlParams.query.payment_method
                  ? UrlParams.query.payment_method.charAt(0).toUpperCase() +
                    UrlParams.query.payment_method.slice(1)
                  : "N/A"}
              </h5>
            </div>
            <hr />
            <div className={Checkout2Css.total_payed_transaction}>
              <h5 className={Checkout2Css.amount_master}>Transaction Date</h5>
              <h5 className={Checkout2Css.details_text_value}>
                {moment().format("MM-DD-YYYY  hh:mm A")}
              </h5>
            </div>
          </Col>

          <div className={Checkout2Css.go_to_dashboard_div}>
            <Button
              className={Checkout2Css.go_to_dashboard_button}
              onClick={(e) => {
                UrlParams.push({
                  pathname: `/dashboard`,
                });
              }}
            >
              My Reservations
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Success;
