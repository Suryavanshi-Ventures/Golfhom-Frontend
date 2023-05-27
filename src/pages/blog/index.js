import React, { useEffect, useState } from "react";
import Head from "next/head";
import BlogCss from "../../styles/Blog.module.css";
import ViewAllProps from "../../../public/images/viewAllProps.svg";
import Image from "next/image";
import BottomSection from "../../../common components/bottomGroup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Pagination } from "antd";
import blogs from "../json/blogs.json";
import Link from "next/link";
import axios from "axios";
import Loader from "../../../common components/loader";

const Index = ({ cards }) => {
  const [BlogData, setBlogData] = useState([{}]);
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  useEffect(() => {
    const GetBlogData = async () => {
      try {
        const BlogAPIRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/blog`
        );

        if (BlogAPIRes.status === 200) {
          setBlogData(BlogAPIRes.data.data);
          console.log(BlogAPIRes.data.data);
        }
      } catch (error) {
        console.log("ERROR ", error);
      }
    };
    GetBlogData();
    return () => {
      GetBlogData();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Golfhom | Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TOP IMAGE OF VIEW ALL PROPERTY PAGE */}
      <section className={BlogCss.headImage}>
        <Image
          src={ViewAllProps}
          alt="View All Property Image"
          fill
          className={BlogCss.imageChild}
        ></Image>
      </section>

      {/* NINE CARDS CONTAINER */}

      <Container className={BlogCss.cardsParent}>
        <h2 className={BlogCss.cardsTitle}>
          From the Golfhōm Staff and Guest Writers
        </h2>
        <Row>
          {BlogData?.map((item, index) => {
            return (
              <Col md={4} xs={12} key={index} className={BlogCss.columnParent}>
                <div className={BlogCss.parentOf_img_textCard}>
                  <div className={BlogCss.imageChild}>
                    <Image
                      src={item.image}
                      fill
                      className={BlogCss.blog_img}
                      alt={item.naming}
                    ></Image>
                  </div>

                  <div className={BlogCss.cardTextParent}>
                    <Link href="blog/view_blog" className={BlogCss.a_tag}>
                      <h5 className={BlogCss.card_title}>{item.title}</h5>
                    </Link>
                    <div className={BlogCss.contact_div}>
                      <Image
                        src="/images/vector/contact.svg"
                        alt="Contact Image"
                        width={20}
                        height={15}
                        className={BlogCss.contact}
                      ></Image>{" "}
                      <span className={BlogCss.byAdmin}>
                        {item.createdBy ? item.createdBy : "N/A"}
                      </span>
                    </div>

                    <div className={BlogCss.bookmarkDiv}>
                      <span className={BlogCss.bookmark_text}>
                        {item.tag?.join(", ")}
                      </span>
                    </div>

                    <div className={BlogCss.learnbtn}>
                      <p className={BlogCss.learnbtn_text}>Learn More</p>
                      <Image
                        className={BlogCss.learnIcon}
                        src="/images/vector/learnMore.svg"
                        alt="learnMore"
                        width={15}
                        height={15}
                      ></Image>{" "}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/*  -----------------     PAGINATION CONTAINER     -----------------   */}
      <Container className={BlogCss.pagination_container}>
        <Pagination
          colorText="#FF0000"
          showQuickJumper={false}
          showSizeChanger={false}
          defaultCurrent={2}
          total={500}
          onChange={onChange}
          className={BlogCss.pagination}
        />
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Index;
