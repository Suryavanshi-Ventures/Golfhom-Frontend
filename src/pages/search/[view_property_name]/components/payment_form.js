import { React, useState } from "react";
import { Input, Button, Form, message, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import PaymentFormCss from "../../../../styles/PaymentForm.module.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
const { TextArea } = Input;

const PaymentForm = (props) => {
  console.log(props, " PaymentForm");
  const [IsLoading, setIsLoading] = useState(false);
  const [form2] = Form.useForm();
  // const DynamicYear = dayjs().format("YY");
  // const DynamicMonth = dayjs().format("M");
  const DynamicYear = 16;
  const DynamicMonth = 2;

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
          cardCVC: values.payment_card_cvc_code,
          cardType: values.payment_card_type.toUpperCase(),
          cardNumber: values.payment_card_number,
          cardExpirationYear: values.payment_card_exp_year,
          cardExpirationMonth: values.payment_card_exp_month,
          cardHolderName: values.payment_card_holder_name,
          mainBooker: {
            countryCode: values.payment_card_country_code,
            zipCode: values.payment_card_zip_code,
            houseNumber: values.payment_card_house_number,
            street: values.payment_card_street_address,
            place: values.payment_card_city,
            stateProv: values.payment_card_state,
          },
        },
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      if (
        CreateBookingRes.status === 201 &&
        CreateBookingRes.data.data.bookingNumber
      ) {
        setIsLoading(false);
        message.success("Booking Confirmed!");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        message.error("Please login to book hotels!");
        setIsLoading(false);
      } else {
        message.error(error.response.data.message);
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

  return (
    <>
      <hr />
      <section className={PaymentFormCss.checkout_payment_nextpax_section}>
        <div className={PaymentFormCss.checkout_payment_nextpax_main_div}>
          <h4 className={PaymentFormCss.checkout_payment_nextpax_heading}>
            Payment details
          </h4>
          <Form
            name="payment_form_nextpax"
            form={form2}
            onFinish={OnClickPay}
            onFinishFailed={OnClickPayFaild}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              className={
                PaymentFormCss.checkout_payment_nextpax_payment_form_items
              }
              label="Card Number"
              required={true}
              name="payment_card_number"
              rules={[
                {
                  required: true,
                  message: "This Field Is Required!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value.length > 16) {
                      return Promise.reject(
                        new Error("Card number can not be more than 16 digit!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <div
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_input_div
                }
              >
                <Input
                  type="number"
                  placeholder="Ex 4111 1111 1111 1111"
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                  }
                />
              </div>
            </Form.Item>

            <div className={PaymentFormCss.checkout_payment_nextpax_cvc_div}>
              <Form.Item
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_form_items
                }
                name="payment_card_exp_year"
                required={true}
                label="Card Exp Year"
                rules={[
                  {
                    required: true,
                    message: "This Field Is Required!",
                  },
                ]}
              >
                <div
                  className={`${PaymentFormCss.checkout_payment_nextpax_payment_input_div} ${PaymentFormCss.checkout_payment_nextpax_card_year}`}
                >
                  <DatePicker
                    onChange={(date) =>
                      form2.setFieldsValue({
                        payment_card_exp_year: dayjs(date).format("YY"),
                      })
                    }
                    format={"YY"}
                    placeholder={`${DynamicYear}`}
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                    }
                    picker="year"
                  />
                </div>
              </Form.Item>

              <Form.Item
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_form_items
                }
                name="payment_card_exp_month"
                required={true}
                label="Card Exp Month"
                rules={[
                  {
                    required: true,
                    message: "This Field Is Required!",
                  },
                ]}
              >
                <div
                  className={`${PaymentFormCss.checkout_payment_nextpax_payment_input_div} ${PaymentFormCss.checkout_payment_nextpax_card_month}`}
                >
                  <DatePicker
                    format={"M"}
                    onChange={(date) =>
                      form2.setFieldsValue({
                        payment_card_exp_month: dayjs(date).format("M"),
                      })
                    }
                    placeholder={`${DynamicMonth}`}
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                    }
                    picker="month"
                  />
                </div>
              </Form.Item>
            </div>

            <Form.Item
              className={
                PaymentFormCss.checkout_payment_nextpax_payment_form_items
              }
              name="payment_card_type"
              required={true}
              label="Card Type"
              rules={[
                {
                  required: true,
                  message: "This Field Is Required!",
                },
              ]}
            >
              <div
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_input_div
                }
              >
                <Input
                  placeholder="VISA, MASTER"
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                  }
                />
              </div>
            </Form.Item>

            <Form.Item
              className={
                PaymentFormCss.checkout_payment_nextpax_payment_form_items
              }
              name="payment_card_cvc_code"
              required={true}
              label="CVC Code"
              rules={[
                {
                  required: true,
                  message: "This Field Is Required!",
                },
              ]}
            >
              <div
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_input_div
                }
              >
                <InputNumber
                  placeholder="**5 CVC"
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                  }
                />
              </div>
            </Form.Item>

            <Form.Item
              className={
                PaymentFormCss.checkout_payment_nextpax_payment_form_items
              }
              name="payment_card_holder_name"
              required={true}
              label="Card Holder Name"
              rules={[
                {
                  required: true,

                  message: "Please input your username!",
                },
              ]}
            >
              <div
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_input_div
                }
              >
                <Input
                  placeholder="Ex John Doe"
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                  }
                />
              </div>
            </Form.Item>

            <h4 className={PaymentFormCss.checkout_payment_nextpax_heading}>
              Billing details
            </h4>

            <Row>
              {/* COUNTRY CODE */}
              <Col md={6} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_country_code"
                  required={true}
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your country!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <Input
                      placeholder="Ex US"
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* STATE  */}
              <Col md={6} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_state"
                  label="State"
                  rules={[
                    {
                      message: "Please enter your state!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <Input
                      placeholder="Ex Flevoland"
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* CITY  */}
              <Col md={6} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_city"
                  required={true}
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your city!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <Input
                      placeholder="Ex Almere"
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* ZIP  CODE */}
              <Col md={6} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_zip_code"
                  required={true}
                  label="Zip Code"
                  rules={[
                    {
                      required: true,

                      message: "Please enter your zip code!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <Input
                      placeholder="Ex 1314 CH"
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* HOUSE NUMBER */}
              <Col md={12} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_house_number"
                  required={true}
                  label="House Number"
                  rules={[
                    {
                      required: true,

                      message: "Please enter your house number!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <Input
                      placeholder="Ex 1314 CH"
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                    />
                  </div>
                </Form.Item>
              </Col>

              {/* STREET ADDRESS */}
              <Col md={12} sm={12}>
                <Form.Item
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_items
                  }
                  name="payment_card_street_address"
                  required={true}
                  label="Street Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your street address!",
                    },
                  ]}
                >
                  <div
                    className={
                      PaymentFormCss.checkout_payment_nextpax_payment_input_div
                    }
                  >
                    <TextArea
                      className={
                        PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                      }
                      placeholder="Ex PJ Oudweg"
                      autoSize
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <div
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_pay_btn_div
                }
              >
                <Button
                  loading={IsLoading}
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_pay_btn
                  }
                  htmlType="submit"
                >
                  Pay
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default PaymentForm;
