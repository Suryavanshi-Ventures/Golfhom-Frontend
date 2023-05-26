import { useState, React, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Button, Dropdown } from "react-bootstrap";
import ViewPropertyCss from "../../../styles/ViewProperty.module.css";
import Image from "next/image";
import GirlGroupBannerImage from "../../../../public/images/group_girls_banner.svg";
import { Checkbox, Input, Modal, Space, Tabs, message } from "antd";
import TabContentOverview from "../tab_content_overview";
import Carousel from "react-bootstrap/Carousel";
import CarouselGalleryImg from "../../../../public/images/view_prop_gallery_img_1.svg";
import { DatePicker } from "antd";
import FeatureTickIcon from "../../../../public/images/vector/feature_tick.svg";
import PriceSquareIcon from "../../../../public/images/vector/price_square_icon.svg";
import RulesCrossIcon from "../../../../public/images/vector/rules_cross_icon.svg";
import Calendar from "../../../../public/images/vector/calendar.svg";
import BottomSection from "../../../../common components/bottomGroup";
import Blacktick from "../../../../public/images/vector/blackTick.svg";
import ViewPropMap from "../../../../public/images/view_prop_Map.svg";
import Map from "../../../../common components/map";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
const { TextArea } = Input;
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_KEY}`);
const { RangePicker } = DatePicker;
import Checkout from "./checkout";
import moment from "moment";

const ViewProperty = () => {
  const ContextUserDetails = useContext(AuthContext);
  const router = useRouter();
  const PropertyId = router.query.property_id; // Access the ID from the URL
  const [SpecificPropAPIData, SetSpecificPropAPIData] = useState({});
  const [BookingDate, SetBookingDate] = useState([]);
  const [PaymentIntentObject, setPaymentIntentObject] = useState(null);
  const [Options, setOptions] = useState(null);

  useEffect(() => {
    const UrlParamId = window.location.pathname.split("/")[3];
    const SpecificPropData = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property/${
        PropertyId || UrlParamId
      }`
    );

    SpecificPropData.then((response) => {
      if (response.status === 200) {
        SetSpecificPropAPIData(response.data.data);
      }
    }).catch((err) => {
      console.log(err, "ERR");
    });

    return () => {};
  }, [PropertyId]);

  useEffect(() => {
    if (PaymentIntentObject != null) {
      setOptions(PaymentIntentObject);
    }

    return () => {};
  }, [PaymentIntentObject]);

  const onTabChange = (key) => {
    console.log(key);
  };

  console.log(SpecificPropAPIData, "FROM VIEW PROP");
  const items = [
    {
      key: "1",
      label: `Overview`,
      children: <TabContentOverview data={SpecificPropAPIData} />,
    },
    {
      key: "2",
      label: `Gallery`,
      children: (
        <>
          <h1>Test Gallery</h1>
        </>
      ),
    },
    {
      key: "3",
      label: `Features`,
      children: `Content of Tab Pane 3`,
    },
  ];

  // FOR ADULT BUTTON INCREMENT AND DECREMENT
  const [adult, setAdult] = useState(0);

  const incAdult = () => {
    setAdult(adult + 1);
  };

  const decAdult = () => {
    if (adult > 0) {
      setAdult(adult - 1);
    } else {
      alert("Sorry Could not take negative value ");
      setAdult(0);
    }
  };

  // FOR CHILD BUTTON INCREMENT AND DECREMENT

  const [child, setChild] = useState(0);

  const incChild = () => {
    setChild(child + 1);
  };

  const decChild = () => {
    if (child > 0) {
      setChild(child - 1);
    } else {
      alert("Sorry Could not take negative value ");
      setChild(0);
    }
  };

  {
    /* -----------      CONTACT THE HOST SECTION        -----------------*/
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showContact = () => {
    setIsModalOpen(true);
    // handleCancel();
  };
  const handleContact = () => {
    setIsModalOpen(false);
  };
  const handleCancelContact = () => {
    setIsModalOpen(false);
  };

  const CreatePatymentIntent = async () => {
    const PaymentRes = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/booking/paymentintent`,
      {
        propertyId: SpecificPropAPIData.id,
        from: BookingDate[0],
        to: BookingDate[1],
      },
      {
        headers: {
          Authorization: `Bearer ${ContextUserDetails.UserState}`,
        },
      }
    );
    PaymentRes.then((response) => {
      if (response.status === 200) {
        message.info("Please fill the details and click on pay!");
        console.log("RESPONSE PAYMENT INTENT", response.data.paymentIntent);
        setPaymentIntentObject({
          ClientSecret: response.data.paymentIntent.client_secret,
          PaymentIntentId: response.data.paymentIntent.id,
        });
      }
    }).catch((err) => {
      message.error(
        err.response.data.message + ", Please login to book hotels!"
      );
      console.log("ERROR IN PAYMENT INTENT", err.response.data.message);
    });
  };

  const BookingHotelDone = () => {
    // const BookingRes = axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/booking`,
    //   {
    //     propertyId: SpecificPropAPIData.id,
    //     from: BookingDate[0],
    //     to: BookingDate[1],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${ContextUserDetails.UserState}`,
    //     },
    //   }
    // );
  };

  const OnChangeDateInput = (date, DateValue) => {
    SetBookingDate(DateValue);
  };

  return (
    <>
      <Head>
        <title>Golfhom | View Property</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* VIEW PROPERTY PAGE STARTED HERE */}
      <main className={ViewPropertyCss.view_prop_bannerimg_section}>
        <div className={ViewPropertyCss.view_prop_bannerimg_container}>
          <Image
            alt="Golf group"
            className={ViewPropertyCss.view_prop_bannerimg}
            src={SpecificPropAPIData.imageUrl || GirlGroupBannerImage}
            fill
          ></Image>
        </div>

        {/* PROP AMENITITES SECTION START HERE */}
        <Container>
          <Row className={ViewPropertyCss.parentRow}>
            <Col md={8}>
              <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
            </Col>

            {/*  ------------    Total price box    ----------   */}
            <Col md={4} className={ViewPropertyCss.backgroundWhite}>
              <div className={ViewPropertyCss.totalParent}>
                <div className={ViewPropertyCss.totalPrice}>
                  <div className={ViewPropertyCss.totalTitle}>
                    <h4>
                      Total <br /> Price
                    </h4>
                  </div>
                  <div className={ViewPropertyCss.amount}>
                    <h5>${SpecificPropAPIData.price}</h5>
                  </div>
                </div>

                <div className={ViewPropertyCss.bookParent}>
                  <Button
                    className={ViewPropertyCss.bookNow}
                    onClick={CreatePatymentIntent}
                  >
                    Book now
                  </Button>
                </div>
              </div>
              <hr className={ViewPropertyCss.horizonaline} />
              <div className={ViewPropertyCss.inner_input_date_picker}>
                <RangePicker
                  size="large"
                  style={{ width: "100%" }}
                  onChange={OnChangeDateInput}
                  disabledDate={(current) => {
                    return current && current < moment().endOf("day");
                  }}
                  onC
                  className={ViewPropertyCss.inner_input_date_picker}
                />
              </div>
              <hr />

              <Dropdown>
                <Dropdown.Toggle
                  className={ViewPropertyCss.guest}
                  id="dropdown-basic"
                >
                  Guest
                </Dropdown.Toggle>

                <Dropdown.Menu className={ViewPropertyCss.adultChild}>
                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-1">
                        {" "}
                        <h5 className={ViewPropertyCss.ageName}>
                          {adult} Adults
                        </h5>
                      </Dropdown.Item>
                    </div>
                    <div>
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decAdult}
                        >
                          -
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incAdult}
                        >
                          +
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-2">
                        {" "}
                        <h5 className={ViewPropertyCss.ageName}>
                          {child} Children
                        </h5>
                      </Dropdown.Item>
                    </div>
                    <div>
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decChild}
                        >
                          -
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incChild}
                        >
                          +
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.applyParent}>
                    <Button className={ViewPropertyCss.apply}>Apply</Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <hr />

              <div className={ViewPropertyCss.checkParent}>
                <Button className={ViewPropertyCss.check}>
                  Check availability
                </Button>
              </div>

              <div className={ViewPropertyCss.contactParent}>
                {/* -----------      CONTACT TO HOST SECTION        -----------------*/}
                <Modal
                  title="Contact to host"
                  footer={null}
                  open={isModalOpen}
                  onSignup={handleContact}
                  onCancel={handleCancelContact}
                  width={440}
                  className={ViewPropertyCss.headerReg}
                >
                  <Col className={ViewPropertyCss.inputParent}>
                    <div>
                      <Input
                        className={ViewPropertyCss.inputA}
                        type="text"
                        placeholder="Name"
                      />
                    </div>

                    <div>
                      <Input
                        className={ViewPropertyCss.inputB}
                        type="email"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <Input
                        className={ViewPropertyCss.inputC}
                        type="tel"
                        placeholder="Phone Number"
                      />
                    </div>

                    <div className={ViewPropertyCss.inputDParent}>
                      <TextArea
                        className={ViewPropertyCss.inputD}
                        type="address"
                        placeholder="Message"
                      />
                    </div>
                  </Col>

                  <Row>
                    <div className={ViewPropertyCss.agreeBox}>
                      <Checkbox className={ViewPropertyCss.agreeOptionB}>
                        I agree with your Privacy Policy
                      </Checkbox>
                    </div>
                  </Row>

                  <Link
                    href="/"
                    className={ViewPropertyCss.registerLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className={ViewPropertyCss.registBtnParent}>
                      <Button className={ViewPropertyCss.registerBtn}>
                        Submit
                      </Button>
                    </div>
                  </Link>
                </Modal>
                <Space>
                  <Button
                    className={ViewPropertyCss.contact}
                    onClick={showContact}
                  >
                    Contact to host
                  </Button>
                </Space>
              </div>
              {Options != null && (
                <>
                  {console.log(Options, "LOGGGG FROM ELEMENT")}
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: Options.ClientSecret }}
                  >
                    <Checkout />
                    <PaymentElement />
                  </Elements>
                </>
              )}
            </Col>
          </Row>
        </Container>

        {/* CARASOUL SECTION STARTS HERE */}
        <section className={ViewPropertyCss.carasoul_section}>
          <Carousel>
            {SpecificPropAPIData?.otherImageUrls?.map(
              (OtherImage, OtherImageUrlIndex) => {
                return (
                  <Carousel.Item key={OtherImageUrlIndex}>
                    <Image
                      className={ViewPropertyCss.carasoul_images}
                      fill
                      src={OtherImage}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              }
            )}
          </Carousel>
        </section>

        {/* FEATURE SECTION STARTS HERE */}
        <section className={ViewPropertyCss.feature_section}>
          <Container>
            <h5 className={ViewPropertyCss.feature_section_heading}>
              Features
            </h5>
            <Row>
              <Col md={4}>
                {SpecificPropAPIData?.amenities?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={ViewPropertyCss.feature_section_div_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.feature_section_tick_icon_container
                        }
                      >
                        <Image
                          width={24}
                          height={24}
                          src={FeatureTickIcon}
                          alt="features of golfhom"
                        ></Image>
                      </div>

                      <p className={ViewPropertyCss.feature_section_text}>
                        {data}
                      </p>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Container>
        </section>

        {/* MAP SECTION STARTS HERE */}
        <section className={ViewPropertyCss.map_section}>
          <Container>
            <div className={ViewPropertyCss.map_section_main_container}>
              <Map data={[SpecificPropAPIData]} />
            </div>
          </Container>
        </section>

        {/* VIDEO SECTION STARTS HERE */}
        <section className={ViewPropertyCss.video_section}>
          <Container>
            <h5 className={ViewPropertyCss.feature_section_heading}>Video</h5>
            <div className={ViewPropertyCss.video_section_container}>
              <iframe
                width="100%"
                height="100%"
                src={
                  SpecificPropAPIData.videoUrl
                    ? SpecificPropAPIData.videoUrl
                    : "https://www.youtube.com/embed/aWKFpMRiMX4"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </Container>
        </section>

        {/* THINGS TO KNOW SECTION  */}
        <section className={ViewPropertyCss.things_to_know_section}>
          <Container>
            <h5 className={ViewPropertyCss.feature_section_heading}>
              Things to know
            </h5>
            {/* PRICE SECTION */}
            <Row className={ViewPropertyCss.things_to_know_section_rows}>
              <Col md={8}>
                <div
                  className={
                    ViewPropertyCss.things_to_know_main_content_container
                  }
                >
                  <Row>
                    <h5
                      className={ViewPropertyCss.things_to_know_section_heading}
                    >
                      Prices
                    </h5>
                    <Col
                      className={ViewPropertyCss.things_to_know_section_cols}
                      md={6}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_container
                        }
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_icon_container
                          }
                        >
                          <Image
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></Image>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Night: From{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            ${SpecificPropAPIData.price}
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className={ViewPropertyCss.things_to_know_section_cols}
                      md={6}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_container
                        }
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_icon_container
                          }
                        >
                          <Image
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></Image>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Allow Additional Guests:{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            Yes
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className={ViewPropertyCss.things_to_know_section_cols}
                      md={6}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_container
                        }
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_icon_container
                          }
                        >
                          <Image
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></Image>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Minimum Nights Of A Booking:{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            {SpecificPropAPIData.minNightsOfBooking}
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col
                      className={ViewPropertyCss.things_to_know_section_cols}
                      md={6}
                    >
                      <div
                        className={
                          ViewPropertyCss.things_to_know_price_container
                        }
                      >
                        <div
                          className={
                            ViewPropertyCss.things_to_know_price_icon_container
                          }
                        >
                          <Image
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></Image>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Maximum Nights Of A Booking:
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            {SpecificPropAPIData.maxNightsOfBooking}
                          </span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  {/* TERMS SECTION */}
                  <div className={ViewPropertyCss.things_to_know_section_rows}>
                    <Col md={8}>
                      <div
                        className={
                          ViewPropertyCss.things_to_know_main_content_container
                        }
                      >
                        <Row>
                          <h5
                            className={
                              ViewPropertyCss.things_to_know_section_heading
                            }
                          >
                            Terms & rules
                          </h5>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            md={6}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                Smoking allowed
                              </p>
                            </div>
                          </Col>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            md={6}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                Pets allowed
                              </p>
                            </div>
                          </Col>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            md={6}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                Children allowed
                              </p>
                            </div>
                          </Col>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            md={6}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={FeatureTickIcon}
                                  width={24}
                                  height={24}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                Event allowed
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={4}></Col>
                  </div>

                  {/* Cancellation  SECTION */}
                  <div className={ViewPropertyCss.things_to_know_section_rows}>
                    <Col md={8}>
                      <div
                        className={
                          ViewPropertyCss.things_to_know_main_content_container
                        }
                      >
                        <Row>
                          <h5
                            className={
                              ViewPropertyCss.things_to_know_section_heading
                            }
                          >
                            Cancellation Policy
                          </h5>
                          <p
                            className={
                              ViewPropertyCss.things_to_know_privacy_text
                            }
                          >
                            {SpecificPropAPIData.cancellationPolicy
                              ? SpecificPropAPIData.cancellationPolicy
                              : "N/A"}
                          </p>
                        </Row>
                      </div>
                    </Col>
                  </div>

                  {/* Additional rules information  SECTION */}
                  <div className={ViewPropertyCss.things_to_know_section_rows}>
                    <Col md={8}>
                      <div
                        className={
                          ViewPropertyCss.things_to_know_main_content_container
                        }
                      >
                        <Row>
                          <h5
                            className={
                              ViewPropertyCss.things_to_know_section_heading
                            }
                          >
                            Additional rules information
                          </h5>
                          <p
                            className={
                              ViewPropertyCss.things_to_know_privacy_text
                            }
                          >
                            {SpecificPropAPIData.additionalRulesInformation
                              ? SpecificPropAPIData.additionalRulesInformation
                              : "N/A"}
                          </p>
                        </Row>
                      </div>
                    </Col>
                  </div>

                  {/* Availability SECTION */}
                  <div className={ViewPropertyCss.things_to_know_section_rows}>
                    <Col md={12}>
                      <div
                        className={
                          ViewPropertyCss.things_to_know_main_content_container
                        }
                      >
                        <Row>
                          <h5
                            className={
                              ViewPropertyCss.things_to_know_section_heading
                            }
                          >
                            Availability
                          </h5>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            xs={"auto"}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={Calendar}
                                  width={30}
                                  height={30}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                The minimum stay is 3 nights from
                              </p>
                            </div>
                          </Col>
                          <Col
                            className={
                              ViewPropertyCss.things_to_know_section_cols
                            }
                            md={6}
                          >
                            <div
                              className={
                                ViewPropertyCss.things_to_know_price_container
                              }
                            >
                              <div
                                className={
                                  ViewPropertyCss.things_to_know_price_icon_container
                                }
                              >
                                <Image
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={Calendar}
                                  width={30}
                                  height={30}
                                  alt="Prices"
                                ></Image>
                              </div>

                              <p
                                className={
                                  ViewPropertyCss.things_to_know_price_text
                                }
                              >
                                The minimum stay is 3 nights from
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>

              <Col md={4} className={ViewPropertyCss.detailParent}>
                <div>
                  <div className={ViewPropertyCss.details}>Details</div>
                  <div className={ViewPropertyCss.tickParent}>
                    <div
                      className={ViewPropertyCss.tick_with_blackbg_container}
                    >
                      <Image
                        className={ViewPropertyCss.tick_with_blackbg}
                        src={Blacktick}
                        width={24}
                        height={24}
                        alt="Prices"
                      ></Image>
                    </div>
                    <p className={ViewPropertyCss.words}>
                      ID: {SpecificPropAPIData.id}
                    </p>
                  </div>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Rooms: {SpecificPropAPIData.rooms}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Guests: {SpecificPropAPIData.accomodation}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Check-in After:{" "}
                    {moment(SpecificPropAPIData.checkIn, "hh:mm A").format(
                      "hh:mm A"
                    )}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Check-out Before:{" "}
                    {moment(SpecificPropAPIData.checkOut, "hh:mm A").format(
                      "hh:mm A"
                    )}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Bedrooms: {SpecificPropAPIData.bedrooms}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Beds: {SpecificPropAPIData.beds}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Payment Methods: Credit Card
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <Image
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></Image>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Bathrooms: {SpecificPropAPIData.bathrooms}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

        <BottomSection />
      </main>
    </>
  );
};

export default ViewProperty;
