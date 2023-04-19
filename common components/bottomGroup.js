import React from 'react'
import BottomGroupCss from "../src/styles/BottomGroup.module.css"
import Grouptalk from "../public/images/grouptalk.png";
import Image from 'next/image';
import { Button, Col } from 'react-bootstrap';

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
                        <h4 className={BottomGroupCss.grouptalkTitle}>THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS</h4>
                        <Button className={BottomGroupCss.searchBottom}>Search</Button>
                    </Col>
                </div>
            </section>
        </>
    )
}

export default bottomGroup
