import { useState, React, useEffect, useContext, Suspense } from "react";
import Head from "next/head";

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
import Calendar from "../../../../public/images/vector/calendar.svg";
import Map from "../../../../common components/map";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
const { TextArea } = Input;
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
const { RangePicker } = DatePicker;
import Checkout from "../../../Checkout";
import moment from "moment";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_TEST_PK_KEY}`
);
import dynamic from "next/dynamic";
import ThingsToKnow from "./components/ThingsToKnow";
import FeatureSection from "./components/FeatureSection";

const BottomSection = dynamic(
  () => import("../../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const PaymentPopUp = dynamic(() => import("./components/PaymentPopUp"), {
  suspense: true,
});

const StaticPriceBreakDown = dynamic(
  () => import("./components/StaticPriceBreakDown"),
  {
    suspense: true,
  }
);
const ContactToHost = dynamic(() => import("./components/ContactToHost"), {
  suspense: true,
});

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
  const [AvailDateNextpax, setAvailDateNextpax] = useState([]);
  const [AvailDateRental, setAvailDateRental] = useState([]);
  const [NextPaxFinalAvailPriceBreakDown, setNextPaxFinalAvailPriceBreakDown] =
    useState({});
  const [RentalFinalAvailPriceBreakDown, setRentalFinalAvailPriceBreakDown] =
    useState({});
  const [NightsCounter, setNightsCounter] = useState(0);
  const [StartingFromPrice, setStartingFromPrice] = useState(0);
  const [IsReserveVisible, setIsReserveVisible] = useState(true);
  const [PaymentIntentObjNextpax, setPaymentIntentObjNextpax] = useState({});
  const [PaymentIntentObjRental, setPaymentIntentObjRental] = useState({});
  const [TotalChargesNextpax, setTotalChargesNextpax] = useState(0);
  const [TotalChargesRental, setTotalChargesRental] = useState(0);

  useEffect(() => {
    const UrlParamId = window.location.pathname.split("/")[3];

    if (Params.adults || Params.childs) {
      setAdult(Number(Params.adults));
      setChild(Number(Params.childs));
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
            setStartingFromPrice(
              SpecificPropData.data.data?.price >= 0.5
                ? Math.ceil(SpecificPropData.data.data?.price)
                : Math.floor(SpecificPropData.data.data?.price)
            );

            setPropertyType("Nextpax");
          } else {
            setStartingFromPrice(
              SpecificPropData.data.data?.price >= 0.5
                ? Math.ceil(SpecificPropData.data.data?.price)
                : Math.floor(SpecificPropData.data.data?.price)
            );
            setPropertyType("Rental");
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

  const OnclickShowContactToHost = () => {
    setIsModalOpen(true);
  };

  const OnclickHideContactToHost = () => {
    setIsModalOpen(false);
  };
  const handleCancelContact = () => {
    setIsModalOpen(false);
  };

  const test = () => {
    console.log("TEST FUNCTION");
    setShowNextpaxPropertyPaymentPortal(true);
    setNewPayment(true);
  };

  const CreatePatymentIntent = async () => {
    setNewPayment(true);
  };

  // console.log(SpecificPropAPIData.data, "SPECIFIC PROPERTY");

  const OnChangeDateInput = (date, DateValue) => {
    if (DateValue[0] || DateValue[1]) {
      const StartDate = moment(DateValue[0]); // Replace with your start date
      const EndDate = moment(DateValue[1]); // Replace with your end date
      setNightsCounter(EndDate.diff(StartDate, "days") || 0);
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
          if (!AvailDateNextpax.includes(i)) iserror = true;
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
                setTotalChargesNextpax(
                  CheckAvailRes.data?.data?.breakdown?.total
                );
                setStartingFromPrice(CheckAvailRes?.data?.data?.breakdown?.adr);
                setAvailable(true);
                setNotAvailable(false);
                setShowTotalPaymentTextStatic(true);
                setPaymentIntentObjNextpax(CheckAvailRes.data.paymentIntent);
              } else {
                setAvailable(false);
                setNotAvailable(true);
                setShowTotalPaymentTextStatic(false);
                setShowOtherDetailsStatic(false);
                setShowNextpaxPropertyPaymentPortal(false);
              }
            }
          } catch (error) {
            if (error.response.status === 401) {
              message.error(
                `${error.response.data.message}, Please login to book hotels!`
              );
            }
            console.log(error, "ERROR CheckAvailability NEXTPAX");
          }
        };
        CheckAvail();
      } else {
        console.log("CALL RENTAL PRICING API NOW");
        const CheckAvail = async () => {
          const Token =
            sessionStorage.getItem("token") || localStorage.getItem("token");

          try {
            const CheckAvailRes = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/rentalunited/price?id=${Params.property_id}&from=${DateValue[0]}&to=${DateValue[1]}`,
              { headers: { Authorization: `Bearer ${Token}` } }
            );
            if (CheckAvailRes.status === 201) {
              setAvailable(true);
              setNotAvailable(false);
              setStartingFromPrice(CheckAvailRes?.data?.data?.avgPerNight);
              setTotalChargesRental(CheckAvailRes?.data?.data?.total);
              setPaymentIntentObjRental(CheckAvailRes.data?.paymentIntent);
              setRentalFinalAvailPriceBreakDown(CheckAvailRes?.data?.data);
              setShowTotalPaymentTextStatic(true);
            } else {
              setAvailable(false);
              setNotAvailable(true);
              setShowTotalPaymentTextStatic(false);
              setShowOtherDetailsStatic(false);
            }
          } catch (error) {
            setAvailable(false);
            setNotAvailable(true);
            setShowTotalPaymentTextStatic(false);
            setShowOtherDetailsStatic(false);

            if (
              error.response.data.message ===
                "Property is not available for a given dates - Minimum stay criteria not met!" ||
              "Property is not available for a given dates - Error occured!"
            ) {
              message.error(error.response.data.message);
              setShowTotalPaymentTextStatic(false);
              setShowOtherDetailsStatic(false);
            } else {
              message.error("Internal error, Something went wrong!");
              console.log(error, "ERROR CheckAvailability RENTAL");
              setShowTotalPaymentTextStatic(false);
              setShowOtherDetailsStatic(false);
            }
          }
        };
        CheckAvail();
      }
    }
  };

  //! API CALL AVAILABILITY CHECK
  const FetchAvailableDate = async (
    date1 = moment().startOf("month").format("MM-DD-YYYY"),
    date2 = moment().endOf("month").add(1, "month").format("MM-DD-YYYY")
  ) => {
    if (PropertyType === "Nextpax") {
      console.log("NEXTPAX");
      const data = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/nextpax/availability?id=${
          Params.property_id
        }&from=${moment(date1).format("MM-DD-YYYY")}&to=${moment(date2).format(
          "MM-DD-YYYY"
        )}`,
      }).then((res) => {
        if (res.status === 200) {
          const AvailDataNextpax = res.data?.data?.data?.[0]
            ? res.data?.data?.data?.[0]?.availability?.map((i) => i.date)
            : [];

          AvailDataNextpax?.splice(0, 10);
          setAvailDateNextpax(AvailDataNextpax);
        }
      });
    } else if (PropertyType === "Rental") {
      console.log("RENTAL");
      const Token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const data = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${Token}` },
        url: `${
          process.env.NEXT_PUBLIC_API_URL
        }/v1/rentalunited/availability?id=${Params.property_id}&from=${moment(
          date1
        ).format("MM-DD-YYYY")}&to=${moment(date2).format("MM-DD-YYYY")}`,
      })
        .then((res) => {
          if (res.status === 201) {
            const data = res.data.data;

            const AvailDateRental = data
              .filter((Object) => Object.IsBlocked === "false")
              .map((Object) => Object.Date);
            //! FINAL WORKING
            // let finaldata = data.filter((data, ind) => {
            //   return data.IsBlocked === "false";
            // });

            // finaldata = finaldata.map((data, ind) => {
            //   return data.Date;
            // });
            setAvailDateRental(AvailDateRental);
          }
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            message.error(
              `${err?.response?.statusText}, Please login to book hotels!`
            );
          }
        });
    }
  };

  // New Payment modal
  const [newPayment, setNewPayment] = useState(false);

  const handlePay = () => {
    // setNewPayment(false);
  };
  const handleCancel = () => {
    setNewPayment(false);
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
        <Container>
          <div className={ViewPropertyCss.view_prop_bannerimg_main_container}>
            <div className={ViewPropertyCss.view_prop_bannerimg_container}>
              <div className={ViewPropertyCss.view_prop_image_div_1}>
                <Image
                  alt="Golf group"
                  className={ViewPropertyCss.view_prop_bannerimg}
                  src={
                    SpecificPropAPIData.data?.imageUrl || GirlGroupBannerImage
                  }
                  fill
                  fallback="data:image/png;base64,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"
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
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                ></Image>
              </div>
            </div>
          </div>
        </Container>

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
                    <p className={ViewPropertyCss.starting_from_text}>
                      Starting From
                    </p>
                    <h4 className={ViewPropertyCss.totalTitle_h5}>
                      ${StartingFromPrice ? StartingFromPrice : 0}
                      <span className={ViewPropertyCss.night_price}>night</span>
                    </h4>
                  </div>
                </div>

                {/* <div className={ViewPropertyCss.review_parent}>
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
                </div> */}
              </div>
              <hr className={ViewPropertyCss.horizonaline} />
              {Available ? (
                <p className={ViewPropertyCss.date_avail_text}>
                  Your Dates are available!
                </p>
              ) : (
                ""
              )}
              {NotAvailable ? (
                <p className={ViewPropertyCss.date_not_avail_text}>
                  Your Dates are not available!
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
                          if (PropertyType === "Nextpax") {
                            return !AvailDateNextpax.includes(formattedDate);
                          } else if (PropertyType === "Rental") {
                            return !AvailDateRental.includes(formattedDate);
                          }
                        }}
                        onOpenChange={(res) => {
                          if (res) {
                            const date1 =
                              SaveDateInState[0] ||
                              moment().startOf("month").subtract(2, "M");
                            const date2 =
                              SaveDateInState[1] ||
                              moment().endOf("month").add(2, "M");
                            FetchAvailableDate(date1, date2);
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
                          FetchAvailableDate(date1, date2);
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

              {/* STATIC TOTAL DIV */}
              {ShowTotalPaymentTextStatic ? (
                <>
                  <div className={ViewPropertyCss.total_price_main_div}>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <h5 className={ViewPropertyCss.total_price_text}>
                        $
                        {`${StartingFromPrice ? StartingFromPrice : 0}
                         x ${NightsCounter} night`}
                      </h5>
                      <p className={ViewPropertyCss.total_price_inc_tax_text}>
                        Includes taxes and fees
                      </p>
                    </div>
                    <div className={ViewPropertyCss.total_price_text_div}>
                      <p className={ViewPropertyCss.total_price}>
                        {" "}
                        <strong>
                          ${StartingFromPrice * NightsCounter}
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

              {/* STATIC TOTAL CHARGES DIV */}
              {ShowOtherDetailsStatic ? (
                <>
                  <StaticPriceBreakDown
                    data={{
                      NextpaxPriceBreakDown: NextPaxFinalAvailPriceBreakDown,
                      RentalpaxPriceBreakDown: RentalFinalAvailPriceBreakDown,
                      property_type: PropertyType,
                    }}
                  />
                </>
              ) : (
                ""
              )}

              {/* NEXTPAX API PAYMENT PORTAL */}
              {PropertyType === "Nextpax" &&
              ShowNextpaxPropertyPaymentPortal ? (
                <>{/*//! OLD PAYMENT FORM WAS HERE */}</>
              ) : (
                <div className={ViewPropertyCss.checkout_payment_main_div}>
                  {/* RENTAL API PAYMENT PORTAL */}
                  {/* {Options != null && (
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
                  )} */}
                </div>
              )}

              {IsReserveVisible ? (
                <section>
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

                  <Modal
                    title="Payment Method"
                    open={newPayment}
                    onCancel={handleCancel}
                    footer={null}
                    centered={true}
                    maskClosable={false} // Set maskClosable to false to disable closing on outside click
                  >
                    <PaymentPopUp
                      data={{
                        propertyId: SpecificPropAPIData.data?.id,
                        poperty_name: SpecificPropAPIData.data?.name,
                        from: BookingDate[0],
                        to: BookingDate[1],
                        total_guests: Params.guests || adult + child + infant,
                        children: child,
                        adult: adult,
                        babies: infant,
                        pets: pet,
                        total_charges_nextpax: TotalChargesNextpax,
                        total_charges_rental: TotalChargesRental,
                        property_type: PropertyType,
                        paymentIntent:
                          PropertyType === "Nextpax"
                            ? PaymentIntentObjNextpax
                            : PaymentIntentObjRental,
                      }}
                    />
                  </Modal>

                  <div className={ViewPropertyCss.contactParent}>
                    {/* -----------      CONTACT TO HOST SECTION        -----------------*/}
                    <Modal
                      title="Contact to host"
                      footer={null}
                      open={isModalOpen}
                      onSignup={OnclickHideContactToHost}
                      onCancel={handleCancelContact}
                      width={440}
                      centered={true}
                    >
                      <ContactToHost
                        HideContactHostPopUp={OnclickHideContactToHost}
                      />
                    </Modal>
                    <Space>
                      <Button
                        className={ViewPropertyCss.contact}
                        onClick={OnclickShowContactToHost}
                      >
                        Contact to host
                      </Button>
                    </Space>
                  </div>
                </section>
              ) : (
                ""
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
            <FeatureSection data={SpecificPropAPIData.data} />
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
            <ThingsToKnow data={SpecificPropAPIData.data} />
          </Container>
        </section>
        {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}
        <BottomSection />
      </main>
    </>
  );
};

export default ViewProperty;
