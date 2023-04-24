/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Checkbox, Input, Form } from "antd";
import Image from "next/image";
import HeadPhoneIcon from "../public/headphones.svg";
import UserIcon from "../public/user icon.svg";
import Logo from "../public/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import { UilAlignJustify } from "@iconscout/react-unicons";
import axios from "axios";

const Header = () => {
  // This part is comment out for confirmation

  {
    /* -----------       SIGN UP SECTION        -----------------*/
  }
  // CHECKBOX TERMS CONDITION USESTATE
  const [IsBtnDisable, SetIsBtnDisable] = useState(true);
  // CHECKBOX TERMS CONDITION USESTATE END

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSignup = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  {
    /* -----------      REGISTER SECTION        -----------------*/
  }

  const [isModalOpens, setIsModalOpens] = useState(false);
  const showRegister = () => {
    setIsModalOpens(true);
    handleCancel();
  };
  const handleRegister = () => {
    setIsModalOpens(false);
  };
  const handleCancelRegister = () => {
    setIsModalOpens(false);
  };

  //! SIGNUP API FUNCTIONS
  const [form] = Form.useForm();

  const onSubmitSignup = async (values) => {
    //! SIGNUP API
    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/signup`,
    //     {
    //       username: values.user_name,
    //       email: values.email,
    //       password: values.password,
    //     }
    //   );

    //   console.log("Response: " + response.status);
    // } catch (error) {
    //   console.log("Sigup error: " + error);
    // }
    console.log("OnSubmit: " + values);
  };

  const onCheckBoxTick = (values) => {
    console.log("OnFinish: " + values);
  };

  {
    /* -----------      REGISTER TO RENT SECTION        -----------------*/
  }

  const [isModalOpened, setIsModalOpened] = useState(false);
  const showRegisterRent = () => {
    setIsModalOpened(true);
    handleCancel();
  };
  const handleRegisterRent = () => {
    setIsModalOpened(false);
  };
  const handleCancelRegisterRent = () => {
    setIsModalOpened(false);
  };

  {
    /* -----------      FORGET PASSWORD SECTION        -----------------*/
  }

  const [isModalForgot, setIsModalForgot] = useState(false);
  const showForgot = () => {
    setIsModalForgot(true);
    handleCancel();
  };
  const handleForgot = () => {
    setIsModalForgot(false);
  };
  const handleCancelForgot = () => {
    setIsModalForgot(false);
  };

  // DROPDOWN CONTENT

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const items = [
    {
      label: "Select",
      key: "1",
    },
    {
      label: "Register to Rent",
      key: "2",
    },
    {
      label: "Register to Host",
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <header className={HeaderCss.header}>
        <Container className={HeaderCss.container_header}>
          {/* -----------       SIGN UP SECTION        -----------------*/}

          <Modal
            title="Log In to your account"
            footer={null}
            open={isModalOpen}
            onSignup={handleSignup}
            onCancel={handleCancel}
            width={372}
          >
            <div className={HeaderCss.textParent}>
              <p className={HeaderCss.emailNumber}>Email or Member Number</p>
              <Input className={HeaderCss.password} type="text"></Input>
              <p className={HeaderCss.emailNumber}>Password</p>
              <Input className={HeaderCss.password} type="password"></Input>
            </div>

            <div className={HeaderCss.remember}>
              <Checkbox className={HeaderCss.meBox}>Remember Me</Checkbox>
              <Button className={HeaderCss.signIn}>Log In</Button>
            </div>

            <div className={HeaderCss.forgotActive}>
              <Link
                href="/"
                className={HeaderCss.forgot}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <Button
                    className={HeaderCss.signUpBtn}
                    onClick={showForgot}
                    onCancel={handleCancel}
                  >
                    Forgot Password ?
                  </Button>
                </Space>
              </Link>

              <div className={HeaderCss.dont_link_parent}>
                <h5 className={HeaderCss.donthaveAcc}>
                  Don't you have an account?
                </h5>
                <Link
                  href="/"
                  className={HeaderCss.registerLink}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <span className={HeaderCss.register} onClick={showRegister}>
                      Register
                    </span>
                  </Space>
                </Link>
              </div>
            </div>
          </Modal>

          {/* -----------      REGISTER SECTION        -----------------*/}

          <Modal
            title="Register"
            footer={null}
            open={isModalOpens}
            onSignup={handleRegister}
            onCancel={handleCancelRegister}
            width={440}
            className={HeaderCss.headerReg}
          >
            <Form
              onFinish={onSubmitSignup}
              form={form}
              name="register"
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
            >
              <Col className={HeaderCss.inputParent}>
                {/*  FORM VALIDATION */}

                <Form.Item
                  className={HeaderCss.form_items}
                  name="user_name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input your User Name!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="user_name"
                    placeholder="Enter User name"
                    className={HeaderCss.inputA}
                  />
                </Form.Item>

                {/* EMAIL */}
                <Form.Item
                  className={HeaderCss.form_items}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    placeholder="Email"
                    className={HeaderCss.inputB}
                  />
                </Form.Item>

                {/* PASSWORD */}

                <Form.Item
                  className={HeaderCss.form_items}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password"
                    placeholder="Password"
                    className={HeaderCss.inputC}
                  />
                </Form.Item>

                {/* CONFIRM PASSWORD */}

                <Form.Item
                  className={HeaderCss.form_items}
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Repeat Password"
                    className={HeaderCss.inputD}
                  />
                </Form.Item>
              </Col>

              <Row className={HeaderCss.twoAgree}>
                <Form.Item
                  className={HeaderCss.form_items_checkbox}
                  name="conditions"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve(SetIsBtnDisable(false))
                          : Promise.reject(
                              new Error(
                                "Should accept Terms & Conditions",
                                SetIsBtnDisable(true)
                              )
                            ),
                    },
                  ]}
                >
                  <Checkbox
                    name="conditions"
                    className={HeaderCss.agreeOptionA}
                  >
                    I agree with your Terms & Conditions
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  className={HeaderCss.form_items_checkbox}
                  name="privacy"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept Privacy & Policy")
                            ),
                    },
                  ]}
                >
                  <Checkbox name="privacy" className={HeaderCss.agreeOptionB}>
                    I agree with your Privacy Policy
                  </Checkbox>
                </Form.Item>
              </Row>
              <Form.Item>
                <div className={HeaderCss.registBtnParent}>
                  <Button
                    disabled={IsBtnDisable}
                    htmlType="submit"
                    className={HeaderCss.registerBtn}
                  >
                    Register
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>

          {/* -----------       FORGET PASSWORD SECTION        -----------------*/}

          <Modal
            title="Forgot Password"
            footer={null}
            open={isModalForgot}
            onSignup={handleForgot}
            onCancel={handleCancelForgot}
            width={800}
            className={HeaderCss.headerForgot}
          >
            <h5 className={HeaderCss.forgotHeading}>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </h5>
            <Input
              type="email"
              placeholder="Enter your user name or email"
              className={HeaderCss.forgotInput}
            ></Input>
            <div className={HeaderCss.forgotBtn}>
              <Button className={HeaderCss.registBtn}>Send</Button>
            </div>
          </Modal>

          <Row className={HeaderCss.top_nav_bar_main_row}>
            <div>
              <Row md={12} className={HeaderCss.top_nav_bar_row}>
                {/*//*  Off Canvas Btn  */}
                <Col xs={"auto"} className={`${HeaderCss.off_canvas_col} `}>
                  <OffCanvasExample />
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <span className={HeaderCss.headphones_icon}>
                    <Image src={HeadPhoneIcon} alt="headphones" />
                  </span>
                  <Link className={HeaderCss.top_header_a} href="/">
                    Help
                  </Link>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link
                    href="/"
                    className={HeaderCss.top_header_a}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <Button
                        className={HeaderCss.signUpBtn}
                        onClick={showRegisterRent}
                      >
                        Register to Rent
                      </Button>
                    </Space>
                  </Link>

                  {/* -----------      REGISTER TO RENT SECTION        -----------------*/}

                  <Modal
                    title="Register To Rent"
                    footer={null}
                    open={isModalOpened}
                    onSignup={handleRegisterRent}
                    onCancel={handleCancelRegisterRent}
                    width={440}
                    className={HeaderCss.headerReg}
                  >
                    <Col className={HeaderCss.inputParent}>
                      <div>
                        <Input
                          className={HeaderCss.inputA}
                          type="text"
                          placeholder="Enter User name"
                        ></Input>
                      </div>

                      <div>
                        <Input
                          className={HeaderCss.inputB}
                          type="email"
                          placeholder="Email"
                        ></Input>
                      </div>

                      <div>
                        <Input
                          className={HeaderCss.inputC}
                          type="password"
                          placeholder="Password"
                        ></Input>
                      </div>

                      <div>
                        <Input
                          className={HeaderCss.inputD}
                          type="password"
                          placeholder="Repeat Password"
                        ></Input>
                      </div>
                    </Col>

                    <Dropdown menu={menuProps}>
                      <Button
                        size="large"
                        className={HeaderCss.edit_room_dropdown_btn}
                      >
                        <Space
                          className={HeaderCss.edit_room_dropdown_btn_space}
                        >
                          I want to Rent
                          <DownOutlined
                            className={HeaderCss.edit_room_dropdown_icon}
                          />
                        </Space>
                      </Button>
                    </Dropdown>

                    <Row className={HeaderCss.twoAgree}>
                      <div>
                        <Checkbox className={HeaderCss.agreeOptionA}>
                          I agree with your Terms & Conditions
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox className={HeaderCss.agreeOptionB}>
                          I agree with your Privacy Policy
                        </Checkbox>
                      </div>
                    </Row>

                    <div className={HeaderCss.registBtnParent}>
                      <Button className={HeaderCss.registerBtn}>
                        Register
                      </Button>
                    </div>
                  </Modal>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <span className={HeaderCss.headphones_icon}>
                    <Image src={UserIcon} alt="user icon" />
                  </span>

                  <Link
                    href="/"
                    className={HeaderCss.top_header_a}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <Button
                        className={HeaderCss.signUpBtn}
                        onClick={showModal}
                      >
                        Log in & Sign up
                      </Button>
                    </Space>
                  </Link>
                </Col>
              </Row>

              <Row
                className={`${HeaderCss.top_nav_bar_row} ${HeaderCss.register_host_btn_row}`}
              >
                <Col xs={"auto"} className={HeaderCss.logo_container}>
                  <Link href="/" className={HeaderCss.logo_container_a}>
                    <Image src={Logo} alt="golfhom logo" width="200" />
                  </Link>
                </Col>

                <Col
                  md={7}
                  className={HeaderCss.top_header_register_host_col_container}
                >
                  <Row className={HeaderCss.top_header_row_container}>
                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/">
                        Home
                      </Link>
                    </Col>

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/about">
                        About
                      </Link>
                    </Col>
                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link className={HeaderCss.below_header_a} href="/blog">
                        Blog
                      </Link>
                    </Col>
                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link
                        className={HeaderCss.below_header_a}
                        href="/contact_us"
                      >
                        Contact Us
                      </Link>
                    </Col>

                    <Col
                      xs={"auto"}
                      className={HeaderCss.top_header_Col_container}
                    >
                      <Link href="/register_to_host">
                        <Button
                          type="primary"
                          className={HeaderCss.register_btn}
                        >
                          Register To Host
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

//** Off Canvas Function  **/
function OffCanvasExample({ name, ...props }) {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {
    /* -----------       SIGN UP SECTION        -----------------*/
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSignup = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  {
    /* -----------      REGISTER SECTION        -----------------*/
  }

  const [isModalOpens, setIsModalOpens] = useState(false);
  const showRegister = () => {
    setIsModalOpens(true);
    handleCancel();
  };
  const handleRegister = () => {
    setIsModalOpens(false);
  };
  const handleCancelRegister = () => {
    setIsModalOpens(false);
  };

  {
    /* -----------      REGISTER TO RENT SECTION        -----------------*/
  }

  const [isModalOpened, setIsModalOpened] = useState(false);
  const showRegisterRent = () => {
    setIsModalOpened(true);
    handleCancel();
  };
  const handleRegisterRent = () => {
    setIsModalOpened(false);
  };
  const handleCancelRegisterRent = () => {
    setIsModalOpened(false);
  };

  {
    /* -----------      FORGET PASSWORD SECTION        -----------------*/
  }

  const [isModalForgot, setIsModalForgot] = useState(false);
  const showForgot = () => {
    setIsModalForgot(true);
    handleCancel();
  };
  const handleForgot = () => {
    setIsModalForgot(false);
  };
  const handleCancelForgot = () => {
    setIsModalForgot(false);
  };

  // DROPDOWN CONTENT

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const item = [
    {
      label: "Select",
      key: "1",
    },
    {
      label: "Register to Rent",
      key: "2",
    },
    {
      label: "Register to Host",
      key: "3",
    },
  ];

  const menuProps = {
    item,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div>
        <UilAlignJustify size="40" onClick={handleShow} />
      </div>

      {/* -----------       SIGN UP SECTION        -----------------*/}

      <Modal
        title="Log In to your account"
        footer={null}
        open={isModalOpen}
        onSignup={handleSignup}
        onCancel={handleCancel}
        width={344}
      >
        <div className={HeaderCss.textParent}>
          <p className={HeaderCss.emailNumber}>Email or Member Number</p>
          <input className={HeaderCss.password} type="text"></input>
          <p className={HeaderCss.emailNumber}>Password</p>
          <input className={HeaderCss.password} type="password"></input>
        </div>

        <div className={HeaderCss.remember}>
          <Checkbox className={HeaderCss.meBox}>Remember Me</Checkbox>
          <Button className={HeaderCss.signIn}>Log In</Button>
        </div>

        <div className={HeaderCss.forgotActive}>
          <Link
            href="/"
            className={HeaderCss.forgot}
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              <Button
                className={HeaderCss.signUpBtn}
                onClick={showForgot}
                onCancel={handleCancel}
              >
                Forgot Password ?
              </Button>
            </Space>
          </Link>

          <div className={HeaderCss.dont_link_parent}>
            <h5 className={HeaderCss.donthaveAcc}>
              Don't you have an account?
            </h5>
            <Link
              href="/"
              className={HeaderCss.registerLink}
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                <a className={HeaderCss.register} onClick={showRegister}>
                  Register
                </a>
              </Space>
            </Link>
          </div>
        </div>
      </Modal>

      {/* -----------      REGISTER SECTION        -----------------*/}

      <Modal
        Modal
        title="Register"
        footer={null}
        open={isModalOpens}
        onSignup={handleRegister}
        onCancel={handleCancelRegister}
        width={440}
        className={HeaderCss.headerReg}
      >
        <Col className={HeaderCss.inputParent}>
          <div>
            <Input
              className={HeaderCss.inputA}
              type="text"
              placeholder="Enter User name"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputB}
              type="email"
              placeholder="Email"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputC}
              type="password"
              placeholder="Password"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputD}
              type="password"
              placeholder="Repeat Password"
            ></Input>
          </div>
        </Col>

        <Row className={HeaderCss.twoAgree}>
          <div>
            <Checkbox className={HeaderCss.agreeOptionA}>
              I agree with your Terms & Conditions
            </Checkbox>
          </div>
          <div>
            <Checkbox className={HeaderCss.agreeOptionB}>
              I agree with your Privacy Policy
            </Checkbox>
          </div>
        </Row>

        <div className={HeaderCss.registBtnParent}>
          <Button className={HeaderCss.registerBtn}>Register</Button>
        </div>
      </Modal>

      {/* -----------       FORGET PASSWORD SECTION        -----------------*/}

      <Modal
        Modal
        title="Forgot Password"
        footer={null}
        open={isModalForgot}
        onSignup={handleForgot}
        onCancel={handleCancelForgot}
        width={800}
        className={HeaderCss.headerForgot}
      >
        <h5 className={HeaderCss.forgotHeading}>
          Please enter your username or email address. You will receive a link
          to create a new password via email.
        </h5>
        <Input
          type="email"
          placeholder="Enter your user name or email"
          className={HeaderCss.forgotInput}
        ></Input>
        <div className={HeaderCss.forgotBtn}>
          <Button className={HeaderCss.registBtn}>Register</Button>
        </div>
      </Modal>

      {/* -----------      REGISTER TO RENT SECTION        -----------------*/}

      <Modal
        Modal
        title="Register"
        footer={null}
        open={isModalOpened}
        onSignup={handleRegisterRent}
        onCancel={handleCancelRegisterRent}
        width={440}
        className={HeaderCss.headerReg}
      >
        <Col className={HeaderCss.inputParent}>
          <div>
            <Input
              className={HeaderCss.inputA}
              type="text"
              placeholder="Enter User name"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputB}
              type="email"
              placeholder="Email"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputC}
              type="password"
              placeholder="Password"
            ></Input>
          </div>

          <div>
            <Input
              className={HeaderCss.inputD}
              type="password"
              placeholder="Repeat Password"
            ></Input>
          </div>
        </Col>

        <Dropdown menu={menuProps}>
          <Button size="large" className={HeaderCss.edit_room_dropdown_btn}>
            <Space className={HeaderCss.edit_room_dropdown_btn_space}>
              I want to Rent
              <DownOutlined className={HeaderCss.edit_room_dropdown_icon} />
            </Space>
          </Button>
        </Dropdown>

        <Row>
          <div>
            <Checkbox className={HeaderCss.agreeOptionA}>
              I agree with your Terms & Conditions
            </Checkbox>
          </div>
          <div>
            <Checkbox className={HeaderCss.agreeOptionB}>
              I agree with your Privacy Policy
            </Checkbox>
          </div>
        </Row>

        <Button className={HeaderCss.registerBtn}>Register</Button>
      </Modal>

      <Offcanvas
        key={1}
        placement={["end"]}
        name={["end"]}
        className={HeaderCss.off_canvas}
        show={show}
        onHide={handleClose}
        scroll={true}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Mobile Menu Main Container */}
          <nav className={HeaderCss.mobile_menu}>
            <div className={HeaderCss.mobile_menu_main_container}>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Home
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/about">
                  About
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/blog">
                  Blog
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/contact_us">
                  Contact Us
                </Link>
              </div>

              <div className={HeaderCss.mobile_menu_div_container}>
                <Link
                  className={HeaderCss.top_header_a}
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <Button className={HeaderCss.signUpBtn} onClick={showModal}>
                      Log in & Sign up
                    </Button>
                  </Space>
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link
                  className={HeaderCss.top_header_a}
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <Button
                      className={HeaderCss.signUpBtn}
                      onClick={showRegisterRent}
                    >
                      Register to Rent
                    </Button>
                  </Space>
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link href="register_to_host">
                  <Button type="primary" className={HeaderCss.register_btn}>
                    Register To Host
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
