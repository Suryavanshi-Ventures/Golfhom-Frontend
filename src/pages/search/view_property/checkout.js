import React from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import Head from "next/head";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_TEST_KEY}`
  );

  const BookingHotelDone = async () => {
    // const BookingRes = axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
    //   {
    //     propertyId: SpecificPropAPIData.id,
    //     from: BookingDate[0],
    //     to: BookingDate[1],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${ContextUserDetails.UserState}`,
    //     },
    //   }

    // );

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/search/view_property/success",
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Button onClick={BookingHotelDone}>Pay</Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
