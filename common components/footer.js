import React from "react";
import FooterCss from "./../src/styles/Footer.module.css";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import { Button } from "antd";
import FooterLogo from "../public/footer logo.svg";
import { Input } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import LinkedinIcon from "../public/linkedin.svg";
import FacebookIcon from "../public/facebook.svg";
import InstaIcon from "../public/insta.svg";
import YoutubeIcon from "../public/youtube.svg";
import PinterestIcon from "../public/pinterest.svg";
import TwittereIcon from "../public/twitter.svg";

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

            <Col md={5} className={FooterCss.footer_cols_text}>
              <div className={FooterCss.footer_divs_unorderdlist}>
                <ul className={FooterCss.nav_link_ul}>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Home
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/about" className={FooterCss.nav_link_a}>
                      About
                    </Link>
                  </li>

                  <li className={FooterCss.nav_link_li_blog}>
                    <Link href="/" className={FooterCss.nav_link_a}>
                      Golfom Blog & Press
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li_blog}>
                    <Link
                      href="/blog_and_podcast"
                      className={FooterCss.nav_link_a}
                    >
                      Partner Blogs and Podcasts!
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={FooterCss.footer_divs_unorderdlist}>
                <ul className={FooterCss.nav_link_ul}>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/faq" className={FooterCss.nav_link_a}>
                      FAQ’s
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/contact_us" className={FooterCss.nav_link_a}>
                      Contact Us
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link
                      href="/term_and_conditions"
                      className={FooterCss.nav_link_a}
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li className={FooterCss.nav_link_li}>
                    <Link href="/privacy" className={FooterCss.nav_link_a}>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={3} className={FooterCss.footer_cols}>
              <div className={FooterCss.footer_div_email}>
                <div className={FooterCss.newsletter_container}>
                  <h5 className={FooterCss.footer_headings}>
                    Subscribe for our newsletter
                  </h5>

                  <div className={FooterCss.input_container}>
                    <p className={FooterCss.input_title}>Email</p>
                    <Input
                      className={FooterCss.inputs}
                      size="large"
                      placeholder="Enter Your Email Please"
                      prefix={<MailOutlined />}
                    />
                  </div>


                </div>
              </div>

              <div className={FooterCss.footer_div_email}>
                <div className={FooterCss.sub_btn_container}>
                  <Button className={FooterCss.sub_btn} type="primary">
                    Subscribe
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Copyright Section */}
          <section className={FooterCss.copyright_section}>
            <Row className={FooterCss.copyright_section_row}>
              <Col md={6}>
                <p className={FooterCss.copyright_section_p}>
                  GOLFHŌM LLC &nbsp; - &nbsp; 2023 All rights reserved
                </p>
              </Col>

              <Col md={6} className={FooterCss.copyright_section_col_icon}>
                <div className={FooterCss.icons_container}>
                  <span className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.linkedin.com/company/golfh%C5%8Dm/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={LinkedinIcon}
                        className={FooterCss.social_icons}
                        alt="Linkedin"
                      />
                    </Link>
                  </span>

                  <span className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.facebook.com/golfhom1/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={FacebookIcon}
                        className={FooterCss.social_icons}
                        alt="Facebook"
                      />
                    </Link>
                  </span>

                  <span className={FooterCss.icons_spans}>
                    <Link
                      href="https://www.instagram.com/golfhom/"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={InstaIcon}
                        className={FooterCss.social_icons}
                        alt="Instagram"
                      />
                    </Link>
                  </span>
                  <span className={FooterCss.icons_spans}>
                    <Link
                      href="https://twitter.com/golfhom?s=20"
                      target="_blank"
                      className={FooterCss.icons_a}
                    >
                      <Image
                        src={TwittereIcon}
                        className={FooterCss.social_icons}
                        alt="Twitter"
                      />
                    </Link>
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
