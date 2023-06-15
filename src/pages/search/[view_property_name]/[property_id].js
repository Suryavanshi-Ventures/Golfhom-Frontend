import { useState, React, useEffect, useContext, Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Col, Row, Dropdown } from "react-bootstrap";
import ViewPropertyCss from "../../../styles/ViewProperty.module.css";
import GirlGroupBannerImage from "../../../../public/images/group_girls_banner.png";
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
  Form,
} from "antd";
import NextImage from "next/image";
import TabContentOverview from "../tab_content_overview";
import FeatureTickIcon from "../../../../public/images/vector/feature_tick.svg";
import PriceSquareIcon from "../../../../public/images/vector/price_square_icon.svg";
import RulesCrossIcon from "../../../../public/images/vector/rules_cross_icon.svg";
import Calendar from "../../../../public/images/vector/calendar.svg";
import Blacktick from "../../../../public/images/vector/blackTick.svg";
import Map from "../../../../common components/map";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
const { TextArea } = Input;
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
const { RangePicker } = DatePicker;
import Checkout from "../../../checkout";
import moment from "moment";
import dayjs from "dayjs";
import { useRef } from "react";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY}`
);
import dynamic from "next/dynamic";

const BottomSection = dynamic(
  () => import("../../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const PaymentForm = dynamic(() => import("./components/payment_form"), {
  suspense: true,
});

const StaticPriceBreakDown = dynamic(
  () => import("./components/StaticPriceBreakDown"),
  {
    suspense: true,
  }
);

const ViewProperty = () => {
  const router = useRouter();
  const ContextUserDetails = useContext(AuthContext);
  const Params = router.query;
  const [SpecificPropAPIData, SetSpecificPropAPIData] = useState({});
  const [BookingDate, SetBookingDate] = useState([]);
  const [PaymentIntentObject, setPaymentIntentObject] = useState(null);
  const [Options, setOptions] = useState(null);
  const [NotAvailable, setNotAvailable] = useState(false);
  const [Available, setAvailable] = useState(false);
  const [ShowTotalPaymentText, setShowTotalPaymentText] = useState(false);
  const [ShowOtherDetails, setShowOtherDetails] = useState(false);
  const [ShowOtherDetailsStatic, setShowOtherDetailsStatic] = useState(false);
  const [ShowTotalPaymentTextStatic, setShowTotalPaymentTextStatic] =
    useState(false);
  const [AvailabilityCalender, setAvailabilityCalender] = useState([{}]);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(1);
  const [infant, setInfant] = useState(0);
  const [pet, setPet] = useState(0);
  const [form] = Form.useForm();
  const [SaveDateInState, setSaveDateInState] = useState([]);
  const [PropertyType, setPropertyType] = useState("");
  const [
    ShowNextpaxPropertyPaymentPortal,
    setShowNextpaxPropertyPaymentPortal,
  ] = useState(false);
  const [AvailDate, setAvailDate] = useState([]);
  const [NextPaxFinalAvailPriceBreakDown, setNextPaxFinalAvailPriceBreakDown] =
    useState({});

  useEffect(() => {
    const UrlParamId = window.location.pathname.split("/")[3];

    if (Params.adults || Params.childs) {
      setAdult(parseInt(Params.adults));
      setChild(parseInt(Params.childs));
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

          if (SpecificPropData.data.data.externalPropertyType === "Nextpax") {
            setPropertyType("Nextpax");
          } else {
            setPropertyType("Rental");
          }

          //* THIS WILL RUN ONLY WHEN PARAMS FROM AND TO IS NOT EMPTY
          if (Params.from || Params.to) {
            //* IF THE EXTERNAL PROPERTY TYPE IS NEXTPAX THAN CALLING NEXTPAX AVAILABILITY API
            if (SpecificPropData.data.data.externalPropertyType === "Nextpax") {
              console.log(
                SpecificPropData.data.data.externalPropertyType,
                "SAFFFFFFFFFFFFFFF"
              );
              const CheckAvail = async () => {
                try {
                  const CheckAvailRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/finalAvailability?id=${Params.property_id}&from=${Params.from}&to=${Params.to}`
                  );
                  if (CheckAvailRes.status === 200) {
                    const DaysDiffCount = moment(Params.to, "MM-DD-YYYY").diff(
                      moment(Params.from, "MM-DD-YYYY"),
                      "days"
                    );
                    const DayDiffCountNextpaxAPI =
                      CheckAvailRes?.data?.data?.data[0]?.availability?.length -
                      1;
                    if (DayDiffCountNextpaxAPI === DaysDiffCount) {
                      console.log(
                        CheckAvailRes?.data?.data?.data[0]?.availability
                          ?.length - 1,
                        "nextpax/availability length",
                        DaysDiffCount,
                        "MOMENT DAY COUNT"
                      );
                      setAvailable(true);
                      setNotAvailable(false);
                    } else if (DayDiffCountNextpaxAPI === undefined) {
                      setAvailable(false);
                      setNotAvailable(true);
                    }
                  }
                } catch (error) {
                  console.log(error, "ERROR CheckAvailability");
                }
              };
              CheckAvail();
            } else {
              //* IF THE EXTERNAL PROPERTY TYPE IS RENTAL THAN CALLING RENTAL AVAILABILITY API
              const CheckAvail = async () => {
                try {
                  const CheckAvailRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/property/checkAvailability/${Params.property_id}?from=${Params.from}&to=${Params.to}`
                  );
                  if (CheckAvailRes.status === 200) {
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
          }
        }
      } catch (error) {
        console.log(error, "ERR");
      }
    };

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
    if (AvailabilityCalender != undefined) {
      const LengthOfAvailDate = AvailabilityCalender?.length - 1;
      const StartDate = dayjs(
        AvailabilityCalender[0]?._attributes?.Date
      ).format("MM-DD-YYYY");
      const LastDate = dayjs(
        AvailabilityCalender[LengthOfAvailDate]?._attributes?.Date
      ).format("MM-DD-YYYY");
      // if (Available) {
      //   SetBookingDate([StartDate, LastDate]); //SETTING BOOKING DATE TO CREATE PAYMENT INTENT METHOD
      //   form.setFieldsValue({
      //     date_picker: [dayjs(StartDate), dayjs(LastDate)], // SETTING URL PARAM DATES TO DATE PICKER ON LOAD OF PAGE
      //   });
      // }

      // form.setFieldsValue({
      //   date_picker: [dayjs(StartDate), dayjs(LastDate)], // SETTING URL PARAM DATES TO DATE PICKER ON LOAD OF PAGE
      // });
    }

    return () => {};
  }, [Available, AvailabilityCalender]);

  const DateFormater = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

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

  const incInfant = () => {
    setInfant(infant + 1);
  };

  const decInfant = () => {
    if (infant > 0) {
      setInfant(infant - 1);
    } else {
      message.error("Sorry number of infant can not be less than 0");
      setInfant(0);
    }
  };

  const incPet = () => {
    setPet(pet + 1);
  };

  const decPet = () => {
    if (pet > 0) {
      setPet(pet - 1);
    } else {
      message.error("Sorry number of pet can not be less than 0");
      setPet(0);
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

  const test = () => {
    console.log("TEST FUNCTION");
    setShowNextpaxPropertyPaymentPortal(true);
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

  console.log(SpecificPropAPIData.data, "SPECIFIC PROPERTY");

  const OnChangeDateInput = (date, DateValue) => {
    if (DateValue[0] || DateValue[1]) {
      SetBookingDate([DateValue[0], DateValue[1]]);
      console.log(SpecificPropAPIData.data?.externalPropertyType);
      if (SpecificPropAPIData.data?.externalPropertyType === "Nextpax") {
        const initialdate = DateFormater(DateValue[0]);
        const finaldate = DateFormater(DateValue[1]);
        let newdatesarray = [];
        let i = initialdate;
        while (i !== finaldate) {
          newdatesarray.push(i);
          const newdate = moment(i).add(1, "days").format("YYYY-MM-DD");
          i = newdate;
        }
        newdatesarray.push(finaldate);
        let iserror = false;
        newdatesarray.map((i) => {
          if (!AvailDate.includes(i)) iserror = true;
        });

        if (iserror) {
          message.error("Invaild Date Range Selected");
          return;
        }
        const CheckAvail = async () => {
          try {
            const Token =
              localStorage.getItem("token") || sessionStorage.getItem("token");
            const CheckAvailRes = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/finalAvailability`,
              {
                id: Params.property_id,
                from: DateValue[0],
                to: DateValue[1],
                guest: Params.guests ? Params.guests : adult + child + infant,
                adult: adult,
                children: child,
                babies: infant,
                pets: 0,
              },
              { headers: { Authorization: `Bearer ${Token}` } }
            );
            if (CheckAvailRes.status === 201) {
              if (CheckAvailRes.data.data.available) {
                setNextPaxFinalAvailPriceBreakDown(CheckAvailRes.data.data);
                setAvailable(true);
                setNotAvailable(false);
                setShowTotalPaymentTextStatic(true);
              } else {
                setAvailable(false);
                setNotAvailable(true);
                setShowTotalPaymentTextStatic(false);
                setShowOtherDetailsStatic(false);
              }
            }
          } catch (error) {
            if (error.response.status === 401) {
              message.error(
                `${error.response.data.message}, Please login to book hotels!`
              );
            }
            console.log(error, "ERROR CheckAvailability");
          }
        };
        CheckAvail();
      } else {
        //* IF THE EXTERNAL PROPERTY TYPE IS RENTAL THAN CALLING RENTAL AVAILABILITY API
        console.log("ON DATE CHANGE INTPUT RENTAL");
        const CheckAvail = async () => {
          try {
            const CheckAvailRes = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/property/checkAvailability/${Params.property_id}?from=${DateValue[0]}&to=${DateValue[1]}`
            );
            if (CheckAvailRes.status === 200) {
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
    }
  };

  //! AVAILABLE CHECK FOR NEXTPAX
  const FetchAvailableDateNextPax = async (
    date1 = moment().startOf("month").format("MM-DD-YYYY"),
    date2 = moment().endOf("month").add(1, "month").format("MM-DD-YYYY")
  ) => {
    const data = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/availability?id=${
        Params.property_id
      }&from=${moment(date1).format("MM-DD-YYYY")}&to=${moment(date2).format(
        "MM-DD-YYYY"
      )}`,
    }).then((res) => {
      if (res.status === 200) {
        const data = res.data?.data?.data?.[0]
          ? res.data?.data?.data?.[0]?.availability?.map((i) => i.date)
          : [];
        data.splice(0, 10);
        setAvailDate(data);
      }
    });
  };

  // // Callback function to disable dates
  // const disabledDate = (current) => {
  //   const formattedDate = current.format("YYYY-MM-DD");

  //   return !AvailDate.includes(formattedDate);
  // };

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
        <div className={ViewPropertyCss.view_prop_bannerimg_main_container}>
          <div className={ViewPropertyCss.view_prop_bannerimg_container}>
            <div className={ViewPropertyCss.view_prop_image_div_1}>
              <Image
                alt="Golf group"
                className={ViewPropertyCss.view_prop_bannerimg}
                src={SpecificPropAPIData.data?.imageUrl || GirlGroupBannerImage}
                fill
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              ></Image>
            </div>
            <div className={ViewPropertyCss.view_prop_image_div_2}>
              <Image
                alt="Golf group"
                className={ViewPropertyCss.view_prop_bannerimg}
                src={
                  SpecificPropAPIData.data?.otherImageUrls[1] ||
                  GirlGroupBannerImage
                }
                fill
                fallback="data:image/png;base64,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"
              ></Image>
            </div>
            <div className={ViewPropertyCss.view_prop_image_div_3}>
              <Image
                alt="Golf group"
                className={ViewPropertyCss.view_prop_bannerimg}
                src={
                  SpecificPropAPIData.data?.otherImageUrls[2] ||
                  GirlGroupBannerImage
                }
                fill
                fallback="data:image/png;base64,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"
              ></Image>
            </div>
            <div className={ViewPropertyCss.view_prop_image_div_4}>
              <Image
                alt="Golf group"
                className={ViewPropertyCss.view_prop_bannerimg}
                src={
                  SpecificPropAPIData.data?.otherImageUrls[3] ||
                  GirlGroupBannerImage
                }
                fill
                fallback="data:image/png;base64,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"
              ></Image>
              <div className={ViewPropertyCss.viewGallery}>
                <NextImage
                  src="/images/vector/menu.png"
                  alt="menu"
                  width={14}
                  height={14}
                  className={ViewPropertyCss.iconEye}
                />
                <a href="#gallery" className={ViewPropertyCss.showAllPhoto}>
                  Show all photos
                </a>
              </div>
            </div>
            <div className={ViewPropertyCss.view_prop_image_div_5}>
              <Image
                alt="Golf group"
                className={ViewPropertyCss.view_prop_bannerimg}
                src={
                  SpecificPropAPIData.data?.otherImageUrls[4] ||
                  GirlGroupBannerImage
                }
                fill
                fallback="data:image/png;base64,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"
              ></Image>
            </div>
            <div className={ViewPropertyCss.view_prop_all_image_container}>
              {/* <p>asfasf</p> */}
            </div>
          </div>
        </div>

        {/* PROP AMENITITES SECTION START HERE */}
        <Container>
          <Row className={ViewPropertyCss.parentRow}>
            <Col md={8}>
              <Tabs defaultActiveKey="1" items={items} />
            </Col>

            {/*  ------------    Total price box    ----------   */}
            <Col md={4} className={ViewPropertyCss.backgroundWhite}>
              <div className={ViewPropertyCss.totalParent}>
                <div className={ViewPropertyCss.totalPrice}>
                  <div className={ViewPropertyCss.amount}>
                    <h4 className={ViewPropertyCss.totalTitle_h5}>
                      $
                      {SpecificPropAPIData.data?.price >= 0.5
                        ? Math.ceil(SpecificPropAPIData.data?.price)
                        : Math.floor(SpecificPropAPIData.data?.price)}
                      <span className={ViewPropertyCss.night_price}>night</span>
                    </h4>
                  </div>
                </div>

                <div className={ViewPropertyCss.review_parent}>
                  <NextImage
                    src="/images/vector/star-s-fill.svg"
                    alt="star"
                    width={18}
                    height={18}
                  />
                  <span>4.62</span>
                  <Image
                    src="/images/vector/dot.svg"
                    alt="dot"
                    width={4}
                    height={4}
                  />
                  <span className={ViewPropertyCss.review_number}>
                    47 reviews
                  </span>
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
              <div className={ViewPropertyCss.inner_input_date_picker}>
                <div>
                  <Form name="control-hooks" layout="horizontal" form={form}>
                    <Form.Item
                      name="date_picker"
                      className={
                        ViewPropertyCss.inner_input_date_picker_form_item
                      }
                    >
                      <RangePicker
                        className={ViewPropertyCss.inner_input_date_picker}
                        onChange={OnChangeDateInput}
                        format={"MM-DD-YYYY"}
                        disabledDate={(current) => {
                          const formattedDate = current.format("YYYY-MM-DD");
                          return !AvailDate.includes(formattedDate);
                        }}
                        onOpenChange={(res) => {
                          if (res) {
                            const date1 =
                              SaveDateInState[0] ||
                              moment().startOf("month").subtract(2, "M");
                            const date2 =
                              SaveDateInState[1] ||
                              moment().endOf("month").add(2, "M");
                            PropertyType === "Nextpax"
                              ? FetchAvailableDateNextPax(date1, date2)
                              : null;
                          }
                        }}
                        onPanelChange={(current) => {
                          const currentdata = current[0] || current[1];

                          const date1 = moment(
                            new Date(currentdata.year(), currentdata.month(), 1)
                          )
                            .subtract(2, "M")
                            .format("MM-DD-YYYY");
                          const date2 = moment(
                            new Date(currentdata.year(), currentdata.month(), 1)
                          )
                            .add(2, "M")
                            .format("MM-DD-YYYY");
                          setSaveDateInState([date1, date2]);
                          FetchAvailableDateNextPax(date1, date2);
                        }}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <hr />

              <Dropdown className={ViewPropertyCss.dropdown_parent}>
                <Dropdown.Toggle
                  className={ViewPropertyCss.guest}
                  id="dropdown-basic"
                >
                  {adult + child + infant + pet} Guests
                </Dropdown.Toggle>

                <Dropdown.Menu className={ViewPropertyCss.adultChild}>
                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-1">
                        {" "}
                        <span className={ViewPropertyCss.ageName}>
                          {adult} Adults
                        </span>
                      </Dropdown.Item>
                    </div>

                    <div className={ViewPropertyCss.geust_incri_btns_div}>
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
                    </div>
                  </div>

                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-2">
                        {" "}
                        <span className={ViewPropertyCss.ageName}>
                          {child} Children
                        </span>
                      </Dropdown.Item>
                    </div>

                    <div className={ViewPropertyCss.geust_incri_btns_div}>
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
                    </div>
                  </div>

                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-3">
                        {" "}
                        <span className={ViewPropertyCss.ageName}>
                          {infant} Infant
                        </span>
                      </Dropdown.Item>
                    </div>

                    <div className={ViewPropertyCss.geust_incri_btns_div}>
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decInfant}
                        >
                          -
                        </div>
                        <div className={ViewPropertyCss.guest_count_div}>
                          {infant}
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incInfant}
                        >
                          +
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div className={ViewPropertyCss.increase}>
                    <div>
                      <Dropdown.Item href="#/action-4">
                        {" "}
                        <span className={ViewPropertyCss.ageName}>
                          {pet} Pet
                        </span>
                      </Dropdown.Item>
                    </div>

                    <div className={ViewPropertyCss.geust_incri_btns_div}>
                      <Button className={ViewPropertyCss.increaseAdult}>
                        <div
                          className={ViewPropertyCss.decreasebtn}
                          onClick={decPet}
                        >
                          -
                        </div>
                        <div className={ViewPropertyCss.guest_count_div}>
                          {pet}
                        </div>
                        <div
                          className={ViewPropertyCss.increasebtn}
                          onClick={incPet}
                        >
                          +
                        </div>
                      </Button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <hr />

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
                  onClick={
                    PropertyType === "Rental" ? CreatePatymentIntent : test
                  }
                >
                  Reserve
                </Button>
              </div>

              {/* <p className={ViewPropertyCss.message}>You won't be charged yet</p>

              <div className={ViewPropertyCss.final_pricing}>
                <div>
                  <p>$400 * 5 nights</p>
                  <p>Cleaning fee</p>
                  <p>Service fee</p>
                </div>
                <div>
                  <p>$2,000</p>
                  <p>$175</p>
                  <p>$307</p>
                </div>
              </div>
              <hr />

              <div className={ViewPropertyCss.total}>
                <p>Total before taxes</p>
                <p>$2,482</p>
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

              {/* STATIC TOTAL CHARGES DIV */}
              {ShowOtherDetailsStatic ? (
                <>
                  <StaticPriceBreakDown
                    data={NextPaxFinalAvailPriceBreakDown}
                  />
                </>
              ) : (
                ""
              )}

              {/* STATIC TOTAL DIV */}
              {ShowTotalPaymentTextStatic ? (
                <>
                  <hr />

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
                </>
              ) : (
                ""
              )}

              {/* NEXTPAX API PAYMENT PORTAL */}
              {PropertyType === "Nextpax" &&
              ShowNextpaxPropertyPaymentPortal ? (
                <>
                  <hr />
                  <PaymentForm
                    data={{
                      propertyId: SpecificPropAPIData.data?.id,
                      from: BookingDate[0],
                      to: BookingDate[1],
                      total_guests: Params.guests,
                    }}
                  />
                </>
              ) : (
                <div className={ViewPropertyCss.checkout_payment_main_div}>
                  {/* RENTAL API PAYMENT PORTAL */}
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
              )}
            </Col>
          </Row>
        </Container>

        {/* GALLERY SECTION STARTS HERE */}
        <Container className={ViewPropertyCss.carasoul_section} id="gallery">
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
                        fallback="data:image/png;base64,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"
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
                            $
                            {SpecificPropAPIData.data?.price >= 0.5
                              ? Math.ceil(SpecificPropAPIData.data?.price)
                              : Math.floor(SpecificPropAPIData.data?.price)}
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
                          Maximum Nights Of A Booking:{" "}
                          <span
                            className={ViewPropertyCss.things_to_know_info_span}
                          >
                            {SpecificPropAPIData.data?.maxNightsOfBooking
                              ? SpecificPropAPIData.data?.maxNightsOfBooking
                              : 1}
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
                    Rooms:{" "}
                    {SpecificPropAPIData.data?.rooms
                      ? SpecificPropAPIData.data?.rooms
                      : 1}
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
                    Bedrooms:{" "}
                    {SpecificPropAPIData.data?.bedrooms
                      ? SpecificPropAPIData.data?.bedrooms
                      : 1}
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
                    Beds:{" "}
                    {SpecificPropAPIData.data?.beds
                      ? SpecificPropAPIData.data?.beds
                      : 1}
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
                    Payment Methods:{" "}
                    {SpecificPropAPIData.data?.paymentMethods
                      ? SpecificPropAPIData.data?.paymentMethods
                      : "Card"}
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
                    Bathrooms:{" "}
                    {SpecificPropAPIData.data?.bathrooms
                      ? SpecificPropAPIData.data?.bathrooms
                      : 1}
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
