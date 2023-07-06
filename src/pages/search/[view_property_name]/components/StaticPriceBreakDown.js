import { useState, useEffect } from "react";
import React from "react";
import StaticPriceBreakDownCss from "./style/StaticPriceBreakDownCss.module.css";
import dayjs from "dayjs";
const StaticPriceBreakDown = (props) => {
  console.log(props, "STATIC PRICE BREAK DOWN COMPONENT");

  const [NightsCounter, setNightsCounter] = useState(0);
  useEffect(() => {
    const startDate = dayjs(props?.data?.arrivalDate); // Replace with your start date
    const endDate = dayjs(props?.data?.departureDate); // Replace with your end date
    setNightsCounter(endDate.diff(startDate, "days") || 0);

    return () => {};
  }, [props?.data?.arrivalDate, props?.data?.departureDate]);

  return (
    <>
      {props?.data?.property_type === "Nextpax" ? (
        //* SECTION FOR NEXTPAX PRICE BREAKDOWN
        <div>
          {/* REQUIRED CHARGES */}
          {props?.data?.NextpaxPriceBreakDown?.charges?.required.map(
            (Data, Index) => {
              return (
                <>
                  {Data.itemPrice === 0 ? (
                    ""
                  ) : (
                    <div
                      key={Index}
                      className={
                        StaticPriceBreakDownCss.total_price_charge_main_div
                      }
                    >
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <h5
                          className={
                            StaticPriceBreakDownCss.total_price_charges_text
                          }
                        >
                          {Data?.name === "FIN"
                            ? "Cleaning Fee"
                            : Data?.name === "BED"
                            ? "Bed linen"
                            : Data?.name === "DEP"
                            ? "Security Deposit"
                            : Data?.name}
                        </h5>
                      </div>
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <p className={StaticPriceBreakDownCss.total_price}>
                          ${Data?.itemPrice ? Data?.itemPrice : 0}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}

          {/* REQUIRED TAXESs */}
          {props?.data?.NextpaxPriceBreakDown?.requiredTaxes.map(
            (Data, Index) => {
              return (
                <>
                  {Data?.amountFlat === 0 ? (
                    ""
                  ) : (
                    <div
                      key={Index}
                      className={
                        StaticPriceBreakDownCss.total_price_charge_main_div
                      }
                    >
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <h5
                          className={
                            StaticPriceBreakDownCss.total_price_charges_text
                          }
                        >
                          {Data?.name ? Data?.name : "N/A"}
                        </h5>
                      </div>
                      <div
                        className={StaticPriceBreakDownCss.total_price_text_div}
                      >
                        <p className={StaticPriceBreakDownCss.total_price}>
                          ${Data?.amountFlat ? Data?.amountFlat : 0}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}
          {/* IF THERE IS NO CHARGES */}
          {props?.data?.NextpaxPriceBreakDown?.charges?.required.length === 0 &&
          props?.data?.NextpaxPriceBreakDown?.requiredTaxes.length === 0 ? (
            <p className={StaticPriceBreakDownCss.no_charges_text}>
              No Required Charges.
            </p>
          ) : (
            ""
          )}
          <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5 className={StaticPriceBreakDownCss.total_charges_text}>
                Total Charges
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_charges}>
                $
                {props?.data?.NextpaxPriceBreakDown?.breakdown?.total
                  ? props?.data?.NextpaxPriceBreakDown?.breakdown?.total
                  : 0}
              </p>
            </div>
          </div>
          <hr />
        </div>
      ) : (
        //* SECTION FOR RENTAL PRICE BREAKDOWN
        <div>
          {props?.data?.RentalpaxPriceBreakDown?.perday.length > 1 ? (
            <>
              {props?.data?.RentalpaxPriceBreakDown?.perday?.map(
                (Data, Index) => {
                  return (
                    <>
                      <div
                        className={
                          StaticPriceBreakDownCss.total_price_charge_main_div
                        }
                      >
                        <div
                          className={
                            StaticPriceBreakDownCss.total_price_text_div
                          }
                        >
                          <h5
                            className={
                              StaticPriceBreakDownCss.total_price_charges_text
                            }
                          >
                            Date ({dayjs(Data.DateFrom).format("MM-DD-YYYY")} To{" "}
                            {dayjs(Data.DateTo).format("MM-DD-YYYY")})
                          </h5>
                        </div>
                        <div
                          className={
                            StaticPriceBreakDownCss.total_price_text_div
                          }
                        >
                          <p className={StaticPriceBreakDownCss.total_price}>
                            ${Data.Price / 1}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </>
          ) : (
            <div
              className={StaticPriceBreakDownCss.total_price_charge_main_div}
            >
              <div className={StaticPriceBreakDownCss.total_price_text_div}>
                <h5
                  className={StaticPriceBreakDownCss.total_price_charges_text}
                >
                  Date (
                  {dayjs(
                    props?.data?.RentalpaxPriceBreakDown?.perday?.DateFrom
                  ).format("MM-DD-YYYY")}{" "}
                  To{" "}
                  {dayjs(
                    props?.data?.RentalpaxPriceBreakDown?.perday?.DateTo
                  ).format("MM-DD-YYYY")}
                  )
                </h5>
              </div>
              <div className={StaticPriceBreakDownCss.total_price_text_div}>
                <p className={StaticPriceBreakDownCss.total_price}>
                  ${props?.data?.RentalpaxPriceBreakDown?.perday?.Price / 1}
                </p>
              </div>
            </div>
          )}

          <div className={StaticPriceBreakDownCss.total_price_charge_main_div}>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <h5 className={StaticPriceBreakDownCss.total_charges_text}>
                Total Charges
              </h5>
            </div>
            <div className={StaticPriceBreakDownCss.total_price_text_div}>
              <p className={StaticPriceBreakDownCss.total_charges}>
                $
                {props?.data?.RentalpaxPriceBreakDown?.total
                  ? props?.data?.RentalpaxPriceBreakDown?.total
                  : 0}
              </p>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default StaticPriceBreakDown;
