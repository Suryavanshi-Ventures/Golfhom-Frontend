import { useEffect, useState, useContext } from "react";
import UserProfieCss from "../../styles/dashboard/UserProfile.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Head from "next/head";
import UserImg from "../../../public/images/user_img.webp";
import Image from "next/image";
import { Input, Button, Form, Modal } from "antd";
const { TextArea } = Input;
import ProtectedRoute from "../../../common components/protected_route";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";

const UserProfile = () => {
  const ContextUserDetails = useContext(AuthContext);
  const [IsFormDisabled, setIsFormDisabled] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    const GetProfileData = async () => {
      try {
        //* check if user is authenticated
        const Token =
          sessionStorage.getItem("token") || localStorage.getItem("token");

        const GetProfileDataRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (GetProfileDataRes.status === 200) {
          console.log(GetProfileDataRes.data.data, "PRIOFLEEE Daata");
          setIsFormDisabled(false);
          form.setFieldsValue({
            username: GetProfileDataRes.data.data.user.username,
            email: GetProfileDataRes.data.data.user.email,
          });
        }
      } catch (error) {
        console.log(error, "ERROR IN GET PROFILE DATA");
      }
    };
    GetProfileData();

    return () => {};
  }, []);

  const RefreshPopUp = () => {
    let secondsToGo = 7;
    const instance = modal.success({
      title: "Profile updated successfully!",
      content: (
        <span className={UserProfieCss.user_profile_updated_popup_text}>
          Please do not refresh the page, Redirecting in {secondsToGo} second.
        </span>
      ),
      centered: true,
      footer: null,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <span className={UserProfieCss.user_profile_updated_popup_text}>
            Please do not refresh the page, Redirecting in {secondsToGo} second.
          </span>
        ),
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      window.location.reload();
    }, secondsToGo * 1000);
  };

  const OnSubmitSave = (values) => {
    setIsLoading(true);
    console.log("Success:", values);

    const UpdateProfile = async () => {
      try {
        const UpdateProfileRes = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/updateMe`,
          { username: values.username },
          {
            headers: {
              Authorization: `Bearer ${ContextUserDetails.UserState}`,
            },
          }
        );

        if (UpdateProfileRes.status === 200) {
          console.log(UpdateProfileRes.data.data, "UPDATE PROFILE Daata");
          setIsLoading(false);
          if (localStorage.getItem("Uname")) {
            localStorage.setItem("Uname", values.username);
          } else if (sessionStorage.getItem("Uname")) {
            sessionStorage.setItem("Uname", values.username);
          }
          RefreshPopUp();
        }
      } catch (error) {
        console.log(error, "ERROR IN GET PROFILE DATA");
        setIsLoading(false);
      }
    };
    UpdateProfile();
  };
  const OnSubmitFailed = (errorInfo) => {
    setIsLoading(false);

    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>Golfhom | User Profile</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          {/* REDIRECT POP MODAL */}
          {contextHolder}
          {/* PROFILE PAGE MAIN HEADING */}
          <h3 className={UserProfieCss.user_profile_page_heading}>Profile</h3>
          <Form
            form={form}
            disabled={IsFormDisabled}
            name="user_profile_info"
            onFinish={OnSubmitSave}
            onFinishFailed={OnSubmitFailed}
            autoComplete="off"
          >
            <section className={UserProfieCss.user_profile_page_info_section}>
              {/* PROFILE SECTION */}
              <div>
                <h4 className={UserProfieCss.user_profile_page_section_heading}>
                  Photo
                </h4>
                <div className={UserProfieCss.user_profile_page_pic_container}>
                  <Image
                    src={UserImg}
                    height={160}
                    width={160}
                    className={UserProfieCss.user_profile_page_pic}
                    alt="Profile pic"
                  ></Image>
                </div>
              </div>
            </section>

            {/* INFORMATION SECTION */}
            <section className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Information
              </h5>

              <hr />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5}>
                  {/* DIV 1 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      User Name
                    </label>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="User Name"
                      />
                    </Form.Item>
                  </div>

                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Last Name
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Last Name"
                    />
                  </div>
                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      First Name
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="First Name"
                    />
                  </div>
                  {/* INPUT TEXT AREA */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Bio
                    </label>
                    <TextArea
                      autoSize
                      placeholder="Bio here..."
                      className={UserProfieCss.user_profile_page_info_input}
                    />
                  </div>
                </Col>
              </Row>
            </section>

            {/* ADDRESS SECTION */}
            <section className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Address
              </h5>
              <hr className={UserProfieCss.user_profile_page_hr} />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 1 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Street Address
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Address"
                    />
                  </div>

                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      State
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="State"
                    />
                  </div>

                  {/* DIV 4 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Country
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Country"
                    />
                  </div>
                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      City
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="City"
                    />
                  </div>
                  {/* DIV 3 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Zip Code
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Code"
                    />
                  </div>
                </Col>
              </Row>
            </section>

            {/* PHONE SECTION */}
            <section className={UserProfieCss.user_profile_page_info_section}>
              <h5 className={UserProfieCss.user_profile_page_section_heading}>
                Contact
              </h5>
              <hr className={UserProfieCss.user_profile_page_hr} />
              <Row className={UserProfieCss.user_profile_page_rows}>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Email
                    </label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email!",
                        },
                      ]}
                    >
                      <Input
                        className={UserProfieCss.user_profile_page_info_input}
                        placeholder="Email"
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col md={5} className={UserProfieCss.user_profile_page_cols}>
                  {/* DIV 2 */}
                  <div
                    className={UserProfieCss.user_profile_page_info_input_div}
                  >
                    <label
                      className={
                        UserProfieCss.user_profile_page_info_input_label
                      }
                      htmlFor=""
                    >
                      Phone
                    </label>
                    <Input
                      className={UserProfieCss.user_profile_page_info_input}
                      placeholder="Phone"
                    />
                  </div>
                </Col>
                {/* SAVE BTN CONTAINER */}
                <div
                  className={UserProfieCss.user_profile_page_save_btn_container}
                >
                  <Button
                    loading={IsLoading}
                    className={UserProfieCss.user_profile_page_save_btn}
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </div>
              </Row>
            </section>
          </Form>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default UserProfile;
