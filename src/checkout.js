import { React, useContext, useState } from "react";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import { AuthContext } from "@/context/auth_context";
import CheckoutCss from "../src/styles/Checkout.module.css";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = (props) => {
  const Router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  console.log("PROPS DATA CHECKOUT", props.data);
  const ContextUserDetails = useContext(AuthContext);
  const [IsLoading, setIsLoading] = useState(false);

  const BookingHotelDone = async () => {
    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      // confirmParams: {
      //   return_url: "http://localhost:3000/search/view_property/success",
      // },
      redirect: "if_required",
    });

    if (error?.code) {
      message.error(error.message);
      setIsLoading(false);
    } else if (error === undefined && paymentIntent) {
      const BookingRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
        {
          propertyId: props.data[0].id,
          from: props.data[1],
          to: props.data[2],
          guest: props.data[3].total_guests,
          children: props.data[3].child,
          paymentIntent: paymentIntent.id,
          pets: true,
        },
        {
          headers: {
            Authorization: `Bearer ${ContextUserDetails.UserState}`,
          },
        }
      );
      if (BookingRes.status === 201) {
        setIsLoading(false);

        console.log("RESPONSE BOOKING API BACKEND", BookingRes);
        console.log("RESPONSE STRIPE PAYMENT INTENT ", paymentIntent);
        Router.push(
          `http://localhost:3000/search/view_property/success?transaction_id=${paymentIntent.id}&payment_method=${paymentIntent.payment_method_types[0]}&payment_status=${paymentIntent.status}&payment_amount=${paymentIntent.amount}&payment_currency=${paymentIntent.currency}`
        );
      }
    }

    console.log("ERROR - Stripe", error);
  };

  return (
    <>
      <div className={CheckoutCss.checkout_btn_main_div}>
        <div className={CheckoutCss.checkout_btn_div}>
          <Button
            loading={IsLoading}
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

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY);

// // // Wrap the Checkout component with the Elements provider
// // const CheckoutWithStripe = () => (
// //   <Elements stripe={stripePromise}>
// //     <Checkout />
// //   </Elements>
// );

export default Checkout;
