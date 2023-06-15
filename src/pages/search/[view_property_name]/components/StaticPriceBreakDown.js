import { React, useState, useEffect } from "react";
import StaticPriceBreakDownCss from "../../../../styles/StaticPriceBreakDownCss.module.css";
import moment from "moment";

const StaticPriceBreakDown = (props) => {
  const [NightsCounter, setNightsCounter] = useState(0);

  useEffect(() => {
    const startDate = moment(props?.data?.arrivalDate); // Replace with your start date
    const endDate = moment(props?.data?.departureDate); // Replace with your end date
    setNightsCounter(endDate.diff(startDate, "days") || 0);

    return () => {};
  }, [props?.data?.arrivalDate, props?.data?.departureDate]);

  console.log(props?.data?.arrivalDate, "FROM STATIC BREAKDOWN PAGE");
  return (
    <>
      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Total Nights
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>{NightsCounter}</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Discount
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>
            $
            {props.data.breakdown.discount
              ? props?.data?.breakdown?.discount
              : 0}
          </p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Cleaning Fee
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>
            $
            {props.data.breakdown.charges.itemized[0].value
              ? props?.data?.breakdown?.charges.itemized[0].value
              : 0}
          </p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Security Deposit
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>
            $
            {props.data.breakdown.requiredSecurityDeposit
              ? props?.data?.breakdown?.requiredSecurityDeposit
              : 0}
          </p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Taxes
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>
            $
            {props.data.breakdown.taxes.total
              ? props?.data?.breakdown?.taxes?.total
              : 0}
          </p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Base Amount
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>
            $
            {props?.data?.breakdown?.rentOnly
              ? props?.data?.breakdown?.rentOnly
              : 0}
          </p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_charges_text}>
            Total Charges
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_charges}>
            ${props?.data?.breakdown?.total ? props?.data?.breakdown?.total : 0}
          </p>
        </div>
      </div>
    </>
  );
};

export default StaticPriceBreakDown;
