import Image from 'next/image'
import React from 'react'
import Privacy from "../../public/images/privacy.svg";
import PrivacyPolicyCss from "../styles/PrivacyPolicy.module.css";
import { Button, Col, Container } from 'react-bootstrap';
import Grouptalk from "../../public/images/grouptalk.png";

const privacy = () => {
    return (
        <>
            {/*------------------------ PRIVACY POLICY TOP IMAGE------------------------ */}
            <div className={PrivacyPolicyCss.topImage}>
                <Image src={Privacy}
                    alt="Privacy"
                    fill
                    className={PrivacyPolicyCss.topImgChild}>
                </Image>
            </div>

            {/*------------------------ PRIVACY POLICY TEXT CONATINER------------------------ */}
            <Container>
                <h2 className={PrivacyPolicyCss.privacyTitle}>GOLFHOM.COM PRIVACY POLICY</h2>

                <p className={PrivacyPolicyCss.paraA}>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from golfhom.com (the “Site”).</p>

                <p className={PrivacyPolicyCss.paraB}>We have a strong commitment to security best practices and industry standards. The most secure way for guests to pay for a vacation rental is on our Site. Guests who pay on our Site have their transaction processed directly via our respected partners at Stripe and PayPal.</p>

                <p className={PrivacyPolicyCss.paraC}>We respect the rights and privacy of our users, and we expect our users to do the same vis-á-vis other businesses and individuals that they encounter on our platform. Feel free to contact us with any questions or concerns.</p>

                <h4 className={PrivacyPolicyCss.personal}>PERSONAL INFORMATION WE COLLECT</h4>

                <p className={PrivacyPolicyCss.paraD}>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”</p>


                <p className={PrivacyPolicyCss.paraE}>We collect Device Information using the following technologies:</p>


                <p className={PrivacyPolicyCss.paraF}>– “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>


                <p className={PrivacyPolicyCss.paraG}> – “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>


                <p className={PrivacyPolicyCss.paraH}> – “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.</p>


                <p className={PrivacyPolicyCss.paraI}> Additionally when you make a purchase, attempt to make a purchase, or sign up for information services through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers and banking information) email address, and phone number. We refer to this information as “Order Information.”</p>

                <p className={PrivacyPolicyCss.paraJ}>   When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>

                <p className={PrivacyPolicyCss.paraK}>We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our customers use the Site–you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>


                <p className={PrivacyPolicyCss.paraL}> Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

                <p className={PrivacyPolicyCss.paraM}> As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</p>


                <p className={PrivacyPolicyCss.paraN}> You can opt out of targeted advertising by:</p>


                <p className={PrivacyPolicyCss.paraO}> FACEBOOK – https://www.facebook.com/settings/?tab=ads
                    <br />
                    GOOGLE – https://www.google.com/settings/ads/anonymous
                    <br />
                    BING – https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</p>


                <h4 className={PrivacyPolicyCss.personal}>SHARING YOUR PERSONAL INFORMATION</h4>

                <p className={PrivacyPolicyCss.paraP}>  Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: http://optout.aboutads.info/.</p>


                <h5 className={PrivacyPolicyCss.smallHeading}>DO NOT TRACK</h5>

                <p className={PrivacyPolicyCss.paraQ}>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>


                <h5 className={PrivacyPolicyCss.smallHeading}>YOUR RIGHTS </h5>

                <p className={PrivacyPolicyCss.paraR}>You have the right to ask us at any time:</p>

                <p className={PrivacyPolicyCss.paraS}> • to confirm whether we hold any of your personal data;</p>

                <p className={PrivacyPolicyCss.paraS}>   • to send you a copy of any personal data that we hold about you;</p>

                <p className={PrivacyPolicyCss.paraS}>  • to correct any inaccuracies in your personal data and to add relevant details where the personal data we hold is incomplete;</p>

                <p className={PrivacyPolicyCss.paraS}> • to delete (to the extent possible) any of your personal data, where we are required by law to do so;</p>

                <p className={PrivacyPolicyCss.paraS}>  • to stop processing your personal data, where we are required by law to do so;</p>

                <p className={PrivacyPolicyCss.paraS}>  • to let you have a portable copy of the personal data we hold about you, where we are required by law to do so;</p>

                <p className={PrivacyPolicyCss.paraS}>  • to stop processing any of your personal data that we process on the basis of our legitimate interests; and</p>

                <p className={PrivacyPolicyCss.paraS}> • to stop sending you marketing material. However please note that we may continue to send you service related (i.e. non-marketing) communications, such as email updates.</p>


                <p className={PrivacyPolicyCss.paraT}>If you are a European resident, you also of course have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact link below.</p>


                <p className={PrivacyPolicyCss.paraU}>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>


                <h5 className={PrivacyPolicyCss.smallHeading}>OTHER SITES</h5>

                <p className={PrivacyPolicyCss.paraV}> If any part of the Golfhom.com web site links you to other web sites, please know that those sites do not operate under this Privacy Policy. We recommend you examine the privacy statements posted on those other online entities to understand their procedures for collecting, using, and disclosing your personal information.</p>

                <h5 className={PrivacyPolicyCss.smallHeading}>DATA RETENTION</h5>

                <p className={PrivacyPolicyCss.paraW}> When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                    <br />
                    MINORS
                    <br />
                    The Site is not intended for individuals under the age of 16.
                    <br />
                    CHANGES
                    <br />
                    We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. We will notify you about material changes to this policy by sending you notice to the e-mail address you provided in your user profile, or by placing a prominent notice on our web site.</p>


                <h5 className={PrivacyPolicyCss.smallHeading}> CONTACT US</h5>

                <p className={PrivacyPolicyCss.paraX}>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us via our <span>Contact Us page</span></p>

            </Container>

            {/* BOTTOM IMAGE SECTION */}

            <section className={PrivacyPolicyCss.grouptalk}>
                <div>
                    <div className={PrivacyPolicyCss.groupParent}>
                        <Image
                            alt="group talk"
                            className={PrivacyPolicyCss.grouptalk}
                            src={Grouptalk}
                            fill
                        ></Image>
                    </div>

                    <Col md={4} className={PrivacyPolicyCss.newBtn}>
                        <h4 className={PrivacyPolicyCss.grouptalkTitle}>THE NEW VACATION-RENTAL VALHALLA FOR GOLFERS</h4>
                        <Button className={PrivacyPolicyCss.search}>Search</Button>
                    </Col>
                </div>
            </section>
        </>
    )
}

export default privacy
