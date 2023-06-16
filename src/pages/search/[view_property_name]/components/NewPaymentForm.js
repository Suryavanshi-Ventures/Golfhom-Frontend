import React from 'react'
import { Form, Input, Select } from 'antd'
import { Col, Row } from 'react-bootstrap'
import NewPaymentCss from "../../../../styles/NewPayment.module.css";

const NewPaymentForm = () => {
    return (
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
                        <Input
                            placeholder="CVC"
                            className={NewPaymentCss.inputName}
                        />
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
                    <Input
                        placeholder=""
                        className={NewPaymentCss.inputName}
                    />
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
                        <Input
                            placeholder=""
                            className={NewPaymentCss.inputName}
                        />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default NewPaymentForm
