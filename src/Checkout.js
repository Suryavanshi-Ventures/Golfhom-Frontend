import { React, useContext, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { AuthContext } from "@/context/auth_context";
import CheckoutCss from "../src/styles/Checkout.module.css";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Form, Input, Button, message, DatePicker, Select, Modal } from "antd";

const Checkout = (props) => {
  const RouterRef = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [FormRef] = Form.useForm();
  const [IsLoading, setIsLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  console.log("CHECKOUT PAGE", props);

  const BookingHotelDone = async (values) => {
    setIsLoading(true);
    try {
      if (!stripe || !elements) {
        setIsLoading(false);
        console.log();
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
        setIsLoading(true);
        try {
          const Token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
          const CreateBookingRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${
              props?.data?.data?.property_type === "Rental"
                ? "/v1/rentalunited/createBooking"
                : "/v1/nextpax/createBooking"
            }`,
            {
              id: props.data.data.propertyId,
              from: props.data.data.from,
              to: props.data.data.to,
              guest: props.data.data.total_guests,
              children: props.data.data.children,
              babies: props.data.data.babies,
              pets: 0,
              paymentIntent: paymentIntent.id,
              mainBooker: {
                countryCode: values.payment_card_country_code.toLowerCase(),
                zipCode: values.payment_card_zip_code,
                houseNumber: values.payment_card_house_number,
                street: values.payment_card_street_address,
                place: values.payment_card_city,
                stateProv: values.payment_card_state,
                houseNumber: values.payment_card_house_number,
              },
            },
            { headers: { Authorization: `Bearer ${Token}` } }
          );
          // * SUCCESS API RESPONSE

          if (CreateBookingRes.status === 201) {
            if (props.data.data.property_type === "Rental") {
              console.log(
                CreateBookingRes.data.data.data,
                "BOOKING SUCCESS RENTAL"
              );

              const countDown = () => {
                let secondsToGo = 7;
                const instance = modal.success({
                  title: "Booking Confirmed!",
                  content: `Please do not refresh the page, Redirecting in ${secondsToGo} second.`,
                  centered: true,
                  footer: null,
                });
                const timer = setInterval(() => {
                  secondsToGo -= 1;
                  instance.update({
                    content: `Please do not refresh the page, Redirecting in ${secondsToGo} second.`,
                  });
                }, 1000);
                setTimeout(() => {
                  clearInterval(timer);
                  RouterRef.push({
                    pathname: `${process.env.NEXT_PUBLIC_DOMAIN}/search/view_property/success`,
                    query: {
                      transaction_id:
                        CreateBookingRes.data.data.data.ReservationID._text,
                      booking_number:
                        CreateBookingRes.data.data.data.ResponseID._text,
                      hotel_name: props.data.data.poperty_name,
                      from_date: props.data.data.from,
                      to_date: props.data.data.to,
                      total_guests: props.data.data.total_guests,
                      adult: props.data.data.adult,
                      children: props.data.data.children,
                      babies: props.data.data.babies,
                      pets: props.data.data.pets,
                      payment_method: "Card",
                      payment_status: CreateBookingRes.data.status,
                      payment_amount: props.data.data.total_amount,
                    },
                  });
                }, secondsToGo * 1000);
              };

              countDown();
            } else if (props.data.data.property_type === "Nextpax") {
              console.log(
                CreateBookingRes.data.data.ReservationID,
                "BOOKING SUCCESS NEXTPAX"
              );

              const countDown = (BookingData) => {
                let secondsToGo = 7;
                const instance = modal.success({
                  title: "Booking Confirmed!",
                  content: `Please do not refresh, Redirecting in ${secondsToGo} second.`,
                  centered: true,
                  footer: null,
                });
                const timer = setInterval(() => {
                  secondsToGo -= 1;
                  instance.update({
                    content: `Please do not refresh, Redirecting in ${secondsToGo} second.`,
                  });
                }, 1000);
                setTimeout(() => {
                  clearInterval(timer);
                  RouterRef.push({
                    pathname: `${process.env.NEXT_PUBLIC_DOMAIN}/search/view_property/success`,
                    query: {
                      transaction_id: BookingData?.data?.data?.id,
                      booking_number: BookingData?.data?.data?.bookingNumber,
                      hotel_name: props.data.poperty_name,
                      from_date: props.data.from,
                      to_date: props.data.to,
                      total_guests: props.data.total_guests,
                      adult: props.data.adult,
                      children: props.data.children,
                      babies: props.data.babies,
                      pets: props.data.pets,
                      payment_method: "CardType",
                      payment_status: BookingData?.data.status,
                      payment_amount: props.data.total_amount,
                    },
                  });
                }, secondsToGo * 1000);
              };
            }
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          if (error.response.status === 401) {
            message.error("Please login to book hotels!");
            setIsLoading(false);
          } else {
            setIsLoading(false);
            message.error(error.response.data.message);
            if (error.response.data.message === "Property is not available") {
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          }
          console.log("ERROR: IN CREATE BOOKING API", error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("ERROR - Stripe", error);
      setIsLoading(false);
    }
  };

  const OnClickPayFaild = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsLoading(false);
  };

  return (
    <>
      {/* REDIRECT POP MODAL */}
      {contextHolder}
      {/* PAYMENT ELEMENT STRIPE */}
      <PaymentElement />
      <hr />
      {/* BILLING DETAILS FORM */}
      <Form
        name="payment_form_nextpax"
        form={FormRef}
        onFinishFailed={OnClickPayFaild}
        className={CheckoutCss.parentForm}
        onFinish={BookingHotelDone}
      >
        <h4 className={CheckoutCss.billing_form_heading}>Billing Details</h4>
        <Row>
          <Col md={6}>
            <Form.Item
              label="House Number"
              name="payment_card_house_number"
              className={CheckoutCss.labelName}
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
                className={CheckoutCss.inputName}
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item
              label="Address Line"
              name="payment_card_street_address"
              className={CheckoutCss.labelName}
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
                className={CheckoutCss.inputName}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Item
              label="City"
              name="payment_card_city"
              required={true}
              className={CheckoutCss.labelName}
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
                className={CheckoutCss.inputName}
              />
            </Form.Item>
          </Col>

          <Col md={4}>
            <Form.Item
              label="State"
              name="payment_card_state"
              className={CheckoutCss.labelName}
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
                className={CheckoutCss.inputName}
              />
            </Form.Item>
          </Col>

          <Col md={4}>
            <Form.Item
              label="Zip code"
              name="payment_card_zip_code"
              className={CheckoutCss.labelName}
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
                className={CheckoutCss.inputName}
              />
            </Form.Item>
          </Col>
        </Row>

        <Col md={12}>
          <Form.Item
            label="Country"
            name="payment_card_country_code"
            className={CheckoutCss.labelName}
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
              className={CheckoutCss.inputName}
            />
          </Form.Item>
        </Col>

        <Form.Item>
          <div
            className={CheckoutCss.checkout_payment_nextpax_payment_pay_btn_div}
          >
            <Button
              loading={IsLoading}
              className={CheckoutCss.checkout_payment_nextpax_payment_pay_btn}
              htmlType="submit"
            >
              Pay
            </Button>
          </div>
        </Form.Item>
      </Form>
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
