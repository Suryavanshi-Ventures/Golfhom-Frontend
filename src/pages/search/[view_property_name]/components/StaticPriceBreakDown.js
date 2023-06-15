import React from "react";
import StaticPriceBreakDownCss from "../../../../styles/StaticPriceBreakDownCss.module.css";

const StaticPriceBreakDown = (props) => {
  console.log(props.data.breakdown.total, "FROM STATIC BREAKDOWN PAGE");

  return (
    <>
      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Additional Fee
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Cleaning
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Deposit
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Extra Person Price
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Fees
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Security Deposit
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_price_charges_text}>
            Taxes
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_price}>$ 0</p>
        </div>
      </div>

      <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <h5 className={StaticPriceBreakDownCss.total_charges_text}>
            Charges Total
          </h5>
        </div>
        <div className={StaticPriceBreakDownCss.total_price_text_div}>
          <p className={StaticPriceBreakDownCss.total_charges}>
            ${props?.data?.breakdown?.total}
          </p>
        </div>
      </div>
    </>
  );
};

export default StaticPriceBreakDown;
