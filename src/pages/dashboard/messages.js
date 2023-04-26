import React, { useState } from 'react'
import BottomSection from "../../../common components/bottomGroup";
import MessageCss from "../../styles/dashboard/message.module.css"
import Image from 'next/image';
import Laugh from "../../../public/images/laugh.svg";
import { Container } from 'react-bootstrap';

const Messages = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            {/* ---------------------------       BANNER IMAGE SECTION      --------------------------  */}
            <div className={MessageCss.laughContainer}>
                <Image
                    fill
                    className={MessageCss.laughimg}
                    src={Laugh}
                    alt="Laugh"
                ></Image>
            </div>

            {/*     -------------------------     TEXT AREA      ----------------------------    */}

            <Container>
                <h2 className={MessageCss.messages}>Messages</h2>
                <div className={MessageCss.formSort}>
                    <h3 className={MessageCss.form}>Form</h3>

                    <div className={MessageCss.sortDown}>
                        <h3 className={MessageCss.form}>Sort</h3>
                        <select id="my-dropdown" value={selectedOption} onChange={handleOptionChange}
                            className={MessageCss.asc}>
                            <option value="number">Asc</option>
                            <option value="number">900</option>
                            <option value="number">1000</option>
                        </select>
                    </div>
                </div>


                <p className={MessageCss.para}>You don't have any message at this moment.</p>

            </Container>

            {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

            <BottomSection />
        </>
    )
}

export default Messages
