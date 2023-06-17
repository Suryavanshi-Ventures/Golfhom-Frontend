import { Form, Input, message, Modal } from "antd";
import { Col, Row } from "react-bootstrap";
import NewPaymentCss from "../../../../styles/NewPayment.module.css";
import { React, useState } from "react";
import PaymentFormCss from "../../../../styles/PaymentForm.module.css";
import axios from "axios";

const NewPaymentForm = (props) => {
    console.log(props, " PaymentForm");
    const [modal, contextHolder] = Modal.useModal();
    const [IsLoading, setIsLoading] = useState(false);
    const [form2] = Form.useForm();
    const DynamicYear = 16;
    const DynamicMonth = 2;

    const countDown = (props) => {
        let secondsToGo = 8;
        const instance = modal.success({
            title: "Booking Confirmed!",
            content: (
                <>
                    <p className={PaymentFormCss.booking_confirm_text}>
                        Booking ID:{" "}
                        <span className={PaymentFormCss.booking_confirm_text_value}>
                            {props?.id}
                        </span>
                    </p>
                    <p className={PaymentFormCss.booking_confirm_text}>
                        Booking Number:{" "}
                        <span className={PaymentFormCss.booking_confirm_text_value}>
                            {props?.bookingNumber}
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
                                {props?.id}
                            </span>
                        </p>
                        <p className={PaymentFormCss.booking_confirm_text}>
                            Booking Number:{" "}
                            <span className={PaymentFormCss.booking_confirm_text_value}>
                                {props?.bookingNumber}
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
            {/* BOOKING CONFIRM MODAL */}
            {contextHolder}

            <Form className={NewPaymentCss.parentForm}>
                {/* Card Holder Name */}
                <Col md={12}>
                    <Form.Item
                        label="Card Holder Name"
                        className={NewPaymentCss.labelName}
                        rules={[
                            {
                                type: "text",
                                message: "Enter Card Holder Name",
                            },
                            {
                                required: true,
                                message: "Please Enter Card Holder Name",
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input
                            placeholder="Enter Card Holder Name"
                            className={NewPaymentCss.inputName}
                        />
                    </Form.Item>
                </Col>

                {/* Card Number */}
                <Col md={12}>
                    <Form.Item
                        label="Card Number"
                        className={NewPaymentCss.labelName}
                        rules={[
                            {
                                type: "text",
                                message: "Please enter Card Number",
                            },
                            {
                                required: true,
                                message: "Please enter your Card Number",
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input
                            placeholder="**** **** **** ****"
                            className={NewPaymentCss.inputName}
                            minlength="12"
                            maxlength="12"
                        />
                    </Form.Item>
                </Col>

                <Row>
                    {/* Exp. Date */}
                    <Col md={6}>
                        <Form.Item
                            label="Exp. Date"
                            className={NewPaymentCss.labelName}
                            rules={[
                                {
                                    type: "text",
                                    message: "Exp. Date",
                                },
                                {
                                    required: true,
                                    message: "Please enter Exp. Date",
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="Expiry Date"
                                className={NewPaymentCss.inputName}
                            />
                        </Form.Item>
                    </Col>

                    {/* CVC */}
                    <Col md={6}>
                        <Form.Item
                            label="CVC"
                            className={NewPaymentCss.labelName}
                            rules={[
                                {
                                    type: "password",
                                    message: "***",
                                },
                                {
                                    required: true,
                                    message: "Please enter CVC",
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input placeholder="CVC" className={NewPaymentCss.inputName} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Card Type */}
                <Col md={12}>
                    <Form.Item
                        label="Card Type"
                        className={NewPaymentCss.labelName}
                        rules={[
                            {
                                type: "dropdown",
                                message: "Card Type",
                            },
                            {
                                required: true,
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input
                            placeholder="Select Card Type"
                            className={NewPaymentCss.inputName}
                        />
                    </Form.Item>
                </Col>

                {/* Address Line */}
                <Col md={12}>
                    <Form.Item
                        label="Address Line"
                        className={NewPaymentCss.labelName}
                        rules={[
                            {
                                type: "textarea",
                                message: "Address Line",
                            },
                            {
                                required: true,
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input placeholder="" className={NewPaymentCss.inputName} />
                    </Form.Item>
                </Col>

                <Row>
                    {/*   City */}
                    <Col md={4}>
                        <Form.Item
                            label="City"
                            className={NewPaymentCss.labelName}
                            rules={[
                                {
                                    type: "text",
                                    message: "  City",
                                },
                                {
                                    required: true,
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="Select City"
                                className={NewPaymentCss.inputName}
                            />
                        </Form.Item>
                    </Col>

                    {/* State */}
                    <Col md={4}>
                        <Form.Item
                            label="State"
                            className={NewPaymentCss.labelName}
                            rules={[
                                {
                                    type: "text",
                                    message: "State",
                                },
                                {
                                    required: true,
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="Select State"
                                className={NewPaymentCss.inputName}
                            />
                        </Form.Item>
                    </Col>

                    {/* Zip code */}
                    <Col md={4}>
                        <Form.Item
                            label="Zip code"
                            className={NewPaymentCss.labelName}
                            rules={[
                                {
                                    type: "text",
                                    message: "Zip code",
                                },
                                {
                                    required: true,
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input placeholder="" className={NewPaymentCss.inputName} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default NewPaymentForm;
