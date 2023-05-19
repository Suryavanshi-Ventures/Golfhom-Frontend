import React from "react";
import BottomGroupCss from "../src/styles/BottomGroup.module.css";
import Grouptalk from "../public/images/grouptalk.svg";
import Image from "next/image";
import { Button, Col } from "react-bootstrap";
import Link from "next/link";

const bottomGroup = () => {
  return (
    <>
      {/* BOTTOM IMAGE SECTION */}

      <section className={BottomGroupCss.grouptalk}>
        <div>
          <div className={BottomGroupCss.groupParent}>
            <Image
              alt="group talk"
              className={BottomGroupCss.grouptalk}
              src={Grouptalk}
              fill
            ></Image>
          </div>

          <Col md={4} className={BottomGroupCss.newBtn}>
            <h4 className={BottomGroupCss.grouptalkTitle}>
              THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS
            </h4>
            <Link href="/search" className={BottomGroupCss.searchBottom_link}>
              {" "}
              <Button className={BottomGroupCss.searchBottom}>
                Search
              </Button>{" "}
            </Link>
          </Col>
        </div>
      </section>
    </>
  );
};

export default bottomGroup;
