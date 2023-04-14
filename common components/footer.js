import React from "react";
import FooterCss from "./../src/styles/Footer.module.css";
import Link from "next/link";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import { Button } from "antd";
import FooterLogo from "../public/footer logo.svg";
import { Input } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import LinkedinIcon from "../public/linkedin.svg";
import FacebookIcon from "../public/facebook.svg";
import InstaIcon from "../public/insta.svg";
import YoutubeIcon from "../public/youtube.svg";

const Footer = () => {
  return (
    <>
      <footer className={FooterCss.footer}>
        <Container className={FooterCss.footer_container}>
          <Row className={FooterCss.footer_row}>
            <Col md={4} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_divs}>
                <div className={FooterCss.footer_logo_container}>
                  <Image src={FooterLogo} alt="golfhom logo" />
                </div>
                <p className={FooterCss.footer_desc_p}>
                  Stay and play at luxe golf homes, villas and condos worldwide.
                  Search by course or tournament, book a tee time, ship your
                  clubs... enjoy!
                </p>
              </div>
            </Col>

            <Col md={4} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_divs}>
                <h5 className={FooterCss.footer_headings}>About Us</h5>
                <ul className={FooterCss.nav_link_ul}>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Home
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      About
                    </Link>
                  </li>

                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Golfom Blog & Press
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Partner Blogs and Podcasts!
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      FAQ’s
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Contact Us
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Terms and Conditions
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/privacy" className={FooterCss.nav_link_a}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Listings
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={4} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_divs}>
                <h5 className={FooterCss.footer_headings}>
                  Subscribe for our newsletter
                </h5>

                <div className={FooterCss.newsletter_container}>
                  <div className={FooterCss.input_container}>
                    <p className={FooterCss.input_title}>Name</p>
                    <Input
                      className={FooterCss.inputs}
                      size="large"
                      placeholder="Enter Your Name Please"
                      prefix={<UserOutlined />}
                    />
                  </div>

                  <div className={FooterCss.input_container}>
                    <p className={FooterCss.input_title}>Email</p>
                    <Input
                      className={FooterCss.inputs}
                      size="large"
                      placeholder="Enter Your Email Please"
                      prefix={<MailOutlined />}
                    />
                  </div>

                  <div className={FooterCss.sub_btn_container}>
                    <Button className={FooterCss.sub_btn} type="primary">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Copyright Section */}
          <section className={FooterCss.copyright_section}>
            <Row className={FooterCss.copyright_section_row}>
              <Col md={6}>
                <p className={FooterCss.copyright_section_p}>
                  GOLFHŌM LLC - @2021All rights reserved
                </p>
              </Col>

              <Col md={6} className={FooterCss.copyright_section_col_icon}>
                <div className={FooterCss.icons_container}>
                  <span className={FooterCss.icons_spans}>
                    <a href="/" target="_blank" className={FooterCss.icons_a}>
                      <Image
                        src={LinkedinIcon}
                        className={FooterCss.social_icons}
                      />
                    </a>
                  </span>

                  <span className={FooterCss.icons_spans}>
                    <a href="/" target="_blank" className={FooterCss.icons_a}>
                      <Image
                        src={FacebookIcon}
                        className={FooterCss.social_icons}
                      />
                    </a>
                  </span>

                  <span className={FooterCss.icons_spans}>
                    <a href="/" target="_blank" className={FooterCss.icons_a}>
                      <Image
                        src={InstaIcon}
                        className={FooterCss.social_icons}
                      />
                    </a>
                  </span>
                  <span className={FooterCss.icons_spans}>
                    <a href="/" target="_blank" className={FooterCss.icons_a}>
                      <Image
                        src={YoutubeIcon}
                        className={FooterCss.social_icons}
                      />
                    </a>
                  </span>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
