import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import Head from "next/head";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY);

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const BookingHotelDone = async () => {
    if (!stripe || !elements) {
      return;
    }

    // Rest of your code for booking and payment confirmation
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

const CheckoutWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default CheckoutWithStripe;
