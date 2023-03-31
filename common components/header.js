import React, { useState } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { Button } from "antd";
import Image from "next/image";
import HeadPhoneIcon from "../public/headphones.svg";
import UserIcon from "../public/user icon.svg";
import Logo from "../public/logo.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { UilAlignJustify } from "@iconscout/react-unicons";

const Header = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Sign in to your account
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
  return (
    <>
      <header className={HeaderCss.header}>
        <Container className={HeaderCss.container_header}>
          <Row className={HeaderCss.top_nav_bar_main_row}>
            <Col xs={"auto"} className={HeaderCss.logo_container}>
              <Link href="/" className={HeaderCss.logo_container_a}>
                <Image src={Logo} alt="golfhom logo" width="200" />
              </Link>
            </Col>

            <Col xs={"auto"} className={HeaderCss.top_nav_bar_col}>
              <Row className={HeaderCss.top_nav_bar_row}>
                {/*//*  Off Canvas Btn  */}
                <Col xs={"auto"} className={`${HeaderCss.off_canvas_col} `}>
                  <OffCanvasExample
                    key={1}
                    placement={["end"]}
                    name={["end"]}
                  />
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

                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a
                      href="/"
                      className={HeaderCss.top_header_a}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        Log in & Sign up
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </Col>
              </Row>

              <Row className={HeaderCss.top_nav_bar_row}>
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
