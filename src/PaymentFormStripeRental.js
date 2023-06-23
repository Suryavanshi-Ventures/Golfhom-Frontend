import { React, useContext, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import { AuthContext } from "@/context/auth_context";
import CheckoutCss from "../src/styles/Checkout.module.css";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "black",
      fontFamily: "Poppins, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const Checkout = (props) => {
  const Router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  console.log("PROPS DATA CHECKOUT", props.data);
  const ContextUserDetails = useContext(AuthContext);
  const [IsLoading, setIsLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "rarw",
    email: "rajuvlker@gmail.com",
    address: "fasfasfafaf",
  });
  const cardElement = elements?.getElement(CardElement);

  const BookingHotelDone = async () => {
    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });
      if (error?.code) {
        message.error(error.message);
        setIsLoading(false);
      } else if (error === undefined && paymentMethod) {
        console.log("RESPONSE STRIPE PAYMENT INTENT ", paymentMethod);
        // // const BookingRes = await axios.post(
        // //   `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
        // //   {
        // //     propertyId: props.data[0].id,
        // //     from: props.data[1],
        // //     to: props.data[2],
        // //     guest: props.data[3].total_guests,
        // //     children: props.data[3].child,
        // //     paymentIntent: paymentMethod.id,
        // //     pets: true,
        // //   },
        // //   {
        // //     headers: {
        // //       Authorization: `Bearer ${ContextUserDetails.UserState}`,
        // //     },
        // //   }
        // // );
        // if (BookingRes.status === 201) {
        //   setIsLoading(false);

        //   console.log("RESPONSE BOOKING API BACKEND", BookingRes);
        //   console.log("RESPONSE STRIPE PAYMENT INTENT ", paymentMethod);
        //   // Router.push(
        //   //   `${process.env.NEXT_PUBLIC_DOMAIN}/search/view_property/success?transaction_id=${paymentMethod.id}&payment_method=${paymentMethod.payment_method_types[0]}&payment_status=${paymentMethod.status}&payment_amount=${paymentMethod.amount}&payment_currency=${paymentMethod.currency}`
        //   // );
        // }
      }

      console.log("ERROR - Stripe", error);
    }

    // const { error, paymentIntent } = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   // confirmParams: {
    //   //   return_url: "http://localhost:3000/search/view_property/success",
    //   // },
    //   redirect: "if_required",
    // });
  };

  return (
    <>
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      <div className={CheckoutCss.checkout_btn_main_div}>
        <div className={CheckoutCss.checkout_btn_div}>
          <Button
            disabled={!stripe}
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
