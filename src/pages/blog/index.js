import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import BlogCss from "../../styles/Blog.module.css";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Index = () => {
  const Router = useRouter();
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
        <title>
          Golfhom Blog: Latest News & Insights on Golf Vacations | Golfhom
        </title>
        <meta
          name="description"
          content="Stay updated with Golfhom's blog featuring the latest news, insights, and tips for golf enthusiasts. Discover how to make the most of your golf vacations with our articles from staff and guest writers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TOP IMAGE OF VIEW ALL PROPERTY PAGE */}
      <div>
        <Image
          src="https://golf-hom-latest-assets.s3.amazonaws.com/images/viewAllProps.png"
          alt="View All Property Image"
          fill
          className={BlogCss.imageChild}
        ></Image>
      </div>

      {/* NINE CARDS CONTAINER */}

      <Container className={BlogCss.cardsParent}>
        <h3 className={BlogCss.cardsTitle}>
          From the Golfhōm Staff and Guest Writers
        </h3>
        <Row>
          {BlogData?.map((item, index) => {
            return (
              <Col
                lg={4}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className={BlogCss.columnParent}
              >
                <div
                  onClick={(e) => {
                    Router.push({
                      pathname: `blog/${encodeURIComponent(item.title)}`,
                      query: {
                        id: item.id,
                      },
                    });
                  }}
                  className={BlogCss.parentOf_img_textCard}
                >
                  <div className={BlogCss.imageChild}>
                    <Image
                      src={item.image}
                      fill
                      className={BlogCss.blog_img}
                      alt={item.naming}
                    ></Image>
                  </div>

                  <div className={BlogCss.cardTextParent}>
                    <span
                      onClick={(e) => {
                        Router.push({
                          pathname: `blog/${encodeURIComponent(item.title)}`,
                          query: {
                            id: item.id,
                          },
                        });
                      }}
                      className={BlogCss.a_tag}
                    >
                      <h5 className={BlogCss.card_title}>{item.title}</h5>
                    </span>
                    <div className={BlogCss.contact_div}>
                      <Image
                        src="/images/vector/contact.svg"
                        alt="Contact Image"
                        width={20}
                        height={15}
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
                        width={18}
                        height={18}
                      ></Image>{" "}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Index;
