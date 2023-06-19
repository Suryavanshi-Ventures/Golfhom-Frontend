import { Form, Input, Button, message, Modal, DatePicker, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import NewPaymentCss from "../../../../styles/NewPayment.module.css";
import { React, useState } from "react";
import PaymentFormCss from "../../../../styles/PaymentForm.module.css";
import axios from "axios";
import dayjs from "dayjs";
import { validate, cardholderName, cvv, postalCode } from "card-validator";
import moment from "moment";
import { cardNumber } from "card-validator/dist/card-number";

const { Option } = Select;
const NewPaymentForm = (props) => {
  const [modal, contextHolder] = Modal.useModal();
  const [IsLoading, setIsLoading] = useState(false);
  const [FormRef] = Form.useForm();
  const [OnDateChange, setOnDateChange] = useState({
    exp_year: "",
    exp_month: "",
  });
  const DynamicYear = 16;
  const DynamicMonth = 2;

  console.log("PROPS OF NEW PAYMENT:", props);

  const countDown = (BookingData) => {
    let secondsToGo = 8;
    const instance = modal.success({
      title: "Booking Confirmed!",
      content: (
        <>
          <p className={PaymentFormCss.booking_confirm_text}>
            Booking ID:{" "}
            <span className={PaymentFormCss.booking_confirm_text_value}>
              {BookingData?.id}
            </span>
          </p>
          <p className={PaymentFormCss.booking_confirm_text}>
            Booking Number:{" "}
            <span className={PaymentFormCss.booking_confirm_text_value}>
              {BookingData?.bookingNumber}
            </span>
          </p>
          <p className={PaymentFormCss.booking_confirm_text}>
            The page will refresh in {secondsToGo} please do not refresh the
            page.
          </p>
        </>
      ),
      footer: null,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <>
            <p className={PaymentFormCss.booking_confirm_text}>
              Booking ID:{" "}
              <span className={PaymentFormCss.booking_confirm_text_value}>
                {BookingData?.id}
              </span>
            </p>
            <p className={PaymentFormCss.booking_confirm_text}>
              Booking Number:{" "}
              <span className={PaymentFormCss.booking_confirm_text_value}>
                {BookingData?.bookingNumber}
              </span>
            </p>
            <p className={PaymentFormCss.booking_confirm_page_refresh_text}>
              The page will automatically refresh in {secondsToGo} please do not
              refresh the page.
            </p>
          </>
        ),
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      // instance.destroy();
      window.location.reload();
    }, secondsToGo * 1000);
  };
  const OnClickPay = async (values) => {
    console.log("Success:", values);

    setIsLoading(true);
    try {
      const Token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log(Token);
      const CreateBookingRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/createBooking`,
        {
          id: props.data.propertyId,
          from: props.data.from,
          to: props.data.to,
          guest: props.data.total_guests,
          children: props.data.children,
          babies: props.data.babies,
          pets: 0,
          cardCVC: values.payment_card_cvc_code,
          cardType: values.payment_card_type.toUpperCase(),
          cardNumber: values.payment_card_number,
          cardExpirationYear: "2016",
          cardExpirationMonth: "2",
          cardHolderName: values.payment_card_holder_name,
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
      if (
        CreateBookingRes.status === 201 &&
        CreateBookingRes.data.data.bookingNumber
      ) {
        setIsLoading(false);
        countDown(CreateBookingRes.data.data); //* BOOKING CONFRIM MODAL METHOD
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        message.error("Please login to book hotels!");
        setIsLoading(false);
      } else {
        message.error(error.response.data.message);
        countDown();
        setIsLoading(false);
      }
      console.log("ERROR: IN CREATE BOOKING API", error);
      setIsLoading(false);
    }
  };

  const OnClickPayFaild = (errorInfo) => {
    if (
      errorInfo.values.payment_card_city ||
      errorInfo.values.payment_card_country_code ||
      errorInfo.values.payment_card_cvc_code ||
      errorInfo.values.payment_card_exp_month ||
      errorInfo.values.payment_card_exp_year ||
      errorInfo.values.payment_card_holder_name ||
      errorInfo.values.payment_card_house_number ||
      errorInfo.values.payment_card_number ||
      errorInfo.values.payment_card_state ||
      errorInfo.values.payment_card_street_address ||
      errorInfo.values.payment_card_type ||
      errorInfo.values.payment_card_zip_code == undefined
    ) {
      message.error("Please fill all the required fields!");
    }
    console.log("Failed:", errorInfo);
    setIsLoading(false);
  };

  // VALIDATION CARD NUMBER
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const digitsOnly = value.replace(/\D/g, "");
    const formattedValue = digitsOnly
      .substr(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const validateCardNumber = (value) => {
    if (!value) {
      return Promise.reject("");
    }
    if (value.replace(/\D/g, "").length < 16) {
      return Promise.reject("Card number must be at least 16 digits");
    }
    return Promise.resolve();
  };

  // FOR YEAR
  const currentYear = moment().year();
  const startYear = currentYear;
  const endYear = currentYear + 20;

  // FOR MONTH
  const currentMonth = moment().month();
  const endOfMonth = moment().endOf("month");

  return (
    <>
      {/* BOOKING CONFIRM MODAL */}
      {contextHolder}
      <Form
        name="payment_form_nextpax"
        form={FormRef}
        onFinishFailed={OnClickPayFaild}
        className={NewPaymentCss.parentForm}
        onFinish={OnClickPay}
      >
        {/* Card Holder Name */}
        <Col md={12}>
          <Form.Item
            label="Card Holder Name"
            className={NewPaymentCss.labelName}
            name="payment_card_holder_name"
            required={true}
            rules={[
              {
                required: true,
                message: "Please enter Card Holder Name!",
              },
              ({ getFieldValue }) => ({
                validator: async (_, value) => {
                  if (!value || cardholderName(value).isValid) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter valid Card Holder Name!")
                  );
                },
              }),
              {
                isPotentiallyValid: true,
                isValid: true,
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              placeholder="Card Holder Name Ex John Deo"
              className={NewPaymentCss.inputName}
              onKeyUp={(e) => {
                e.target.value = e.target.value.replace(/[0-9]/g, "");
              }}
            />
          </Form.Item>
        </Col>

        {/* Card Number */}
        <Col md={12}>
          <Form.Item
            label="Card Number"
            name="payment_card_number"
            className={NewPaymentCss.labelName}
            rules={[
              { required: true, message: "Please enter your Card Number!" },
              { validator: (_, value) => validateCardNumber(value) },
              { whitespace: true },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              placeholder="**** **** **** ****"
              className={NewPaymentCss.inputName}
              minLength="16"
              maxLength="16"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </Form.Item>
        </Col>
        <Row>
          {/* Exp. Date */}
          <Col md={6}>
            <Form.Item
              label="Exp. Year"
              name="payment_card_exp_year"
              required={true}
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select your card Exp. Date!",
                },
                // ({ getFieldValue }) => ({ //! VALIDATION FOR OLD YEAR
                //   validator(_, value) {
                //     const selectedYear = value?.year();
                //     if (selectedYear && selectedYear < currentYear) {
                //       return Promise.reject(
                //         new Error("Selected year is expired")
                //       );
                //     }
                //     return Promise.resolve();
                //   },
                // }),
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                format={"YYYY"}
                onChange={(date, dateString) => {
                  console.log(dateString);
                  setOnDateChange({
                    exp_year: dateString,
                  });
                }}
                placeholder={`${DynamicYear}`}
                className={NewPaymentCss.inputName}
                picker="year"
                // disabledDate={(current) => //! DISABLED OLD DATE FOR DEMO PURPOSE ONLY
                //   current &&
                //   (current.year() < startYear || current.year() > endYear)
                // }
              />
            </Form.Item>
          </Col>

          <Col md={6}>
            <Form.Item
              className={NewPaymentCss.labelName}
              name="payment_card_exp_month"
              required={true}
              label="Card Exp Month"
              rules={[
                {
                  required: true,
                  message: "Please select your card Exp. Month!",
                },
                // ({ getFieldValue }) => ({ //! VALIDATION FOR OLD MONTH
                //   validator(_, value) {
                //     const selectedMonth = moment(value).month();
                //     if (selectedMonth && selectedMonth < currentMonth) {
                //       return Promise.reject(
                //         new Error("Selected month is in the past")
                //       );
                //     }
                //     return Promise.resolve();
                //   },
                // }),
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                format={"M"}
                onChange={(date, dateString) =>
                  setOnDateChange({
                    exp_month: dateString,
                  })
                }
                placeholder={`${DynamicMonth}`}
                className={NewPaymentCss.inputName}
                picker="month"
                // disabledDate={(current) => //! DISABLED OLD DATE FOR DEMO PURPOSE ONLY
                //   current && current.isBefore(endOfMonth, "day")
                // }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          {/* Card Type */}
          <Col md={6}>
            <Form.Item
              label="Card Type"
              name="payment_card_type"
              className={NewPaymentCss.labelName}
              rules={[
                {
                  type: "dropdown",
                  message: "Card Type",
                },
                {
                  required: true,
                  message: "Please select your Card Type!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                placeholder="Select Card Type"
                className={NewPaymentCss.inputName}
              >
                <Option value="VISA">Visa</Option>
                <Option value="MASTER CARD">Mastercard</Option>
                <Option value="AMEX">American Express</Option>
                <Option value="DISCOVER">Discover</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* CVC */}
          <Col md={6}>
            <Form.Item
              label="CVC"
              name="payment_card_cvc_code"
              className={NewPaymentCss.labelName}
              rules={[
                { required: true, message: "Enter your card CVC code!" },
                { min: 3, message: "CVC must be exactly 3 or 4 numbers" },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="CVC"
                className={NewPaymentCss.inputName}
                minlength="3"
                maxlength="4"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Address Line */}
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
          {/*   City */}
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

          {/* State */}
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

          {/* Zip code */}
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
          {/* COUNTRY Line */}
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
          {/* HOUSE Line */}
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
        {/* Pay Button */}
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
      </Form>
    </>
  );
};
export default NewPaymentForm;
