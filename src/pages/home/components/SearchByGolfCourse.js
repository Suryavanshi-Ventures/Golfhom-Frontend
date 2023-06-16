import React from "react";
import SearchByGolfCourseCss from "../style/SearchByGolfCourse.module.css";
import { Input, Space, Typography, Button, Select } from "antd";
import { Container, Col, Row } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

const SearchByGolfCourse = () => {
  return (
    <>
      <main className={SearchByGolfCourseCss.search_by_golf_course_Section}>
        <Container>
          <main className={SearchByGolfCourseCss.searchSection}>
            <div className={SearchByGolfCourseCss.searchSection_overlay}>
              <div className={SearchByGolfCourseCss.content}>
                <h3 className={SearchByGolfCourseCss.Title}>
                  Search the World Over by Course (38,000+ in our database) or
                  Tournament
                </h3>

                <div
                  className={SearchByGolfCourseCss.search_by_golf_containers}
                >
                  <Row className={SearchByGolfCourseCss.search_by_golf_row}>
                    <Col
                      md={6}
                      className={SearchByGolfCourseCss.search_by_golf_cols}
                    >
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_input_main_container
                        }
                      >
                        <h5
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by golf course
                        </h5>
                        <p
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Choose from thousands world-wide
                        </p>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container
                            }
                          >
                            <Input
                              placeholder="Enter Location"
                              prefix={<SearchOutlined />}
                              className={
                                SearchByGolfCourseCss.search_by_golf_inputs
                              }
                            />
                          </div>
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container
                            }
                          >
                            <Input
                              placeholder="Golf Course"
                              prefix={<SearchOutlined />}
                              className={
                                SearchByGolfCourseCss.search_by_golf_inputs
                              }
                            />
                          </div>
                        </div>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_btn_container
                          }
                        >
                          <Button
                            className={SearchByGolfCourseCss.search_by_golf_btn}
                          >
                            SEARCH
                          </Button>
                        </div>
                      </div>
                    </Col>

                    <Col
                      md={6}
                      className={SearchByGolfCourseCss.search_by_golf_cols}
                    >
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_input_main_container
                        }
                      >
                        <h5
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_headings
                          }
                        >
                          Search by Tournaments
                        </h5>
                        <p
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_container_subheadings
                          }
                        >
                          Check out our growing list of tour-spot rentals
                        </p>

                        <div
                          className={
                            SearchByGolfCourseCss.search_by_golf_input_parent_container
                          }
                        >
                          <div
                            className={
                              SearchByGolfCourseCss.search_by_golf_input_container_select
                            }
                          >
                            <Select
                              defaultValue=" Please select tournament"
                              options={[
                                {
                                  value: "PGA Championship",
                                  label: "PGA Championship",
                                },
                                {
                                  value: "The Master",
                                  label: "The Master",
                                },
                                {
                                  value: "The open championship",
                                  label: "The open championship",
                                },
                                {
                                  value: "The Tradition at Quinta",
                                  label: "The Tradition at Quinta",
                                },
                                {
                                  value: "US Open",
                                  label: "US Open",
                                },
                              ]}
                              trigger={["click"]}
                              className={
                                SearchByGolfCourseCss.search_by_golf_input_container_tourniA
                              }
                              size="large"
                            >
                              <Select.Option
                                onClick={(e) => e.preventDefault()}
                              >
                                <Typography.Link>
                                  <Space
                                    className={
                                      SearchByGolfCourseCss.search_by_golf_input_search_by_tourni
                                    }
                                  ></Space>
                                </Typography.Link>
                              </Select.Option>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          SearchByGolfCourseCss.search_by_golf_btn_container
                        }
                      >
                        <Link href="searchByTournaments">
                          <Button
                            className={SearchByGolfCourseCss.search_by_golf_btn}
                          >
                            SEARCH
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </main>
        </Container>
      </main>
    </>
  );
};

export default SearchByGolfCourse;
