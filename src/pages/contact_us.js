import { React, useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import ContactUsCss from "../styles/ContactUs.module.css";
import Head from "next/head";
import ContactUsBannerImage from "../../public/images/contact_us_banner_img.svg";
import Image from "next/image";
import { Button, Input, Form, message } from "antd";
const { TextArea } = Input;
import ManThumbsUpImg from "../../public/images/contact_us_thumbs_up_man.svg";
import BottomSection from "../../common components/bottomGroup";
import axios from "axios";

const ContactUs = () => {
  const [form] = Form.useForm();
  const [Loading, setLoading] = useState(false);

  const SubmitContactUs = async (FormData) => {
    try {
      const ContactUsResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/contactUs`,
        {
          name: FormData.contact_us_name,
          email: FormData.contact_us_email,
          subject: FormData.contact_us_subject,
          message: FormData.contact_us_message,
        }
      );
      setLoading(true);

      if (ContactUsResponse.status === 201) {
        setLoading(false);
        form.resetFields();
        message.success(
          "Thank you for contacting us. Your message is appreciated."
        );
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }

    console.log(FormData);
  };

  return (
    <>
      <Head>
        <title>Golfhom | Contact Us</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ContactUsCss.contact_us_main_section}>
        {/* BANNER IMAGE SECTION */}
        <div className={ContactUsCss.contact_us_bannerimg_container}>
          <Image
            fill
            className={ContactUsCss.contact_us_bannerimg}
            src={ContactUsBannerImage}
            alt="Banner image contact us"
            priority
          ></Image>
        </div>

        <Container className={ContactUsCss.parent_container}>
          <Col md={7} className={ContactUsCss.contact_us_input_section}>
            <h3 className={ContactUsCss.contact_us_input_heading}>
              Contact Us
            </h3>

            <p className={ContactUsCss.contact_us_input_subheading}>
              Questions or Comments?
            </p>

            <p className={ContactUsCss.contact_our_staff_text}>
              Please contact our staff via the form below. We will respond as
              soon as we’re able.
            </p>
            <Form layout="vertical" form={form} onFinish={SubmitContactUs}>
              <Form.Item
                label="Name"
                name="contact_us_name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                {/* INPUTS */}

                <Input
                  className={ContactUsCss.contact_us_input}
                  size="large"
                  placeholder="Enter Your name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="contact_us_email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                {/* INPUTSS */}

                <Input
                  type="email"
                  className={ContactUsCss.contact_us_input}
                  size="large"
                  placeholder="Enter Your email"
                />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="contact_us_subject"
                rules={[{ required: true, message: "Subject is required" }]}
              >
                <Input
                  className={ContactUsCss.contact_us_input}
                  size="large"
                  placeholder="Enter Your subject"
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="contact_us_message"
                rules={[{ required: true, message: "Message is required" }]}
              >
                {/* INPUTS */}

                <TextArea
                  placeholder="Please write something here..."
                  className={ContactUsCss.input_textarea}
                  rows={4}
                />
              </Form.Item>

              <Form.Item name="contact_us_message">
                <div className={ContactUsCss.contact_us_input_container}>
                  <Button
                    loading={Loading}
                    htmlType="submit"
                    className={ContactUsCss.contact_us_send_btn}
                  >
                    Send
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Container>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </main>
    </>
  );
};

export default ContactUs;
