import { Row, Col } from "react-bootstrap";
import HomeCss from "./styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

const Slider = ({ slides }) => {
  return (
    <Row className={HomeCss.parent_State}>
      {slides.map((slide) => (
        <Col key={slide.id} md={3} sm={6} className={HomeCss.parentImage}>
          <Link
            href={`/search?latitude=${encodeURIComponent(
              slide?.lat
            )}&longitude=${encodeURIComponent(
              slide?.lng
            )}&location_name=${encodeURIComponent(slide?.name)}&limit=10`}
          >
            <div className={HomeCss.image_Parent}>
              <Image
                className={HomeCss.sliderImage}
                src={slide.src}
                alt={slide.name}
                layout="fill"
              />
            </div>
          </Link>
          <h4 className={HomeCss.countryName}>{slide.name}</h4>
        </Col>
      ))}
    </Row>
  );
};

export default Slider;
