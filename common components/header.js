/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { Button, Checkbox } from "antd";
import Image from "next/image";
import HeadPhoneIcon from "../public/headphones.svg";
import UserIcon from "../public/user icon.svg";
import Logo from "../public/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import { UilAlignJustify } from "@iconscout/react-unicons";

const Header = () => {
  // This part is comment out for confirmation

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
  };
  const handleRegister = () => {
    setIsModalOpens(false);
  };
  const handleCancelRegister = () => {
    setIsModalOpens(false);
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
            width={312}
          >
            <p className={HeaderCss.emailNumber}>Email or Member Number</p>
            <input className={HeaderCss.password} type="text"></input>
            <p className={HeaderCss.emailNumber}>Password</p>
            <input className={HeaderCss.password} type="password"></input>

            <div className={HeaderCss.remember}>
              <Checkbox className={HeaderCss.meBox}>Remember Me</Checkbox>
              <button className={HeaderCss.signIn}>Log In</button>
            </div>

            <div className={HeaderCss.forgotActive}>
              <Link
                href="/"
                className={HeaderCss.forgot}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <button
                    className={HeaderCss.signUpBtn}
                    onClick={showForgot}
                    onCancel={handleCancel}
                  >
                    Forgot Password ?
                  </button>
                </Space>
              </Link>

              <div className={HeaderCss.dont_link_parent}>
                <h6 className={HeaderCss.donthaveAcc}>
                  Don't you have an account?
                </h6>
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
            title="Register"
            footer={null}
            open={isModalOpens}
            onSignup={handleRegister}
            onCancel={handleCancelRegister}
            width={440}
            className={HeaderCss.headerReg}
          >
            <Col className={HeaderCss.inputParent}>
              <Row>
                <input
                  className={HeaderCss.inputA}
                  type="text"
                  placeholder="Enter User name"
                ></input>
              </Row>
              <hr />
              <Row>
                <input
                  className={HeaderCss.inputB}
                  type="email"
                  placeholder="Email"
                ></input>
              </Row>
              <hr />
              <Row>
                <input
                  className={HeaderCss.inputC}
                  type="password"
                  placeholder="Password"
                ></input>
              </Row>
              <hr />
              <Row>
                <input
                  className={HeaderCss.inputD}
                  type="password"
                  placeholder="Repeat Password"
                ></input>
              </Row>
            </Col>

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
            <h6 className={HeaderCss.forgotHeading}>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </h6>
            <input
              type="email"
              placeholder="Enter your user name or email"
              className={HeaderCss.forgotInput}
            ></input>
            <div className={HeaderCss.forgotBtn}>
              <Button className={HeaderCss.registBtn}>Register</Button>
            </div>
          </Modal>

          <Row className={HeaderCss.top_nav_bar_main_row}>
            <Col xs={"auto"} className={HeaderCss.logo_container}>
              <Link href="/" className={HeaderCss.logo_container_a}>
                <Image src={Logo} alt="golfhom logo" width="200" />
              </Link>
            </Col>

            <Col md={8} className={HeaderCss.top_nav_bar_col}>
              <Row className={HeaderCss.top_nav_bar_row}>
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
                  <Link className={HeaderCss.top_header_a} href="/">
                    Register to Rent
                  </Link>
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
                      <button
                        className={HeaderCss.signUpBtn}
                        onClick={showModal}
                      >
                        Log in & Sign up
                      </button>
                    </Space>
                  </Link>
                </Col>
              </Row>

              <Row
                className={`${HeaderCss.top_nav_bar_row} ${HeaderCss.register_host_btn_row}`}
              >
                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/">
                    Home
                  </Link>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/about">
                    About
                  </Link>
                </Col>
                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/blog">
                    Blog
                  </Link>
                </Col>
                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/contact_us">
                    Contact Us
                  </Link>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link href="/register_to_host">
                    <Button type="primary" className={HeaderCss.register_btn}>
                      Register To Host
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
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

  return (
    <>
      <div>
        <UilAlignJustify size="40" onClick={handleShow} />
      </div>
      <Offcanvas
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
                  Help
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Register to Rent
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Log in & Sign up
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Find & Reserve
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Vacations
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Special Offer’s
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Link className={HeaderCss.top_header_a} href="/">
                  About Golfhom
                </Link>
              </div>
              <div className={HeaderCss.mobile_menu_div_container}>
                <Button type="primary" className={HeaderCss.register_btn}>
                  Register To Host
                </Button>
              </div>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
