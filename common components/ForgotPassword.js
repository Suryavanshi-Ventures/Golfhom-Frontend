import { React, useState } from "react";
import { Button, Checkbox, Input, Form, message } from "antd";
import ForgotPasswordCss from "../src/styles/common component/ForgotPassword.module.css";
const ForgotPassword = () => {
  const [InputEmail, setInputEmail] = useState("");
  const [IsNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [Form1Ref] = Form.useForm();
  const [Form2Ref] = Form.useForm();

  const OnInputEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const OnClickSendEmail = (values) => {
    setIsNewPasswordVisible(true);
    console.log(values);
  };

  const OnClickChangePassword = (values) => {
    setIsNewPasswordVisible(false);

    console.log(values);
  };

  return (
    <>
      {/* <h5 className={ForgotPasswordCss.forgotHeading}>
        Please enter your username or email address. You will receive a link to
        create a new password via email.
      </h5>
      <Input
        type="email"
        placeholder="Enter your user name or email"
        className={ForgotPasswordCss.forgotInput}
        value={InputEmail}
        onChange={OnInputEmailChange}
      ></Input>
      <div className={ForgotPasswordCss.forgotBtn}>
        <Button className={ForgotPasswordCss.registBtn}>Send</Button>
      </div> */}

      <section className={ForgotPasswordCss.forgot_pass_section}>
        <Form
          name="send_email_form"
          layout="vertical"
          onFinish={OnClickSendEmail}
          autoComplete="off"
          form={Form1Ref}
        >
          <h5 className={ForgotPasswordCss.forgotHeading}>
            Please enter your username or email address. You will receive a link
            to create a new password via email.
          </h5>

          {/* FORGOT EMAIL */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <div className={ForgotPasswordCss.forgotBtn}>
              <Button className={ForgotPasswordCss.registBtn} htmlType="submit">
                Send
              </Button>
            </div>
          </Form.Item>
        </Form>
      </section>
      {IsNewPasswordVisible ? (
        <section className={ForgotPasswordCss.forgot_pass_section}>
          <Form
            name="new_password_form"
            layout="vertical"
            onFinish={OnClickChangePassword}
            autoComplete="off"
            form={Form2Ref}
          >
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[
                { required: true, message: "Please enter a password" },
                { min: 5, message: "Password must be at least 5 characters" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Confirm Password"
              dependencies={["new_password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <div className={ForgotPasswordCss.forgotBtn}>
                <Button
                  className={ForgotPasswordCss.registBtn}
                  htmlType="submit"
                >
                  Change Password
                </Button>
              </div>
            </Form.Item>
          </Form>
        </section>
      ) : (
        ""
      )}
      {/* NEW PASSWORD SECTION */}
    </>
  );
};

export default ForgotPassword;
