/* eslint-disable react/no-unescaped-entities */
import ErrorPageStyle from "../styles/ErrorPageStyle.module.css";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Golfhom | 404 Page Not Found</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={ErrorPageStyle.page_404}>
        <div className={ErrorPageStyle.container}>
          <div className={ErrorPageStyle.row}>
            <div className={ErrorPageStyle.four_zero_four_bg}></div>
            <div className={ErrorPageStyle.four_zero_four_bg_btn_container}>
              <h4 className={ErrorPageStyle.heading}>Look like you're lost</h4>
              <p className={ErrorPageStyle.subheading}>
                The page you are looking for not available!
              </p>
              <Link className={ErrorPageStyle.link_404} href="/">
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
