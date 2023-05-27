import { React, useContext } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import CheckoutCss from "../../../styles/Checkout.module.css";

const Checkout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log("PROPS DATA", props.data[0]);
  const ContextUserDetails = useContext(AuthContext);

  const BookingHotelDone = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/search/view_property/success",
      },
    });

    if (error?.code) {
      message.error(error.message);
    } else if (error === undefined && paymentIntent) {
      const BookingRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
        {
          propertyId: props.data[0].id,
          from: props.data[1],
          to: props.data[2],
          guest: props.data[0].accomodation,
          children: 5,
          paymentIntent: paymentIntent.id,
          pets: true,
        },
        {
          headers: {
            Authorization: `Bearer ${ContextUserDetails.UserState}`,
          },
        }
      );
      if (BookingRes.status === 200) {
        console.log("RESPONSE BOOKING API ", BookingRes);
      }
    }

    console.log("ERROR - Stripe", error);
    // message.error(error?.message);
  };

  return (
    <>
      <div className={CheckoutCss.checkout_btn_main_div}>
        <div className={CheckoutCss.checkout_btn_div}>
          <Button
            className={CheckoutCss.checkout_btn}
            onClick={BookingHotelDone}
          >
            Pay
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
