import BottomGroupCss from "../src/styles/BottomGroup.module.css";
import Image from "next/image";

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
              src="https://golf-hom-latest-assets.s3.amazonaws.com/images/sky.png"
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
