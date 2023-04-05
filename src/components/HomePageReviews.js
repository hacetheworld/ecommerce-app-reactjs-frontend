import { Container, Row } from "react-bootstrap";
import "./HomePageReviews.css";
export const HomePageReviews = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <h1 className="display-4 fw-normal mb-5">Our Customers Feedback</h1>
      </Row>
      <Row>
        <div className="homePage-reviews">
          <div
            id="carouselExampleControlsNoTouching"
            className="carousel slide"
            data-bs-touch="false"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <p>hello Madarfucker</p>
              </div>
              <div className="carousel-item">
                <p>hello Madarfucker 2</p>
              </div>
              <div className="carousel-item">
                <p>hello Madarfucker 3</p>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControlsNoTouching"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControlsNoTouching"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </Row>
    </Container>
  );
};
