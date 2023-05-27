import Image from 'next/image'
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SuccessfullyGif from "../../../../public/images/vector/successfully-done.gif";
import Checkout2Css from "../../../styles/Checkout2.module.css";

const Checkout2 = () => {
    return (
        <>
            <Container className={Checkout2Css.grand}>
                <Row className={Checkout2Css.parentRow}>
                    <div className={Checkout2Css.gifParent}>
                        <Image
                            src={SuccessfullyGif}
                            alt='SuccessfullyGif'
                            width={270}
                            height={262}
                            className={Checkout2Css.gifChild}
                        />
                    </div>

                    <h2 className={Checkout2Css.payment}>Payment Successful</h2>

                    <h5 className={Checkout2Css.payment_discription}>Your payment has been processed
                        <br />
                        and its successfully  send to the receiver bank</h5>

                    <hr />

                    <h4 className={Checkout2Css.transaction}>Transaction Number :  123456789</h4>

                    <div className={Checkout2Css.total_payed_transaction}>
                        <h5 className={Checkout2Css.amount_master}>Total Amount Paid</h5>
                        <h5 className={Checkout2Css.amount_master}>$ 500</h5>
                    </div>

                    <hr />

                    <div className={Checkout2Css.total_payed_transaction}>
                        <h5 className={Checkout2Css.amount_master}>Payed By</h5>
                        <h5 className={Checkout2Css.amount_master}>Master Card</h5>
                    </div>

                    <hr />

                    <div className={Checkout2Css.total_payed_transaction}>
                        <h5 className={Checkout2Css.amount_master}>Transaction Date</h5>
                        <h5 className={Checkout2Css.amount_master}>25/05/2023   10:38 am</h5>
                    </div>

                    <hr />

                </Row>

            </Container>
        </>
    )
}

export default Checkout2
