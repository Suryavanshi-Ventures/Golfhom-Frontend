import React from "react";
import BottomGroupCss from "../src/styles/BottomGroup.module.css";
import Sky from "../public/images/sky.png";
import Image from "next/image";
import { Button, Col, Row } from "react-bootstrap";
import Link from "next/link";

const bottomGroup = () => {
  return (
    <>
      {/* BOTTOM IMAGE SECTION */}

      <section className={BottomGroupCss.grouptalk}>
        <div>
          <div className={BottomGroupCss.groupParent}>
            <Image
              alt="Sky"
              className={BottomGroupCss.grouptalk}
              src={Sky}
              fill
            ></Image>
          </div>

          <Row className={BottomGroupCss.newBtn}>
            <Col md={8}>
              <h4 className={BottomGroupCss.grouptalkTitle}>
                THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS
              </h4>
            </Col>

            <Col md={3}>
              <Link href="/search" className={BottomGroupCss.searchBottom_link}>
                {" "}
                <Button className={BottomGroupCss.searchBottom}>
                  Search
                </Button>{" "}
              </Link>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default bottomGroup;
