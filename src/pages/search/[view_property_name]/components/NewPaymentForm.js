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
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const { Option } = Select;
import Checkout from "../../../../Checkout";

const NewPaymentForm = (props) => {
  console.log("PROPS OF NEW PAYMENT:", props);
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

  const LoadingPopUp = (BookingData) => {
    messageApi.open({
      type: "loading",
      content: "Redirecting please wait...",
      duration: 0,
    });

    console.log(props.data.total_amount);

    setTimeout(() => {
      messageApi.destroy;
      // RouterRef.push({
      //   pathname: `${process.env.NEXT_PUBLIC_DOMAIN}/search/view_property/success`,
      //   query: {
      //     transaction_id: BookingData?.data?.data?.id,
      //     booking_number: BookingData?.data?.data?.bookingNumber,
      //     hotel_name: props.data.poperty_name,
      //     from_date: props.data.from,
      //     to_date: props.data.to,
      //     total_guests: props.data.total_guests,
      //     adult: props.data.adult,
      //     children: props.data.children,
      //     babies: props.data.babies,
      //     pets: props.data.pets,
      //     payment_method: CardType,
      //     payment_status: BookingData?.data.status,
      //     payment_amount: props.data.total_amount,
      //   },
      // });
    }, 4000);
  };

  const FinalBooking = async () => {
    try {
    } catch (error) {
      console.log("Error: FINAL BOOKIG API", error);
    }
  };

  const OnClickPay = async (values) => {
    console.log("Success:", dayjs(values.payment_card_exp_month).format("M"));
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
      {/* 
      <Form
        name="payment_form_nextpax"
        form={FormRef}
        onFinishFailed={OnClickPayFaild}
        className={NewPaymentCss.parentForm}
        onFinish={OnClickPay}
      >
        <h4>Billing Details</h4>
        <Col md={12}>
          <Form.Item
            label="Address Line"
            name="payment_card_street_address"
            className={NewPaymentCss.labelName}
            rules={[
              {
                type: "textarea",
                message: "Address",
              },
              {
                required: true,
                message: "Please enter your Address!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              placeholder="Street Address Ex PJ Oudweg"
              className={NewPaymentCss.inputName}
            />
          </Form.Item>
        </Col>
        <Row>
          <Col md={4}>
            <Form.Item
              label="City"
              name="payment_card_city"
              required={true}
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "text",
                  message: "Please enter your City!",
                },
                {
                  required: true,
                  message: "Please enter your City!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="City Ex Almere"
                className={NewPaymentCss.inputName}
              />
            </Form.Item>
          </Col>

          <Col md={4}>
            <Form.Item
              label="State"
              name="payment_card_state"
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "text",
                  message: "State",
                },
                {
                  message: "State",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="State Ex FL"
                className={NewPaymentCss.inputName}
              />
            </Form.Item>
          </Col>

          <Col md={4}>
            <Form.Item
              label="Zip code"
              name="payment_card_zip_code"
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "text",
                  message: "Zip code",
                },
                {
                  required: true,
                  message: "Please enter your Zip Code!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Zip Code Ex 1314 CH"
                className={NewPaymentCss.inputName}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item
              label="Country"
              name="payment_card_country_code"
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "textarea",
                  message: "Country",
                },
                {
                  required: true,
                  message: "Please enter your Country",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Country Ex US"
                className={NewPaymentCss.inputName}
              />
            </Form.Item>
          </Col>

          <Col md={6}>
            <Form.Item
              label="House Number"
              name="payment_card_house_number"
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "textarea",
                  message: "House",
                },
                {
                  required: true,
                  message: "Please enter your House Number!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="House Ex 4"
                className={NewPaymentCss.inputName}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div
            className={
              NewPaymentCss.checkout_payment_nextpax_payment_pay_btn_div
            }
          >
            <Button
              loading={IsLoading}
              className={NewPaymentCss.checkout_payment_nextpax_payment_pay_btn}
              htmlType="submit"
            >
              Pay
            </Button>
          </div>
        </Form.Item>
      </Form> */}
    </>
  );
};
export default NewPaymentForm;
