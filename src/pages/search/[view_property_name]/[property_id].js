import { useState, React, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Dropdown } from "react-bootstrap";
import ViewPropertyCss from "../../../styles/ViewProperty.module.css";
import GirlGroupBannerImage from "../../../../public/images/group_girls_banner.svg";
import {
  Checkbox,
  Input,
  Modal,
  Space,
  Tabs,
  message,
  Image,
  Button,
  DatePicker,
} from "antd";
import NextImage from "next/image";
import TabContentOverview from "../tab_content_overview";
import FeatureTickIcon from "../../../../public/images/vector/feature_tick.svg";
import PriceSquareIcon from "../../../../public/images/vector/price_square_icon.svg";
import RulesCrossIcon from "../../../../public/images/vector/rules_cross_icon.svg";
import Calendar from "../../../../public/images/vector/calendar.svg";
import BottomSection from "../../../../common components/bottomGroup";
import Blacktick from "../../../../public/images/vector/blackTick.svg";
import Map from "../../../../common components/map";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
const { TextArea } = Input;
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
const { RangePicker } = DatePicker;
// import DatePicker from "react-multi-date-picker";
import Checkout from "../../../checkout";
import moment from "moment";
import dayjs from "dayjs";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY}`
);

const ViewProperty = () => {
  const router = useRouter();
  const ContextUserDetails = useContext(AuthContext);
  const Params = router.query;
  const [SpecificPropAPIData, SetSpecificPropAPIData] = useState({});
  const [BookingDate, SetBookingDate] = useState([]);
  const [PaymentIntentObject, setPaymentIntentObject] = useState(null);
  const [Options, setOptions] = useState(null);
  const [Availability, setAvailability] = useState({});
  const [NotAvailable, setNotAvailable] = useState(false);
  const [Available, setAvailable] = useState(false);
  const [ShowTotalPaymentText, setShowTotalPaymentText] = useState(false);
  const [ShowOtherDetails, setShowOtherDetails] = useState(false);
  const [ShowOtherDetailsStatic, setShowOtherDetailsStatic] = useState(false);
  const [ShowTotalPaymentTextStatic, setShowTotalPaymentTextStatic] =
    useState(false);
  const [AvailabilityCalender, setAvailabilityCalender] = useState([{}]);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [DateInputValues, setDateInputValues] = useState([
    dayjs(Params.from).format("MM-DD-YYYY"),
    dayjs(Params.to).format("MM-DD-YYYY"),
  ]);
  useEffect(() => {
    const UrlParamId = window.location.pathname.split("/")[3];

    if (Params.adults || Params.childs) {
      setAdult(Params.adults);
      setChild(Params.childs);
    }

    const GetPropertyById = async () => {
      try {
        const SpecificPropData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/property/${
            Params.property_id || UrlParamId
          }`
        );

        if (SpecificPropData.status === 200) {
          SetSpecificPropAPIData(SpecificPropData.data);
        }
      } catch (error) {
        console.log(error, "ERR");
      }
    };

    //* THIS WILL RUN ONLY WHEN PARAMS FROM AND TO IS NOT EMPTY
    if (Params.from || Params.to) {
      const CheckAvail = async () => {
        try {
          const CheckAvailRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/property/checkAvailability/${Params.property_id}?from=${Params.from}&to=${Params.to}`
          );
          if (CheckAvailRes.status === 200) {
            setAvailability(CheckAvailRes.data);
            setAvailabilityCalender(CheckAvailRes.data.data.calender);

            if (CheckAvailRes.data?.data?.available) {
              setAvailable(true);
              setNotAvailable(false);
            } else if (CheckAvailRes.data?.data?.available != true) {
              setAvailable(false);
              setNotAvailable(true);
            }
          }
        } catch (error) {
          console.log(error, "ERROR CheckAvailability");
        }
      };
      CheckAvail();
    }

    GetPropertyById();
    return () => {
      GetPropertyById();
    };
  }, [Params.property_id]);

  useEffect(() => {
    if (PaymentIntentObject != null) {
      setOptions(PaymentIntentObject);
    }
    return () => {};
  }, [PaymentIntentObject]);

  //* THIS USE EFFECT WILL SET THE URL PARAM DATES IN ANTD CALENDAR
  useEffect(() => {
    if (Available) {
      const LengthOfAvailDate = AvailabilityCalender?.length - 1;
      const StartDate = dayjs(AvailabilityCalender[0]._attributes?.Date).format(
        "MM-DD-YYYY"
      );
      const LastDate = dayjs(
        AvailabilityCalender[LengthOfAvailDate]._attributes?.Date
      ).format("MM-DD-YYYY");

      setDateInputValues([
        dayjs(StartDate).format("MM-DD-YYYY"),
        dayjs(LastDate).format("MM-DD-YYYY"),
      ]);
    }

    return () => {};
  }, [Available, AvailabilityCalender]);

  const onTabChange = (key) => {
    console.log(key);
  };

  console.log(DateInputValues, "DATES OF AVALABILITY");

  const items = [
    {
      key: "1",
      label: `Overview`,
      children: <TabContentOverview data={SpecificPropAPIData.data} />,
    },
  ];

  const incAdult = () => {
    setAdult(adult + 1);
  };

  const decAdult = () => {
    if (adult > 0) {
      setAdult(adult - 1);
    } else {
      message.error("Sorry number of adults can not be less than 0");
      setAdult(0);
    }
  };

  const incChild = () => {
    setChild(child + 1);
  };

  const decChild = () => {
    if (child > 0) {
      setChild(child - 1);
    } else {
      message.error("Sorry number of children can not be less than 0");
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
    if (BookingDate.length === 0) {
      message.error("Please select the check-in & check-out date");
      return;
    }

    const PaymentRes = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/booking/paymentintent`,
      {
        propertyId: SpecificPropAPIData.data?.id,
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
        console.log("RESPONSE PAYMENT INTENT", response.data?.paymentIntent);
        setPaymentIntentObject({
          ClientSecret: response.data?.paymentIntent.client_secret,
          PaymentIntentId: response.data?.paymentIntent.id,
        });

        if (
          SpecificPropAPIData?.price?.Pull_GetPropertyAvbPrice_RS
            ?.PropertyPrices?.PropertyPrice
        ) {
          console.log(
            SpecificPropAPIData?.price?.Pull_GetPropertyAvbPrice_RS
              ?.PropertyPrices?.PropertyPrice[0],
            "FROM VIEW PRO IF"
          );
          setShowTotalPaymentText(true);
        } else {
          console.log(SpecificPropAPIData?.price, "FROM VIEW PRO ELSE");
          setShowTotalPaymentText(false);
          setShowTotalPaymentTextStatic(true);
        }
      }
    }).catch((err) => {
      if (err.response.data?.message === "User not authorized") {
        message.error("Please login to book hotels");
        return;
      }
      message.error(err.response.data?.message);
    });
  };

  const OnChangeDateInput = (date, DateValue) => {
    setDateInputValues(["", ""]);
    // setDateInputValues([dayjs(DateValue[0]), dayjs(DateValue[1])]);

    // SetBookingDate(DateValue);
    console.log(DateValue, "DATEEE VALUE");
  };

  //! ----------------------------------------------------------------

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
          <NextImage
            alt="Golf group"
            className={ViewPropertyCss.view_prop_bannerimg}
            src={SpecificPropAPIData.data?.imageUrl || GirlGroupBannerImage}
            fill
          ></NextImage>
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
                    <h5 className={ViewPropertyCss.totalTitle_h5}>
                      Price / Night
                    </h5>
                  </div>
                  <div className={ViewPropertyCss.amount}>
                    <h5 className={ViewPropertyCss.totalTitle_h5}>
                      $
                      {SpecificPropAPIData.data?.price >= 0.5
                        ? Math.ceil(SpecificPropAPIData.data?.price)
                        : Math.floor(SpecificPropAPIData.data?.price)}
                    </h5>
                  </div>
                </div>
              </div>
              <hr className={ViewPropertyCss.horizonaline} />
              {Available ? (
                <p className={ViewPropertyCss.date_avail_text}>
                  Your Date are available!
                </p>
              ) : (
                ""
              )}
              {NotAvailable ? (
                <p className={ViewPropertyCss.date_not_avail_text}>
                  Your Date are not available!
                </p>
              ) : (
                ""
              )}
              <Row className={ViewPropertyCss.inner_input_date_picker}>
                {/* <RangePicker
                  size="large"
                  style={{ width: "100%" }}
                  onChange={OnChangeDateInput}
                  disabledDate={(current) => {
                    return current && current < moment().startOf("day");
                  }}
                  className={ViewPropertyCss.inner_input_date_picker}
                /> */}
                {/* <Col md={2}>
                  <NextImage
                    className={ViewPropertyCss.location}
                    width={25}
                    height={25}
                    src="/images/vector/calendar.svg"
                    alt="Calender Image"
                  ></NextImage>
                </Col> */}

                <Col md={10}>
                  {/* <DatePicker
                    value={DateInputValues}
                    format={"MM-DD-YYYY"}
                    onChange={OnChangeDateInput}
                    range={true}
                    dateSeparator=" - "
                    className={ViewPropertyCss.inner_input_date_picker}
                  /> */}
                  <RangePicker
                    defaultValue={[
                      dayjs(DateInputValues[0]),
                      dayjs(DateInputValues[1]),
                    ]}
                    onChange={OnChangeDateInput}
                    disabledDate={(current) => {
                      return current && current < dayjs().startOf("day");
                    }}
                    format={"MM-DD-YYYY"}
                  />
                </Col>
              </Row>

              <hr />

              <Dropdown>
                <Dropdown.Toggle
                  className={ViewPropertyCss.guest}
                  id="dropdown-basic"
                >
                  {adult} Adults, {child} Children
                </Dropdown.Toggle>

                <Dropdown.Menu className={ViewPropertyCss.adultChild}>
                  <Row className={ViewPropertyCss.increase}>
                    <Col md={3}>
                      <Dropdown.Item href="#/action-1">
                        {" "}
                        <h5 className={ViewPropertyCss.ageName}>
                          {adult} Adults
                        </h5>
                      </Dropdown.Item>
                    </Col>

                    <Col
                      md={4}
                      className={ViewPropertyCss.geust_incri_btns_div}
                    >
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decAdult}
                        >
                          -
                        </div>
                        <div className={ViewPropertyCss.guest_count_div}>
                          {adult}
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incAdult}
                        >
                          +
                        </div>
                      </Button>
                    </Col>
                  </Row>

                  <Row className={ViewPropertyCss.increase}>
                    <Col md={3}>
                      <Dropdown.Item href="#/action-2">
                        {" "}
                        <h5 className={ViewPropertyCss.ageName}>
                          {child} Children
                        </h5>
                      </Dropdown.Item>
                    </Col>

                    <Col
                      md={4}
                      className={ViewPropertyCss.geust_incri_btns_div}
                    >
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decChild}
                        >
                          -
                        </div>
                        <div className={ViewPropertyCss.guest_count_div}>
                          {child}
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incChild}
                        >
                          +
                        </div>
                      </Button>
                    </Col>
                  </Row>

                  <div className={ViewPropertyCss.applyParent}>
                    <Button className={ViewPropertyCss.apply}>Apply</Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <hr />

              {/* STATIC TOTAL CHARGES DIV */}

              {ShowOtherDetailsStatic ? (
                <>
                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Additional Fee
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Cleaning
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Deposit
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Extra Person Price
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Fees
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Security Deposit
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Taxes
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>$ 0</p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_charges_text}>
                        Charges Total
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_charges}>$ 0</p>
                    </div>
                  </div>

                  <hr />
                </>
              ) : (
                ""
              )}

              {/* TOTAL CHARGES */}
              {ShowOtherDetails ? (
                <>
                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Additional Fee
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes
                          .AdditionalFees
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.AdditionalFees >=
                            0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.AdditionalFees
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.AdditionalFees
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Cleaning
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes.Cleaning
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.Cleaning >= 0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Cleaning
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Cleaning
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Deposit
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes.Deposit
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.Deposit >= 0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Deposit
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Deposit
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Extra Person Price
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes
                          .ExtraPersonPrice
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.ExtraPersonPrice >=
                            0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.ExtraPersonPrice
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.ExtraPersonPrice
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Fees
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes.Fees
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.Fees >= 0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Fees
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Fees
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Security Deposit
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes
                          .SecurityDeposit
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.SecurityDeposit >=
                            0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.SecurityDeposit
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.SecurityDeposit
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_charges_text}>
                        Taxes
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._attributes.Taxes
                          ? SpecificPropAPIData.price
                              ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                              .PropertyPrice[0]._attributes.Taxes >= 0.5
                            ? Math.ceil(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Taxes
                              )
                            : Math.floor(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._attributes.Taxes
                              )
                          : 0}
                      </p>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.total_price_charge_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_charges_text}>
                        Charges Total
                      </h5>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_charges}>
                        $
                        {SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                          ?.PropertyPrices.PropertyPrice[0]._text >= 0.5
                          ? Math.ceil(
                              SpecificPropAPIData.price
                                ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                .PropertyPrice[0]._text
                            )
                          : Math.floor(
                              SpecificPropAPIData.price
                                ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                .PropertyPrice[0]._text
                            )}
                      </p>
                    </div>
                  </div>

                  <hr />
                </>
              ) : (
                ""
              )}

              {/* STATIC TOTALDIV */}

              {ShowTotalPaymentTextStatic ? (
                <div className={ViewPropertyCss.total_price_main_div}>
                  <div className={ViewPropertyCss.total_price_text_div}>
                    <h5 className={ViewPropertyCss.total_price_text}>Total</h5>
                    <p className={ViewPropertyCss.total_price_inc_tax_text}>
                      Includes taxes and fees
                    </p>
                  </div>
                  <div className={ViewPropertyCss.total_price_text_div}>
                    <p className={ViewPropertyCss.total_price}>
                      {" "}
                      <strong>
                        $
                        {SpecificPropAPIData.data?.price >= 0.5
                          ? Math.ceil(SpecificPropAPIData.data?.price)
                          : Math.floor(SpecificPropAPIData.data?.price)}
                      </strong>{" "}
                    </p>
                    <p
                      onClick={() => {
                        ShowOtherDetailsStatic
                          ? setShowOtherDetailsStatic(false)
                          : setShowOtherDetailsStatic(true);
                      }}
                      className={ViewPropertyCss.total_price_view_details}
                    >
                      {ShowOtherDetailsStatic ? "Hide" : "View"} details
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* TOTAL AMOUNT */}
              {ShowTotalPaymentText &&
              SpecificPropAPIData.price?.Pull_GetPropertyAvbPrice_RS
                ?.PropertyPrices?.PropertyPrice[0] ? (
                <>
                  {" "}
                  <div className={ViewPropertyCss.total_price_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_text}>
                        Total
                      </h5>
                      <p className={ViewPropertyCss.total_price_inc_tax_text}>
                        Includes taxes and fees
                      </p>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        {" "}
                        <strong>
                          $
                          {SpecificPropAPIData.data?.price >= 0.5
                            ? Math.ceil(SpecificPropAPIData.data?.price) +
                              Number(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._text >= 0.5
                                  ? Math.ceil(
                                      SpecificPropAPIData.price
                                        ?.Pull_GetPropertyAvbPrice_RS
                                        ?.PropertyPrices.PropertyPrice[0]._text
                                    )
                                  : Math.floor(
                                      SpecificPropAPIData.price
                                        ?.Pull_GetPropertyAvbPrice_RS
                                        ?.PropertyPrices.PropertyPrice[0]._text
                                    )
                              )
                            : Math.floor(SpecificPropAPIData.data?.price) +
                              Number(
                                SpecificPropAPIData.price
                                  ?.Pull_GetPropertyAvbPrice_RS?.PropertyPrices
                                  .PropertyPrice[0]._text >= 0.5
                                  ? Math.ceil(
                                      SpecificPropAPIData.price
                                        ?.Pull_GetPropertyAvbPrice_RS
                                        ?.PropertyPrices.PropertyPrice[0]._text
                                    )
                                  : Math.floor(
                                      SpecificPropAPIData.price
                                        ?.Pull_GetPropertyAvbPrice_RS
                                        ?.PropertyPrices.PropertyPrice[0]._text
                                    )
                              )}
                        </strong>{" "}
                      </p>
                      <p
                        onClick={() => {
                          ShowOtherDetails
                            ? setShowOtherDetails(false)
                            : setShowOtherDetails(true);
                        }}
                        className={ViewPropertyCss.total_price_view_details}
                      >
                        {ShowOtherDetails ? "Hide" : "View"} details
                      </p>
                    </div>
                  </div>
                  <hr />
                </>
              ) : (
                ""
              )}

              <div className={ViewPropertyCss.bookParent}>
                <Button
                  disabled={!Available}
                  className={ViewPropertyCss.bookNow}
                  onClick={CreatePatymentIntent}
                >
                  Book Now
                </Button>
              </div>

              {/* <div className={ViewPropertyCss.checkParent}>
                <Button className={ViewPropertyCss.check}>
                  Check availability
                </Button>
              </div> */}

              <div className={ViewPropertyCss.contactParent}>
                {/* -----------      CONTACT TO HOST SECTION        -----------------*/}
                <Modal
                  title="Contact to host"
                  footer={null}
                  open={isModalOpen}
                  onSignup={handleContact}
                  onCancel={handleCancelContact}
                  width={440}
                  centered={true}
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
                        rows="3"
                        cols="50"
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
              <div className={ViewPropertyCss.checkout_payment_main_div}>
                {Options != null && (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: Options.ClientSecret }}
                  >
                    <PaymentElement />
                    <Checkout
                      data={[
                        SpecificPropAPIData.data,
                        BookingDate[0],
                        BookingDate[1],
                        {
                          adult: adult,
                          child: child,
                          total_guests: adult + child,
                        },
                      ]}
                    />
                  </Elements>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {/* CARASOUL SECTION STARTS HERE */}
        <Container className={ViewPropertyCss.carasoul_section}>
          <section>
            <div className={ViewPropertyCss.carasoul_section_inner_div}>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {SpecificPropAPIData.data?.otherImageUrls?.map(
                  (OtherImage, OtherImageUrlIndex) => {
                    return (
                      <Image
                        key={OtherImageUrlIndex}
                        className={ViewPropertyCss.carasoul_images}
                        fill
                        src={OtherImage}
                        alt={`image ${OtherImageUrlIndex}`}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7/39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                      ></Image>
                    );
                  }
                )}
              </Image.PreviewGroup>
            </div>
          </section>
        </Container>

        {/* FEATURE SECTION STARTS HERE */}
        <section className={ViewPropertyCss.feature_section}>
          <Container>
            <h5 className={ViewPropertyCss.feature_section_heading}>
              Features
            </h5>
            <Row>
              {SpecificPropAPIData.data?.amenities?.map((data, index) => {
                return (
                  <Col key={index} md={4}>
                    <div
                      className={ViewPropertyCss.feature_section_div_container}
                    >
                      <div
                        className={
                          ViewPropertyCss.feature_section_tick_icon_container
                        }
                      >
                        <NextImage
                          width={24}
                          height={24}
                          src={FeatureTickIcon}
                          alt="features of golfhom"
                        ></NextImage>
                      </div>

                      <p className={ViewPropertyCss.feature_section_text}>
                        {data}
                      </p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>

        {/* MAP SECTION STARTS HERE */}
        <section className={ViewPropertyCss.map_section}>
          <Container>
            <div className={ViewPropertyCss.map_section_main_container}>
              <Map data={[SpecificPropAPIData.data]} />
            </div>
          </Container>
        </section>

        {/* VIDEO SECTION STARTS HERE */}
        {SpecificPropAPIData.data?.videoUrl ? (
          <section className={ViewPropertyCss.video_section}>
            <Container>
              <h5 className={ViewPropertyCss.feature_section_heading}>Video</h5>
              <div className={ViewPropertyCss.video_section_container}>
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    SpecificPropAPIData.data?.videoUrl
                      ? SpecificPropAPIData.data?.videoUrl
                      : "https://www.youtube.com/embed/aWKFpMRiMX4"
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </Container>
          </section>
        ) : (
          ""
        )}

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
                          <NextImage
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></NextImage>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Night: From{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            ${SpecificPropAPIData.data?.price}
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
                          <NextImage
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></NextImage>
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
                          <NextImage
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></NextImage>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Minimum Nights Of A Booking:{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            {SpecificPropAPIData.data?.minNightsOfBooking}
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
                          <NextImage
                            className={
                              ViewPropertyCss.things_to_know_price_icon
                            }
                            src={PriceSquareIcon}
                            width={15}
                            height={15}
                            alt="Prices"
                          ></NextImage>
                        </div>

                        <p
                          className={ViewPropertyCss.things_to_know_price_text}
                        >
                          Maximum Nights Of A Booking:
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            {SpecificPropAPIData.data?.maxNightsOfBooking}
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></NextImage>
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></NextImage>
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={RulesCrossIcon}
                                  width={15}
                                  height={15}
                                  alt="Prices"
                                ></NextImage>
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={FeatureTickIcon}
                                  width={24}
                                  height={24}
                                  alt="Prices"
                                ></NextImage>
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
                            {SpecificPropAPIData.data?.cancellationPolicy
                              ? SpecificPropAPIData.data?.cancellationPolicy
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
                            {SpecificPropAPIData.data
                              ?.additionalRulesInformation
                              ? SpecificPropAPIData.data
                                  ?.additionalRulesInformation
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={Calendar}
                                  width={30}
                                  height={30}
                                  alt="Prices"
                                ></NextImage>
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
                                <NextImage
                                  className={
                                    ViewPropertyCss.things_to_know_price_icon
                                  }
                                  src={Calendar}
                                  width={30}
                                  height={30}
                                  alt="Prices"
                                ></NextImage>
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
                      <NextImage
                        className={ViewPropertyCss.tick_with_blackbg}
                        src={Blacktick}
                        width={24}
                        height={24}
                        alt="Prices"
                      ></NextImage>
                    </div>
                    <p className={ViewPropertyCss.words}>
                      ID: {SpecificPropAPIData.data?.id}
                    </p>
                  </div>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Rooms: {SpecificPropAPIData.data?.rooms}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Guests: {SpecificPropAPIData.data?.accomodation}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Check-in After:{" "}
                    {moment(
                      SpecificPropAPIData.data?.checkIn,
                      "hh:mm A"
                    ).format("hh:mm A")}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Check-out Before:{" "}
                    {moment(
                      SpecificPropAPIData.data?.checkOut,
                      "hh:mm A"
                    ).format("hh:mm A")}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Bedrooms: {SpecificPropAPIData.data?.bedrooms}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Beds: {SpecificPropAPIData.data?.beds}
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Payment Methods: Credit Card
                  </p>
                </div>

                <div className={ViewPropertyCss.tickParent}>
                  <div className={ViewPropertyCss.tick_with_blackbg_container}>
                    <NextImage
                      className={ViewPropertyCss.tick_with_blackbg}
                      src={Blacktick}
                      width={24}
                      height={24}
                      alt="Prices"
                    ></NextImage>
                  </div>
                  <p className={ViewPropertyCss.words}>
                    Bathrooms: {SpecificPropAPIData.data?.bathrooms}
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
