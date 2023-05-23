import ViewPropertyCss from "../../styles/ViewProperty.module.css";
import { Container, Col, Row } from "react-bootstrap";
import ViewPropBedIcon from "../../../public/images/vector/bed.svg";
import ViewPropBathroomIcon from "../../../public/images/vector/bathroom_icon.svg";

import Image from "next/image";

const TabContentOverview = ({ data }) => {
  return (
    <>
      <main className={ViewPropertyCss.tabOverviewSection}>
        <h1 className={ViewPropertyCss.tabOverviewPropHeading}>
          {data && data.name}
        </h1>
        <p className={ViewPropertyCss.tabOverviewPropSmallSubheading}>
          Golf Course Vicinity:{" "}
          {data && data.golfCourseName ? data.golfCourseName : "N/A"}
        </p>
        <p className={ViewPropertyCss.tabOverviewPropSubheading}>
          Orange Tree Golf Club - Orange Tree
        </p>

        {/* Rest of the code */}
      </main>
    </>
  );
};

export default TabContentOverview;
