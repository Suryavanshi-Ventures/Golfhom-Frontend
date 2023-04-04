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

  return (
    <>
      <header className={HeaderCss.header}>
        <Container className={HeaderCss.container_header}>
          {/* -----------       SIGN UP SECTION        -----------------*/}

          <Modal
            title="Sign In to your account"
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
              <button className={HeaderCss.signIn}>Sign In</button>
            </div>

            <div className={HeaderCss.forgotActive}>
              <span>Forgot Password</span>
              <span className={HeaderCss.verticalBar}> | </span>
              <span>Active Online account</span>
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
                    Find & Reserve
                  </Link>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/">
                    Vacations
                  </Link>
                </Col>
                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/">
                    Special Offer’s
                  </Link>
                </Col>
                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Link className={HeaderCss.below_header_a} href="/">
                    About Golfhom
                  </Link>
                </Col>

                <Col xs={"auto"} className={HeaderCss.top_header_Col_container}>
                  <Button type="primary" className={HeaderCss.register_btn}>
                    Register To Host
                  </Button>
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
