import { Form, Input, Button, message, DatePicker, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import NewPaymentCss from "./style/NewPayment.module.css";
import { React, useState, useEffect } from "react";
import PaymentFormCss from "../../../../styles/PaymentForm.module.css";
import axios from "axios";
import { validate, cardholderName, cvv, postalCode } from "card-validator";
import { cardNumber } from "card-validator/dist/card-number";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY}`
);
const { Option } = Select;
import Checkout from "../../../../Checkout";

const NewPaymentForm = (props) => {
  console.log("NEWPAYMENT:", props);

  const [Options, setOptions] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [IsLoading, setIsLoading] = useState(false);
  const [FormRef] = Form.useForm();
  const [OnDateChange, setOnDateChange] = useState({
    exp_year: "",
    exp_month: "",
  });
  const DynamicYear = 16;
  const DynamicMonth = 2;
  const RouterRef = useRouter();
  const [CardType, setCardType] = useState("");

  const OnClickPay = async (values) => {
    setIsLoading(true);
    // try {
    //   const Token =
    //     localStorage.getItem("token") || sessionStorage.getItem("token");
    //   console.log(Token);
    //   const CreateBookingRes = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/createBooking`,
    //     {
    //       id: props.data.propertyId,
    //       from: props.data.from,
    //       to: props.data.to,
    //       guest: props.data.total_guests,
    //       children: props.data.children,
    //       babies: props.data.babies,
    //       pets: 0,
    //       cardCVC: values.payment_card_cvc_code,
    //       cardType: values.payment_card_type.toUpperCase(),
    //       cardNumber: values.payment_card_number,
    //       cardExpirationYear: dayjs(values.payment_card_exp_year).format(
    //         "YYYY"
    //       ),
    //       cardExpirationMonth: dayjs(values.payment_card_exp_month).format("M"),
    //       cardHolderName: values.payment_card_holder_name,
    //       mainBooker: {
    //         countryCode: values.payment_card_country_code.toLowerCase(),
    //         zipCode: values.payment_card_zip_code,
    //         houseNumber: values.payment_card_house_number,
    //         street: values.payment_card_street_address,
    //         place: values.payment_card_city,
    //         stateProv: values.payment_card_state,
    //         houseNumber: values.payment_card_house_number,
    //       },
    //     },
    //     { headers: { Authorization: `Bearer ${Token}` } }
    //   );
    //   // * SUCCESS API RESPONSE
    //   if (
    //     CreateBookingRes.status === 201 &&
    //     CreateBookingRes.data.data.bookingNumber
    //   ) {
    //     setCardType(values.payment_card_type);
    //     LoadingPopUp(CreateBookingRes);
    //   } else {
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   if (error.response.status === 401) {
    //     message.error("Please login to book hotels!");
    //     setIsLoading(false);
    //   } else {
    //     setIsLoading(false);
    //     message.error(error.response.data.message);
    //     if (error.response.data.message === "Property is not available") {
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 3000);
    //     }
    //   }

    //   console.log("ERROR: IN CREATE BOOKING API", error);
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      {/* BOOKING CONFIRM MODAL */}
      {contextHolder}
      <section style={{ padding: "20px" }}>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: props?.data?.paymentIntent?.client_secret }}
        >
          {/* <CardElement id="card-element" options={{}} /> */}
          <Checkout data={props} />
          {/* <PaymentElement /> */}
        </Elements>
      </section>
    </>
  );
};
export default NewPaymentForm;
