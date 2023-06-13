import { React, useState } from "react";
import { Input, Button, Form, message } from "antd";
import dayjs from "dayjs";
import PaymentFormCss from "../../../styles/PaymentForm.module.css";
import axios from "axios";

const PaymentForm = (props) => {
  const DynamicYear = dayjs().format("YY");
  const DynamicMonth = dayjs().format("M");
  const [cardNumber, setCardNumber] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [form2] = Form.useForm();

  const OnClickPay = async (values) => {
    console.log("Success:", values);
    setIsLoading(true);

    try {
      const CreateBookingRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/createBooking`
      );

      if (CreateBookingRes.status === 201) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR: IN CREATE BOOKING API", error);
      message.error(error);
    }
  };

  const OnClickPayFaild = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className={PaymentFormCss.checkout_payment_nextpax_section}>
      {" "}
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
            ]}
          >
            <div
              className={
                PaymentFormCss.checkout_payment_nextpax_payment_input_div
              }
            >
              <Input
                placeholder="Ex 4242 4242 4242 4242"
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
                <Input
                  placeholder={`${DynamicYear}`}
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
                <Input
                  placeholder={`${DynamicMonth}`}
                  className={
                    PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                  }
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
              <Input
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
                placeholder="Ex Scott Prestine"
                className={
                  PaymentFormCss.checkout_payment_nextpax_payment_form_inputs
                }
              />
            </div>
          </Form.Item>

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
  );
};

export default PaymentForm;
