/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, React, Suspense } from "react";
import Head from "next/head";
import { Container, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import SearchIndexCss from "../../styles/SearchIndex.module.css";
import { Dropdown as ReactDropdown } from "react-bootstrap";
import {
  Checkbox,
  Input,
  Button,
  Dropdown,
  Space,
  Select,
  Form,
  message,
  Skeleton,
  DatePicker,
  Pagination,
  Typography,
} from "antd";
import { DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import CarasoulMapCss from "../../styles/CarouselMap.module.css";
import Dot from "../../../public/images/vector/dot.svg";
import PropNotFoundImg from "../../../public/images/vector/golf-hole.png";
import Map from "../../../common components/map";
import Loader from "../../../common components/loader";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const placesLibrary = ["places"];
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Index = () => {
  const Router = useRouter();
  const [showHidden, setShowHidden] = useState(false);
  const [LengthOfProperty, SetLengthOfProperty] = useState(0);
  const [PropertyData, SetPropertyData] = useState([]);
  const [PaginationState, setPagination] = useState(1);
  const [Parentindex, setParentindex] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [SortBy, setSortBy] = useState("createdAt");
  const [SortByParam, setSortByParam] = useState("");
  const [SearchOptions, setSearchOptions] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [searchGolfResult, setSearchGolfResult] = useState("");
  const [golfCourse, setGolfCourse] = useState("");
  const [UrlParamsDateRange, setUrlParamsDateRange] = useState([]);
  const [Available, setAvailable] = useState(false);
  const [AvailabilityCalender, setAvailabilityCalender] = useState([{}]);
  const [UpdateSortByText, setUpdateSortByText] = useState("Date New to Old");
  const [TotalDataCount, setTotalDataCount] = useState();
  const param = Router.query;
  const [IsLoaderVisible, setIsLoaderVisible] = useState(true);

  // DROPDOWN FOR SEARCH
  const OnChangeDateRange = (LocationName, DateValue) => {
    setUrlParamsDateRange(DateValue);
    console.log("ON CHANGE DATE RANGE", setUrlParamsDateRange);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: placesLibrary,
  });
  const [guest, setGuest] = useState(param.guest || 0);
  const onChangeGuest = (value) => {
    setGuest(value);
  };
  const [InputValue, setInputValue] = useState(
    param.location_name ? param.location_name : ""
  );

  const [golfInputValue, setGolfInputValue] = useState(
    param.location_name ? param.location_name : ""
  );

  console.log(InputValue, "input value");

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onGolfLoad = (autocomplete) => {
    setGolfCourse(autocomplete);
  };

  const OnSearchInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const OnGolfCourseChange = (event) => {
    console.log(event.target.value);
    setGolfInputValue(event.target.value);
  };

  const onPlaceChanged = (a) => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      setInputValue(formattedAddress);
    } else {
      message.error("Please enter text");
    }
  };


  const onGolfCourseChanged = () => {
    if (searchGolfResult != null) {
      const place = searchGolfResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
      setGolfInputValue(formattedAddress);
    } else {
      message.error("Please enter text");
    }
  };

  const [DateInputValues, setDateInputValues] = useState([
    dayjs(param.from).format("MM-DD-YYYY"),
    dayjs(param.to).format("MM-DD-YYYY"),
  ]);

  console.log(DateInputValues, "DATES OF AVALABILITY");

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
    return () => { };
  }, [Available, AvailabilityCalender]);

  const OnChangeDateInput = (date, DateValue) => {
    setDateInputValues(["", ""]);
    // setDateInputValues([dayjs(DateValue[0]), dayjs(DateValue[1])]);

    // SetBookingDate(DateValue);
    console.log(DateValue, "DATEEE VALUE");
  };

  const [isEditable, setIsEditable] = useState(false);

  const EditBtn = () => {
    setShowHidden(!showHidden);
    setIsEditable((prevIsEditable) => !prevIsEditable);
  };

  //* THIS WILL CALL  FIRST COMPONENT LOAD
  useEffect(() => {
    const GetPropertyData = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/property?${"latitude=" + param.latitude
      }&${"longitude=" + param.longitude}&${"accomodation=" + param.guest}&${"from=" + param.from
      }&${"to=" + param.to}&limit=10&page=1&sort=${SortBy}${SortByParam}`
    );
    GetPropertyData.then((response) => {
      if (response.status === 200) {
        SetPropertyData(response.data.data);
        SetLengthOfProperty(response.data.data.length);
        setTotalDataCount(response.data.count);
        setIsLoaderVisible(false);
        console.log(response.data, "API DATA PROPERTY ");
      }
    }).catch((err) => {
      console.log(err, "ERR");
    });

    return () => { };
  }, [
    param.from,
    param.guest,
    param.latitude,
    param.to,
    param.longitude,
    SortBy,
    SortByParam,
  ]);

  // FOR ADULT BUTTON INCREMENT AND DECREMENT
  const [adult, setAdult] = useState(0);
  // FOR CHILD BUTTON INCREMENT AND DECREMENT
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [pet, setPet] = useState(0);

  useEffect(() => {
    if (param.adults || param.childs) {
      setAdult(parseInt(param.adults));
      setChild(parseInt(param.childs));
    }
  })

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

  //! DEBUGG THIS
  // useEffect(() => {
  //   const GetPropertyData = axios.get(
  //     `${process.env.NEXT_PUBLIC_API_URL}/v1/property?limit=10&page=${PaginationState}&sort=${SortBy}${SortByParam}`
  //   );
  //   GetPropertyData.then((response) => {
  //     if (response.status === 200) {
  //       SetPropertyData(response.data.data);
  //       SetLengthOfProperty(response.data.data.length);
  //       console.log(response.data.data, "API DATA PROPERTY ");
  //     }
  //   }).catch((err) => {
  //     console.log(err, "ERR");
  //   });
  // }, [SortBy, PaginationState, SortByParam]);

  const handleSelectA = (selectedIndex, ParentIndexs, length) => {
    const LocalParent = [...Parentindex];
    if (selectedIndex > length - 1 || selectedIndex < 0) {
      LocalParent[ParentIndexs] = 0;
    } else {
      LocalParent[ParentIndexs] = selectedIndex;
    }
    setParentindex(LocalParent);
  };

  const OnPaginationChange = async (pageNumber) => {
    try {
      const GetPropertyData = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/property?${"latitude=" + param.latitude
        }&${"longitude=" + param.longitude}&${"accomodation=" + param.guest}&${"from=" + param.from
        }&${"to=" + param.to
        }&limit=10&page=${pageNumber}&sort=${SortBy}${SortByParam}`
      );

      if (GetPropertyData.status === 200) {
        SetPropertyData(GetPropertyData.data.data);
        SetLengthOfProperty(GetPropertyData.data.data.length);
        setPagination(pageNumber);
      }
    } catch (error) {
      console.log(error, "ERR");
    }

    console.log("Page: ", pageNumber);
  };

  const onClick = (event) => {
    setSortBy(event.key);
    if (event.key === "price_low") {
      setSortBy("price");
      setSortByParam("&sortBy=ASC");
      setUpdateSortByText("Price (Low to High)");
    } else if (event.key === "price_high") {
      setSortBy("price");
      setSortByParam("&sortBy=DESC");
      setUpdateSortByText("Price (High to Low)");
    } else if (event.key === "createdAt_old_to_new") {
      setSortBy("createdAt");
      setSortByParam("&sortBy=ASC");
      setUpdateSortByText("Date Old to New");
    } else if (event.key === "createdAt_new_to_old") {
      setSortBy("createdAt");
      setSortByParam("&sortBy=DESC");
      setUpdateSortByText("Date New to Old");
    }
  };

  const HiddenModal = () => {
    return (
      <>
        {/* EDIT DROP DETAIL SECTION */}

        <div className={SearchIndexCss.course_choice_parent}>
          <Col
            md={3}
            sm={6}
            xs={12}
            className={SearchIndexCss.edit_details_container_cols}
          >
            <div className={SearchIndexCss.edit_details_divs}>
              <p className={SearchIndexCss.edit_details_titles}>
                Golf Course Choice
              </p>
              <div className={SearchIndexCss.edit_details_inputs_container}>
                {isLoaded ? (
                  <Autocomplete
                    onGolfCourseChanged={onGolfCourseChanged}
                    onGolfLoad={onGolfLoad}
                  >
                    <Input
                      className={SearchIndexCss.inner_input_box}
                      size="large"
                      value={golfInputValue}
                      // value={param.location_name}
                      onChange={OnGolfCourseChange}
                      // name="search_input"
                      allowClear
                    />
                  </Autocomplete>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size={"mid"}
                    className={SearchIndexCss.input_skeleton}
                  />
                )}
              </div>
            </div>
          </Col>

          <Col
            md={3}
            sm={6}
            xs={12}
            className={SearchIndexCss.edit_details_container_cols}
          >
            <div className={SearchIndexCss.edit_details_divs}>
              <p className={SearchIndexCss.edit_details_titles}>Golf Course</p>
              <div className={SearchIndexCss.edit_details_inputs_container}>
                <Select
                  defaultValue=" Marmot Ridge Golf Course"
                  options={[
                    {
                      value: "Arizona",
                      label: "Arizona",
                    },
                    {
                      value: "New York",
                      label: "New York",
                    },
                  ]}
                  trigger={["click"]}
                  className={SearchIndexCss.edit_room_dropdown_btn}
                  size="large"
                >
                  <Select.Option onClick={(e) => e.preventDefault()}>
                    <Typography.Link>
                      <Space
                        className={SearchIndexCss.edit_room_dropdown_btn_space}
                      >
                        Marmot Ridge Golf Course
                        <DownOutlined
                          className={SearchIndexCss.edit_room_dropdown_icon}
                        />
                      </Space>
                    </Typography.Link>
                  </Select.Option>
                </Select>
              </div>
            </div>
          </Col>

          <Col md={6} className={SearchIndexCss.twoCheckbox}>
            <Col md={3} sm={6} xs={6} className={SearchIndexCss.front}>
              <Checkbox>Golf Course Front</Checkbox>
            </Col>
            <Col md={4} sm={6} xs={6} className={SearchIndexCss.front}>
              <Checkbox>Golf Course Community</Checkbox>
            </Col>

            <div className={SearchIndexCss.search_div}>
              <Button
                onClick={() => setShowHidden(true)}
                className={SearchIndexCss.searching}
              >
                Search
              </Button>
            </div>
          </Col>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Golfhom | Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/********** EDIT DETAILS SECTION  ***********/}
      <section>
        <main className={SearchIndexCss.edit_details_main_section}>
          <Container>
            <div className={SearchIndexCss.edit_details_main_container}>
              <Row className={SearchIndexCss.edit_details_container_row}>
                {/* <Form>
                  <Form.Item> */}
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>
                      Destination
                    </p>

                    <div
                      className={SearchIndexCss.edit_details_inputs_container}
                    >
                      {isLoaded ? (
                        <Autocomplete
                          onPlaceChanged={onPlaceChanged}
                          onLoad={onLoad}
                        >
                          <Input
                            className={SearchIndexCss.inner_input_box}
                            size="large"
                            value={InputValue}
                            // value={param.location_name}
                            onChange={OnSearchInputChange}
                            // name="search_input"
                            allowClear
                            disabled={!isEditable}
                          />
                        </Autocomplete>
                      ) : (
                        <Skeleton.Input
                          active={true}
                          size={"mid"}
                          className={SearchIndexCss.input_skeleton}
                        />
                      )}
                    </div>
                  </div>
                </Col>
                {/* </Form.Item>

                  <Form.Item> */}
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>
                      {(() => {
                        const startDate = moment(UrlParamsDateRange[0]); // Replace with your start date
                        const endDate = moment(UrlParamsDateRange[1]); // Replace with your end date
                        return endDate.diff(startDate, "days") || 0;
                      })()}{" "}
                      Nights
                    </p>

                    <div
                      className={SearchIndexCss.edit_details_inputs_container}
                    >
                      <RangePicker
                        defaultValue={[
                          dayjs(DateInputValues[0]),
                          dayjs(DateInputValues[1]),
                        ]}
                        size="large"
                        onChange={OnChangeDateInput}
                        className={SearchIndexCss.edit_details_date_picker}
                        disabledDate={(current) => {
                          return current && current < dayjs().startOf("day");
                        }}
                        format={"MM-DD-YYYY"}
                        disabled={!isEditable}
                      />
                    </div>
                  </div>
                </Col>
                {/* </Form.Item>

                  <Form.Item> */}
                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div className={SearchIndexCss.edit_details_divs}>
                    <p className={SearchIndexCss.edit_details_titles}>{adult + child + infant + pet} Guests</p>
                    <ReactDropdown
                      className={SearchIndexCss.edit_details_inputs_container}>
                      <ReactDropdown.Toggle
                        className={SearchIndexCss.inner_input_box}
                        id="dropdown-basic"
                        disabled={!isEditable}
                        onChange={(e) =>
                          onChangeGuest(parseInt(e.target.value))
                        }
                      // value={guest}
                      >
                        Please select guests
                      </ReactDropdown.Toggle>
                      <ReactDropdown.Menu className={SearchIndexCss.adultChild}>
                        <div className={SearchIndexCss.increase}>
                          <div>
                            <ReactDropdown.Item href="#/action-1">
                              {" "}
                              <span className={SearchIndexCss.ageName}>
                                {adult} Adults
                              </span>
                            </ReactDropdown.Item>
                          </div>

                          <div className={SearchIndexCss.geust_incri_btns_div}>
                            <Button className={SearchIndexCss.increaseAdult}>
                              <div
                                className={SearchIndexCss.decreasebtn}
                                onClick={decAdult}
                              >
                                -
                              </div>
                              <div className={SearchIndexCss.guest_count_div}>
                                {adult}
                              </div>
                              <div
                                className={SearchIndexCss.increasebtn}
                                onClick={incAdult}
                              >
                                +
                              </div>
                            </Button>
                          </div>
                        </div>

                        <div className={SearchIndexCss.increase}>
                          <div>
                            <ReactDropdown.Item href="#/action-2">
                              {" "}
                              <span className={SearchIndexCss.ageName}>
                                {child} Children
                              </span>
                            </ReactDropdown.Item>
                          </div>

                          <div className={SearchIndexCss.geust_incri_btns_div}>
                            <Button className={SearchIndexCss.increaseAdult}>
                              <div
                                className={SearchIndexCss.decreasebtn}
                                onClick={decChild}
                              >
                                -
                              </div>
                              <div className={SearchIndexCss.guest_count_div}>
                                {child}
                              </div>
                              <div
                                className={SearchIndexCss.increasebtn}
                                onClick={incChild}
                              >
                                +
                              </div>
                            </Button>
                          </div>
                        </div>

                        <div className={SearchIndexCss.increase}>
                          <div>
                            <ReactDropdown.Item href="#/action-3">
                              {" "}
                              <span className={SearchIndexCss.ageName}>
                                {infant} Infant
                              </span>
                            </ReactDropdown.Item>
                          </div>

                          <div className={SearchIndexCss.geust_incri_btns_div}>
                            <Button className={SearchIndexCss.increaseAdult}>
                              <div
                                className={SearchIndexCss.decreasebtn}
                                onClick={decInfant}
                              >
                                -
                              </div>
                              <div className={SearchIndexCss.guest_count_div}>
                                {infant}
                              </div>
                              <div
                                className={SearchIndexCss.increasebtn}
                                onClick={incInfant}
                              >
                                +
                              </div>
                            </Button>
                          </div>
                        </div>

                        <div className={SearchIndexCss.increase}>
                          <div>
                            <ReactDropdown.Item href="#/action-4">
                              {" "}
                              <span className={SearchIndexCss.ageName}>
                                {pet} Pet
                              </span>
                            </ReactDropdown.Item>
                          </div>

                          <div className={SearchIndexCss.geust_incri_btns_div}>
                            <Button className={SearchIndexCss.increaseAdult}>
                              <div
                                className={SearchIndexCss.decreasebtn}
                                onClick={decPet}
                              >
                                -
                              </div>
                              <div className={SearchIndexCss.guest_count_div}>
                                {pet}
                              </div>
                              <div
                                className={SearchIndexCss.increasebtn}
                                onClick={incPet}
                              >
                                +
                              </div>
                            </Button>
                          </div>
                        </div>
                      </ReactDropdown.Menu>
                    </ReactDropdown>
                  </div>
                </Col>
                {/* </Form.Item> */}

                <Col
                  md={3}
                  className={SearchIndexCss.edit_details_container_cols}
                >
                  <div
                    className={SearchIndexCss.edit_details_btn_parent_container}
                  >
                    <div
                      className={
                        SearchIndexCss.edit_details_btn_child_container
                      }
                    >
                      {isVisible && (
                        <Button
                          size="large"
                          className={SearchIndexCss.edit_details_btn}
                          onClick={EditBtn}
                        >
                          {showHidden ? "Close" : "Edit"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
                {showHidden && <HiddenModal />}
                {/* </Form> */}
              </Row>
            </div>
          </Container>
        </main>
      </section>

      {/* -----------------------           HEAD IMAGE SECTION             ---------------------  */}

      {/* -----------------------            ORLANDO SECTION             ---------------------  */}

      <section className={SearchIndexCss.search_main_section}>
        <Container>
          <Row>
            <h3 className={SearchIndexCss.orlandoHead}>
              {param.location_name ? param.location_name : ""}
            </h3>
            {/*    ----------------      CARD MAP SECTION      -------------------   */}
            <Col md={8}>
              <hr />

              <div className={SearchIndexCss.orlandParent}>
                <div className={SearchIndexCss.sortSection}>
                  <h5 className={SearchIndexCss.rental}>
                    {TotalDataCount} Rentals
                  </h5>

                  <div className={SearchIndexCss.sortdiv}>
                    <h6 className={SearchIndexCss.sort}>Sort By:</h6>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: "Price (Low to High)",
                            key: "price_low",
                          },
                          {
                            label: "Price (High to Low)",
                            key: "price_high",
                          },
                          {
                            label: "Date Old to New",
                            key: "createdAt_old_to_new",
                          },
                          {
                            label: "Date New to Old",
                            key: "createdAt_new_to_old",
                          },
                        ],
                        onClick,
                      }}
                      className={SearchIndexCss.default}
                    >
                      <Button size="large">
                        <Space>
                          {UpdateSortByText}
                          <CaretDownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                {/* ------------------- CAROUSEL IMAGES STARTS  -----------------------  */}

                <Row>
                  {IsLoaderVisible ? (
                    <>
                      <div className={SearchIndexCss.loader_main_div}>
                        <Loader />
                      </div>
                    </>
                  ) : !IsLoaderVisible && PropertyData.length === 0 ? (
                    <div className={SearchIndexCss.no_property_main_div}>
                      <Image
                        width={70}
                        height={70}
                        src={PropNotFoundImg}
                        alt="property not found"
                        className={SearchIndexCss.no_property_image}
                      ></Image>
                      <p className={SearchIndexCss.no_property_text}>
                        No Property Found!
                      </p>
                    </div>
                  ) : (
                    <>
                      {PropertyData.map((data, id) => (
                        <Col
                          md={6}
                          key={data.id}
                          className={CarasoulMapCss.carouselBlock}
                        >
                          <Carousel
                            wrap={true}
                            key={data.id}
                            activeIndex={Parentindex[id]}
                            onSelect={(selectedIndex) => {
                              handleSelectA(
                                selectedIndex,
                                id,
                                data.otherImageUrls?.length
                              );
                            }}
                            indicators={false}
                            interval={null}
                            className={CarasoulMapCss.carouselParent}
                          >
                            {data.otherImageUrls.map((element, ind) => {
                              return (
                                <Carousel.Item
                                  key={ind}
                                  style={{ position: "relative" }}
                                  className={CarasoulMapCss.imageGap}
                                >
                                  <div
                                    className={CarasoulMapCss.image_container}
                                    onClick={(e) => {
                                      Router.push({
                                        pathname: `search/${encodeURIComponent(
                                          data.name
                                        )}/${data.id}`,
                                        query: {
                                          from: param.from,
                                          to: param.to,
                                          guests: param.guest,
                                          adults: param.adults,
                                          childs: param.childs,
                                        },
                                      });
                                    }}
                                    style={{ position: "relative" }}
                                  >
                                    <Image
                                      src={element}
                                      alt={`image ${data.id}`}
                                      fill
                                      className={CarasoulMapCss.carouselImage}
                                    ></Image>
                                  </div>
                                </Carousel.Item>
                              );
                            })}
                          </Carousel>

                          <div
                            onClick={(e) => {
                              Router.push(
                                `search/${encodeURIComponent(data.name)}/${data.id
                                }`
                              );
                            }}
                            className={CarasoulMapCss.image_container}
                          >
                            <p
                              className={
                                CarasoulMapCss.price_of_property_text_from
                              }
                            >
                              From $
                              <span
                                className={
                                  CarasoulMapCss.price_of_property_text
                                }
                              >
                                {data.price >= 0.5
                                  ? Math.ceil(data.price)
                                  : Math.floor(data.price)}
                                /Night
                              </span>
                            </p>

                            <h4
                              onClick={(e) => {
                                Router.push(
                                  `search/${encodeURIComponent(data.name)}/${data.id
                                  }`
                                );
                              }}
                              className={CarasoulMapCss.carouselHeading}
                            >
                              {data.name}
                            </h4>
                          </div>
                          <p className={CarasoulMapCss.discribeOfCard}>
                            {data.golfCourseName}
                          </p>

                          <div
                            onClick={(e) => {
                              Router.push(
                                `search/${encodeURIComponent(data.name)}/${data.id
                                }`
                              );
                            }}
                            className={CarasoulMapCss.image_container}
                          >
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.bedrooms ? data.bedrooms : 1} Bed Rooms
                            </span>
                            <Image
                              src={Dot}
                              alt="Dot"
                              className={CarasoulMapCss.dot}
                            ></Image>
                            <span className={CarasoulMapCss.discribeOfCard}>
                              {data.accomodation} Guests Villa
                            </span>
                          </div>
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </div>
            </Col>
            {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
            <Col md={4} className={SearchIndexCss.mapParent}>
              <Map data={PropertyData} />
            </Col>
          </Row>

          <div className={SearchIndexCss.pagination_container}>
            <Pagination
              current={PaginationState}
              colorText="#FF0000"
              showQuickJumper={false}
              showSizeChanger={false}
              defaultCurrent={1}
              total={TotalDataCount}
              onChange={OnPaginationChange}
              className={SearchIndexCss.pagination}
            />
          </div>
        </Container>
      </section>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Index;
