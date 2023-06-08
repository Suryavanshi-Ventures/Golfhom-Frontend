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

          <div className={BottomGroupCss.newBtn}>
            <div md={8}>
              <h5 className={BottomGroupCss.grouptalkTitle}>
                THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default bottomGroup;
