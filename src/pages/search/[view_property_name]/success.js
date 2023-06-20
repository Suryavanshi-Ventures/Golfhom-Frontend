import Image from "next/image";
import React from "react";
import { Button, Container, Row } from "react-bootstrap";
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
          <hr />
          <h4 className={Checkout2Css.transaction}>
            Transaction ID :{" "}
            {UrlParams.query.transaction_id
              ? UrlParams.query.transaction_id
              : "N/A"}
          </h4>
          <hr />
          <div className={Checkout2Css.total_payed_transaction}>
            <h5 className={Checkout2Css.amount_master}>Total Amount Paid</h5>
            <h5 className={Checkout2Css.amount_master}>
              $
              {UrlParams.query.payment_amount
                ? UrlParams.query.payment_amount / 100
                : "N/A"}
            </h5>
          </div>
          <hr />
          <div className={Checkout2Css.total_payed_transaction}>
            <h5 className={Checkout2Css.amount_master}>Payment Method</h5>
            <h5 className={Checkout2Css.amount_master}>
              {UrlParams.query.payment_method
                ? UrlParams.query.payment_method
                : "N/A"}
            </h5>
          </div>
          <hr />
          <div className={Checkout2Css.total_payed_transaction}>
            <h5 className={Checkout2Css.amount_master}>Transaction Date</h5>
            <h5 className={Checkout2Css.amount_master}>
              {moment().format("MM-DD-YYYY  hh:mm A")}
            </h5>
          </div>
          <hr />

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
