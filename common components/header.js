/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Container, Col, Row } from "react-bootstrap";
import { Button, Checkbox, Input, Form, message } from "antd";
import Image from "next/image";
import HeadPhoneIcon from "../public/headphones.svg";
import UserIcon from "../public/user icon.svg";
import Logo from "../public/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { DownOutlined, ContactsFilled } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import { UilAlignJustify } from "@iconscout/react-unicons";
import axios from "axios";
import GolfHomMobileMenuLogo from "../public/images/GOLFHOM-Logo-mobile-menu.webp";
import MobileMenuHomeLogo from "../public/images/vector/home.svg";
import ProfileIcon from "../public/images/vector/profile_icon.png";
import ProfileIconMobileMenu from "../public/images/vector/profile_loggedin.png";
import ReservationIconMobileMenu from "../public/images/vector/reservation_loggedin.png";
import FavIconMobileMenu from "../public/images/vector/favourite_loggedin.png";
import InvoiceIconMobileMenu from "../public/images/vector/invoice_loggedin.png";
import MessageIconMobileMenu from "../public/images/vector/messages_loggedin.png";
import LogoutIconMobileMenu from "../public/images/vector/logout_loggedin.png";
import { AuthContext } from "@/context/auth_context";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Register from "../public/images/vector/registerToRent.svg";
import Login from "../public/images/vector/log&signup.svg";
import Blog from "../public/images/vector/Blog.svg";
import About from "../public/images/vector/About.svg";

