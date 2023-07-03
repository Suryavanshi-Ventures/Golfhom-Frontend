/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Container, Col, Row } from "react-bootstrap";
import BlogCss from "../../styles/Blog.module.css";
import Image from "next/image";
import CategoryIcon from "../../../public/images/vector/category_icon.svg";
import ViwBlogBannerImg from "../../../public/images/view_blog_banner_img.png";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { Skeleton } from "antd";
const BottomSection = dynamic(
  () => import("../../../common components/bottomGroup"),
  {
    suspense: true,
  }
);

const ViewBlog = () => {
  const [BlogData, setBlogData] = useState([{}]);
  const Router = useRouter();
  const UrlParams = Router.query;

  useEffect(() => {
    console.log(UrlParams);
    const GetBlogsById = async () => {
      const BlogsByIdRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/${UrlParams.id}`
      );

      if (BlogsByIdRes.status === 200) {
        console.log(BlogsByIdRes.data);
        setBlogData(BlogsByIdRes.data.data);
      }
    };
    GetBlogsById();

    return () => {};
  }, [UrlParams]);

  return (
    <>
      <Head>
        <title>Golfhom {UrlParams?.view_blog}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* VIEW BLOG STARTED */}
      <Container>
        <section className={BlogCss.view_blog_banner_img_section}>
          <div className={BlogCss.view_blog_date}>
            {BlogData?.createdAt ? (
              moment(BlogData?.createdAt).format("MMMM DD, YYYY")
            ) : (
              <Skeleton.Input size="small" active={true} />
            )}
          </div>
          <h4 className={BlogCss.view_blog_title}>
            {BlogData?.title ? (
              BlogData?.title
            ) : (
              <Skeleton.Input active={true} />
            )}
          </h4>

          <div className={BlogCss.view_blog_category_container_main}>
            <Row className={BlogCss.view_blog_category_rows}>
              <Col md={"auto"} className={BlogCss.view_blog_category_cols}>
                <p className={BlogCss.view_blog_category_text}>
                  by{" "}
                  <span className={BlogCss.view_blog_category_text_posted_by}>
                    {BlogData?.createdBy == null ? "N/A" : BlogData?.createdBy}
                  </span>
                </p>
              </Col>

              <Col md={"auto"} className={BlogCss.view_blog_category_cols}>
                <div className={BlogCss.view_blog_category_container}>
                  <div className={BlogCss.view_blog_category_img_container}>
                    <Image
                      width={24}
                      height={24}
                      className={BlogCss.view_blog_category_img}
                      src={CategoryIcon}
                      alt="bookmark category"
                    ></Image>
                  </div>
                  <p className={BlogCss.view_blog_category_text}>
                    {BlogData?.tag?.join(", ")}
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* VIEW BLOG JS BANNER IMG */}
          <div className={BlogCss.view_blog_banner_img_container}>
            <Image
              src={BlogData?.image ? BlogData?.image : ViwBlogBannerImg}
              fill
              alt="banner image golfhom blog"
              className={BlogCss.view_blog_banner_img}
            ></Image>
          </div>
        </section>

        {/* MIDDLE TEXT CONTAINER SECTION */}

        {BlogData?.body ? (
          <section className={BlogCss.view_blog_middle_text_section}>
            <main className={BlogCss.view_blog_middle_main_div}>
              <div className={BlogCss.view_blog_middle_text_para}>
                {/* {BlogData?.body ? BlogData?.body : <Skeleton active />} */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: BlogData?.body,
                  }}
                />
              </div>
            </main>
          </section>
        ) : (
          <Skeleton active />
        )}
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default ViewBlog;
