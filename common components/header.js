import React, { useState } from "react";
import HeaderCss from "../src/styles/Header.module.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import HeadPhoneIcon from "../public/headphones.svg";
import UserIcon from "../public/user icon.svg";
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
  return (
    <>
      <header>
        <Container>
          <nav className={HeaderCss.top_nav_bar_container}>
            <Row className={HeaderCss.top_nav_bar_row}>
              {/*//*  Off Canvas Btn  */}
              <Col xs={"auto"} className={HeaderCss.off_canvas_col}>
                <OffCanvasExample key={1} placement={["end"]} name={["end"]} />
              </Col>

              <Col xs={"auto"}>
                <span className={HeaderCss.headphones_icon}>
                  <Image src={HeadPhoneIcon} alt="headphones" />
                </span>
                <Link className={HeaderCss.top_header_a} href="/">
                  Help
                </Link>
              </Col>

              <Col xs={"auto"}>
                <Link className={HeaderCss.top_header_a} href="/">
                  Register to Rent
                </Link>
              </Col>

              <Col xs={"auto"}>
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
          </nav>
        </Container>
      </header>
    </>
  );
};

//** Off Canvas Function  **/
function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <UilAlignJustify size="40" onClick={handleShow} />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Mobile Menu Main Container */}
          <div className={HeaderCss.mobile_nav_links_main_container}>
            <Col md={"auto"}>
              <div className={HeaderCss.nav_links_div}>
                <Link className={HeaderCss.nav_links__a} href="/home">
                  About Us
                </Link>
              </div>
            </Col>
            <Col md={"auto"}>
              <div className={HeaderCss.nav_links_div}>
                <Link className={HeaderCss.nav_links__a} href="/home">
                  How it works
                </Link>
              </div>
            </Col>

            <Col md={"auto"}>
              <div className={HeaderCss.nav_links_div}>
                <Link
                  className={`${HeaderCss.nav_links__a} ${HeaderCss.stethoscope_link}`}
                  href="/home"
                >
                  For Doctors and Clinic
                </Link>
              </div>
            </Col>

            <Col md={"auto"}>
              <div className={HeaderCss.nav_links_div}>Book Now</div>
            </Col>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