const Header = ({ name, ...props }) => {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [UserName, SetUserName] = useState("");
  const [loadings, setLoadings] = useState(false);

  const ContextUserDetails = useContext(AuthContext);

  useEffect(() => {
    ContextUserDetails.setUserState(
      sessionStorage.getItem("token") || localStorage.getItem("token")
    );

    if (ContextUserDetails.UserState != null) {
      SetIsLoggedIn(true);
    }
    if (!UserName) {
      SetUserName(
        sessionStorage.getItem("Uname") || localStorage.getItem("Uname")
      );
    }

    return () => {};
  }, [ContextUserDetails]);

  // console.log(ContextUserDetails, "CONTAXT USER DETAILS");

  {
    /* -----------       SIGN UP SECTION        -----------------*/
  }

  //! SIGNUP & LOGIN FORM INSTANCE
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  //* REGISTER BTN DISABLED
  const [IsRegisterBtnDisable, SetRegisterBtnDisable] = useState(false);

  // LOGIN MODAL FOR LARGE DEVICES

  const [loginModalLgDevice, setLoginModalLgDevice] = useState(false);
  const loginLgDevice = () => {
    setLoginModalLgDevice(true);
    setShowMobileMenu(false);
  };
  const handleLoginLgDevice = () => {
    setLoginModalLgDevice(false);
  };
  const handleCancel = () => {
    setLoginModalLgDevice(false);
  };

  {
    /* -----------      REGISTER SECTION IN LARGE Device      -----------------*/
  }

  const [registerModaInLgDevice, setRegisterModaInLgDevice] = useState(false);
  const registerLgDevice = () => {
    setRegisterModaInLgDevice(true);
    handleCancel();
  };
  const handleRegisterLgDevice = () => {
    setRegisterModaInLgDevice(false);
  };
  const handleCancelRegisterLgDevice = () => {
    setRegisterModaInLgDevice(false);
  };

  //! SIGNUP API FUNCTION
  const onSubmitSignup = async (values) => {
    setLoadings(true);
    try {
      //! SIGNUP API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/signup`,
        {
          username: values.user_name,
          email: values.email,
          password: values.password,
        }
      );

      //* Close Register Modal on Success Signup
      if (response.status === 201) {
        setLoadings(true);
        ContextUserDetails.setUserState(response.data.token);
        setLoginModalLgDevice(false);
        SetIsLoggedIn(true);
        handleCancelRegisterLgDevice();
        setLoadings(false);
        sessionStorage.setItem("token", response.data.token);
        //! User Get Profile API Call
        const Token = response.data.token;
        const User = axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
          { headers: { Authorization: `Bearer ${Token}` } }
        );
        User.then((response) => {
          if (response.status === 200) {
            console.log(response, "user authenticated");
            const LoggedInUserName = response.data.data.user.username;
            sessionStorage.setItem("Uname", LoggedInUserName);
            SetUserName(LoggedInUserName);
          }
        }).catch((error) => {
          message.error(error.response.data.message);
        });
        message.success(response.data.message);
      }
    } catch (error) {
      console.log("Sigup error: ", error);
      setLoadings(false);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred during signup.";
      message.error(errorMessage);
    }
    // console.log(values);
  };

  //! LOGIN API FUNCTION
  const onSubmitLogin = async () => {
    setLoadings(true);
    try {
      // LOGIN FIELDS VALUES
      const LoginEmail = form2.getFieldValue("email_login");
      const LoginPassword = form2.getFieldValue("password_login");
      const RememberMe = form2.getFieldValue("remember_me");

      //! LOGIN API CALL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/login`,
        {
          email: LoginEmail,
          password: LoginPassword,
        }
      );

      //* IF LOGIN SUCCESSFUL
      if (response.status === 200) {
        ContextUserDetails.setUserState(response.data.token);
        setLoginModalLgDevice(false);
        SetIsLoggedIn(true);
        setLoadings(false);

        if (!RememberMe) {
          sessionStorage.setItem("token", response.data.token);
        } else {
          localStorage.setItem("token", response.data.token);
        }
        message.success(response.data.message);

        //! User Get Profile API Call
        const Token = response.data.token;
        const User = axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
          { headers: { Authorization: `Bearer ${Token}` } }
        );
        User.then((response) => {
          if (response.status === 200) {
            console.log(response, "user authenticated");
            const LoggedInUserName = response.data.data.user.username;

            if (!RememberMe) {
              sessionStorage.setItem("Uname", LoggedInUserName);
            } else {
              localStorage.setItem("Uname", LoggedInUserName);
            }

            if (
              localStorage.getItem("Uname") ||
              sessionStorage.getItem("Uname") != ""
            ) {
              SetUserName(LoggedInUserName);
            }
          }
        }).catch((error) => {
          message.error(error.response.data.message);
        });
      } else {
        message.error("Invalid login credentials!");
        setLoadings(false);
      }
    } catch (err) {
      //* IF LOGIN FAILED
      message.error("Something went wrong!");
      setLoadings(false);
    }
  };

  {
    /* -----------      REGISTER TO RENT SECTION  IN LARGE DEVICE      -----------------*/
  }

  const [registerToRentModalgDevice, setRegisterToRentModalgDevice] =
    useState(false);
  const registerToRentLgDevice = () => {
    setRegisterToRentModalgDevice(true);
    handleCancel();
  };
  const handleRegisterToRentLgDevice = () => {
    setRegisterToRentModalgDevice(false);
  };
  const handleCancelRegisterToRentLgDevice = () => {
    setRegisterToRentModalgDevice(false);
  };

  {
    /* -----------      FORGET PASSWORD SECTION IN LARGE DEVICE       -----------------*/
  }

  const [forgotModalLgDevice, setForgotModalLgDevice] = useState(false);
  const forgotLgDevice = () => {
    setForgotModalLgDevice(true);
    handleCancel();
  };
  const handleForgotLgDevice = () => {
    setForgotModalLgDevice(false);
  };
  const handleCancelForgotLgDevice = () => {
    setForgotModalLgDevice(false);
  };

  // DROPDOWN CONTENT

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  //!------------------------------------------------------------------

  const [ShowMobileMenu, setShowMobileMenu] = useState(false);
  const CloseOffCanvas = () => setShowMobileMenu(false);
  const HamburgerMenuMobileBtn = () => setShowMobileMenu(true);

  {
    /* -----------       MOBILE LOGIN SECTION        -----------------*/
  }

  const [loginOpenInMobile, setLoginOpenInMobile] = useState(false);

  const showLoginModalMobile = () => {
    setLoginOpenInMobile(true);
  };
  const handleLoginInMobile = () => {
    setLoginOpenInMobile(false);
  };
  const handleCancelMobile = () => {
    setLoginOpenInMobile(false);
  };

  {
    /* -----------      REGISTER SECTION IN MOBILE       -----------------*/
  }

  const [registerInMobile, setRegisterInMobile] = useState(false);
  const showRegisterInMobile = () => {
    setRegisterInMobile(true);
    handleCancelMobile();
  };
  const handleRegisterInMobile = () => {
    setRegisterInMobile(false);
  };
  const handleCancelRegisterInMobile = () => {
    setRegisterInMobile(false);
  };

  {
    /* -----------      REGISTER TO RENT IN MOBILE SECTION        -----------------*/
  }

  const [mobileRegisterToRentModal, setMobileRegisterToRentModal] =
    useState(false);
  const mobileRegistertoRent = () => {
    setMobileRegisterToRentModal(true);
    handleCancelMobile();
  };
  const handleRegistertoRentInMobile = () => {
    setMobileRegisterToRentModal(false);
  };
  const handleCancelRegistertoRentInMobile = () => {
    setMobileRegisterToRentModal(false);
  };

  {
    /* -----------      FORGET PASSWORD IN MOBILE SECTION        -----------------*/
  }

  const [forgetModalInMobile, setForgetModalInMobile] = useState(false);
  const forgotInMobile = () => {
    setForgetModalInMobile(true);
    handleCancelMobile();
  };
  const handleForgotInMobile = () => {
    setForgetModalInMobile(false);
  };
  const handleCancelForgotInMobile = () => {
    setForgetModalInMobile(false);
  };

  // SELECTED OPTION FEATURE IS FOR REGISTER TO RENT DROPDOWN
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //!----------------------------------------------------------------
  const Logout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    sessionStorage.removeItem("Uname");
    localStorage.removeItem("Uname");
    SetIsLoggedIn(false);
    message.success("Logout successfully!");
    ContextUserDetails.setUserState(null);
    setShowMobileMenu(false);
  };

  return (
    <>
      <header className={HeaderCss.header}>
        <Container className={HeaderCss.container_header}>
          {/* -----------       LOGIN SECTION IN LARGE DEVICE        -----------------*/}
          <Modal
            title="Log In to your account"
            footer={null}
            open={loginModalLgDevice}
            onSignup={handleLoginLgDevice}
            onCancel={handleCancel}
            width={372}
            centered={true} // Enable centering
          >
            <div className={HeaderCss.textParent}>
              <Form
                form={form2}
                layout="vertical"
                name="login_form"
                scrollToFirstError
              >
                {/* EMAIL */}
                <Form.Item
                  name="email_login"
                  label="Email or Member Number"
                  className={HeaderCss.form_items_login}
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
                    name="email_login"
                    placeholder="Enter Email"
                    className={HeaderCss.password}
                  />
                </Form.Item>

                {/* PASSWORD */}
                <Form.Item
                  name="password_login"
                  label="Password"
                  className={HeaderCss.form_items_login}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password_login"
                    placeholder="Enter Password"
                    className={HeaderCss.password}
                  />
                </Form.Item>

                <div className={HeaderCss.remember}>
                  <Form.Item
                    className={HeaderCss.form_items_checkbox}
                    name="remember_me"
                    valuePropName="checked"
                  >
                    <Checkbox className={HeaderCss.meBox} name="remember_me">
                      Remember Me
                    </Checkbox>
                  </Form.Item>

                  <Button
                    onClick={onSubmitLogin}
                    htmlType="submit_login"
                    className={HeaderCss.signIn}
                    loading={loadings}
                  >
                    Log In
                  </Button>
                </div>
              </Form>
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
                    onClick={forgotLgDevice}
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
                    <span
                      className={HeaderCss.register}
                      onClick={registerLgDevice}
                    >
                      Register
                    </span>
                  </Space>
                </Link>
              </div>
            </div>
          </Modal>

          {/* -----------       LOGIN SECTION IN MOBILE        -----------------*/}

          <Offcanvas
            key={1}
            placement={["end"]}
            name={["end"]}
            className={HeaderCss.off_canvas}
            show={ShowMobileMenu}
            onHide={CloseOffCanvas}
            scroll={true}
            {...props}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <div className={HeaderCss.mobile_menu_logo_container}>
              <Image src={GolfHomMobileMenuLogo} alt="Golfhom logo"></Image>
            </div>
            <Offcanvas.Body>
              {/* Mobile Menu Main Container */}
              {IsLoggedIn ? (
                <div className={HeaderCss.mobile_dropdown_parent_div}>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard"
                            >
                              {" "}
                              <Image
                                src={MobileMenuHomeLogo}
                                alt="home icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Dashboard
                            </Link>
                          ),
                          key: "1",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard/user_profile"
                            >
                              {" "}
                              <Image
                                src={ProfileIconMobileMenu}
                                alt="profile icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Profile
                            </Link>
                          ),
                          key: "2",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard/reservation"
                            >
                              {" "}
                              <Image
                                src={ReservationIconMobileMenu}
                                alt="reservation icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Reservation
                            </Link>
                          ),
                          key: "3",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard/favorites"
                            >
                              {" "}
                              <Image
                                src={FavIconMobileMenu}
                                alt="favorite icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Favorites
                            </Link>
                          ),
                          key: "4",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard/invoice"
                            >
                              {" "}
                              <Image
                                src={InvoiceIconMobileMenu}
                                alt="invoice icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Invoices
                            </Link>
                          ),
                          key: "5",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/dashboard/messages"
                            >
                              {" "}
                              <Image
                                src={MessageIconMobileMenu}
                                alt="message icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Message
                            </Link>
                          ),
                          key: "6",
                        },

                        {
                          type: "divider",
                        },
                        {
                          label: (
                            <Link
                              className={
                                HeaderCss.top_header_menu_logggedin_link
                              }
                              href="/"
                              onClick={() => {
                                Logout();
                              }}
                            >
                              {" "}
                              <Image
                                src={LogoutIconMobileMenu}
                                alt="logout icon"
                                width={18}
                                height={18}
                                className={
                                  HeaderCss.top_header_menu_logggedin_link_icons
                                }
                              ></Image>
                              Logout
                            </Link>
                          ),
                          key: "8",
                        },
                      ],
                    }}
                  >
                    <Link
                      href="/"
                      className={HeaderCss.top_header_logggedin_link_mobile}
                    >
                      <Space
                        className={HeaderCss.top_header_logggedin_space_mobile}
                      >
                        {UserName
                          ? UserName.charAt(0).toUpperCase() + UserName.slice(1)
                          : "Anyonums "}
                        <Image
                          width={20}
                          height={20}
                          src={ProfileIcon}
                          alt="profile icon"
                        ></Image>
                      </Space>
                    </Link>
                  </Dropdown>
                </div>
              ) : (
                ""
              )}

              {/* HEADER SECTION NAVBAR IN LARGE DEVICE */}
              <nav className={HeaderCss.mobile_menu}>
                <div className={HeaderCss.mobile_menu_main_container}>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={MobileMenuHomeLogo} alt="home icon"></Image>
                    <Link className={HeaderCss.top_header_a} href="/">
                      Home
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={About} alt="About" width={20} height={20} />
                    <Link className={HeaderCss.top_header_a} href="/about">
                      About
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image src={Blog} alt="Blog" width={20} height={20} />
                    <Link className={HeaderCss.top_header_a} href="/blog">
                      Blog
                    </Link>
                  </div>
                  <div className={HeaderCss.mobile_menu_div_container}>
                    {
                      <ContactsFilled
                        size={80}
                        className={HeaderCss.contactFill}
                      />
                    }
                    <Link className={HeaderCss.top_header_a} href="/contact_us">
                      Contact Us
                    </Link>
                  </div>

                  {/* MOBILE LOGIN MODAL BTN */}
                  {!IsLoggedIn && (
                    <div className={HeaderCss.mobile_menu_div_container}>
                      <Image src={UserIcon} alt="user icon" />

                      <Link
                        className={HeaderCss.top_header_a}
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          <Button
                            className={HeaderCss.signUpBtn}
                            onClick={loginLgDevice}
                          >
                            Log in & Sign up
                          </Button>
                        </Space>
                      </Link>
                    </div>
                  )}

                  {/* MOBILE REGISTER MODAL BTN */}
                  <div className={HeaderCss.mobile_menu_div_container}>
                    <Image
                      src={Register}
                      alt="Register"
                      width={20}
                      height={20}
                    />
                    <Link
                      className={HeaderCss.top_header_a}
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        <Button
                          className={HeaderCss.signUpBtn}
                          onClick={mobileRegistertoRent}
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

          {/* -----------      REGISTER SECTION IN LARGE DEVICE       -----------------*/}
          <Modal
            title="Register"
            footer={null}
            open={registerModaInLgDevice}
            onSignup={handleRegisterLgDevice}
            onCancel={handleCancelRegisterLgDevice}
            width={440}
            centered={true} // Enable centering
            className={HeaderCss.headerReg}
          >
            <Form
              onFinish={onSubmitSignup}
              form={form1}
              name="register_form"
              scrollToFirstError
              onFinishFailed={(failure) => {
                console.log(failure);
              }}
            >
              <Col className={HeaderCss.inputParent}>
                {/*  FORM VALIDATION SIGNUP */}
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
                    prefix={<UserOutlined />}
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
                    prefix={<MailOutlined />}
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
                    {
                      min: 5,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="password"
                    prefix={<LockOutlined />}
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
                    prefix={<LockOutlined />}
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
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept Terms & Conditions")
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
                    disabled={IsRegisterBtnDisable}
                    htmlType="submit_signup"
                    loading={loadings}
                    className={HeaderCss.registerBtn}
                  >
                    Register
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>

          {/* -----------       FORGET PASSWORD SECTION IN LARGE DEVICE     -----------------*/}

          <Modal
            title="Forgot Password"
            footer={null}
            open={forgotModalLgDevice}
            onSignup={handleForgotLgDevice}
            onCancel={handleCancelForgotLgDevice}
            width={800}
            centered={true} // Enable centering
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

          {/* PROFILE DROPDOWN IN LARGE DEVICE */}
          <Row className={HeaderCss.top_nav_bar_main_row}>
            <div>
              <Row
                className={`${HeaderCss.top_nav_bar_row} ${HeaderCss.register_host_btn_row}`}
              >
                <Col xs={"auto"} className={HeaderCss.logo_container}>
                  <Link href="/" className={HeaderCss.logo_container_a}>
                    <Image src={Logo} alt="golfhom logo" width="200" />
                  </Link>
                </Col>

                <Col
                  md={5}
                  xs={"auto"}
                  className={HeaderCss.top_header_register_host_col_container}
                >
                  <Row className={HeaderCss.top_header_row_container}>
                    {/*//*  Off Canvas Btn  */}
                    <Col xs={"auto"} className={`${HeaderCss.off_canvas_col} `}>
                      {/* MOBILE HAMBURGER MENU BTN */}
                      <UilAlignJustify
                        size="40"
                        onClick={HamburgerMenuMobileBtn}
                      />
                    </Col>

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

                    {/* LOGGED IN USER PROFILE MENU */}
                    {IsLoggedIn ? (
                      <Col
                        xs={"auto"}
                        className={HeaderCss.top_header_Col_container}
                      >
                        <Dropdown
                          menu={{
                            items: [
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard"
                                  >
                                    {" "}
                                    <Image
                                      src={MobileMenuHomeLogo}
                                      alt="home icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Dashboard
                                  </Link>
                                ),
                                key: "1",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard/user_profile"
                                  >
                                    {" "}
                                    <Image
                                      src={ProfileIconMobileMenu}
                                      alt="profile icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Profile
                                  </Link>
                                ),
                                key: "2",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard/reservation"
                                  >
                                    {" "}
                                    <Image
                                      src={ReservationIconMobileMenu}
                                      alt="reservation icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Reservation
                                  </Link>
                                ),
                                key: "3",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard/favorites"
                                  >
                                    {" "}
                                    <Image
                                      src={FavIconMobileMenu}
                                      alt="favorite icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Favorites
                                  </Link>
                                ),
                                key: "4",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard/invoice"
                                  >
                                    {" "}
                                    <Image
                                      src={InvoiceIconMobileMenu}
                                      alt="invoice icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Invoices
                                  </Link>
                                ),
                                key: "5",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/dashboard/messages"
                                  >
                                    {" "}
                                    <Image
                                      src={MessageIconMobileMenu}
                                      alt="message icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Message
                                  </Link>
                                ),
                                key: "6",
                              },

                              {
                                type: "divider",
                              },
                              {
                                label: (
                                  <Link
                                    className={
                                      HeaderCss.top_header_menu_logggedin_link
                                    }
                                    href="/"
                                    onClick={() => {
                                      Logout();
                                    }}
                                  >
                                    {" "}
                                    <Image
                                      src={LogoutIconMobileMenu}
                                      alt="logout icon"
                                      width={18}
                                      height={18}
                                      className={
                                        HeaderCss.top_header_menu_logggedin_link_icons
                                      }
                                    ></Image>
                                    Logout
                                  </Link>
                                ),
                                key: "7",
                              },
                            ],
                          }}
                        >
                          <Link
                            href="/"
                            className={HeaderCss.top_header_logggedin_link}
                          >
                            <Space
                              className={HeaderCss.top_header_logggedin_space}
                            >
                              {UserName
                                ? UserName.charAt(0).toUpperCase() +
                                  UserName.slice(1)
                                : "Anyonums "}
                              <Image
                                width={20}
                                height={20}
                                src={ProfileIcon}
                                alt="profile icon"
                              ></Image>
                            </Space>
                          </Link>
                        </Dropdown>
                      </Col>
                    ) : (
                      <>
                        {/* <Col
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
                        <Col
                          xs={"auto"}
                          className={HeaderCss.top_header_Col_container}
                        >
                          <Link
                            href="/"
                            className={HeaderCss.top_header_a}
                            onClick={(e) => e.preventDefault()}
                          >
                            <Space>
                              <Button
                                className={HeaderCss.signUpBtn}
                                onClick={loginLgDevice}
                              >
                                Log in & Sign up
                              </Button>
                            </Space>
                          </Link>
                        </Col> */}
                      </>
                    )}
                  </Row>
                </Col>

                {IsLoggedIn ? (
                  ""
                ) : (
                  <Col
                    xs={"auto"}
                    className={HeaderCss.top_header_Col_container}
                  >
                    <Row>
                      {/* LOGIN SIGNUP AFTER USER IS LOGGED IN */}
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
                      <Col
                        xs={"auto"}
                        className={HeaderCss.top_header_Col_container}
                      >
                        <Link
                          href="/"
                          className={HeaderCss.top_header_a}
                          onClick={(e) => e.preventDefault()}
                        >
                          <Space>
                            <Button
                              className={HeaderCss.signUpBtn}
                              onClick={loginLgDevice}
                            >
                              Log in & Sign up
                            </Button>
                          </Space>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

//** Off Canvas Function  **/
function OffCanvasExample() {
  return <></>;
}

export default Header;
