import { Container, Row } from "react-bootstrap";
import { PRODUCTS } from "../data";
import { ProductCard } from "./productCard";

import "./HomePageTopProduct.css";
export const HomePageTopProduct = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <h1 className="display-4 fw-normal mb-5">Top Products</h1>
      </Row>
      <Row>
        <div className="homePage-products">
          <ProductCard product={PRODUCTS[0]} />
          <ProductCard product={PRODUCTS[1]} />
          <ProductCard product={PRODUCTS[2]} />
        </div>
      </Row>
    </Container>
  );
};
