import React from "react";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const BookingHotelDone = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY);

const WrappedCheckout = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export default WrappedCheckout;
