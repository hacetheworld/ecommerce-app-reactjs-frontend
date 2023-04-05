import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PRODUCTS } from "../data";
import { ProductCard } from "../components/productCard";
import axios from "axios";
export const ShopPage = () => {
  // console.log(PRODUCTS);
  const [PRODUCTS, setPRODUCTS] = useState([]);

  const getAllProduct = async () => {
    const response = await axios(
      "https://ecommerce-rest-api.vercel.app/api/v1/product"
    );
    setPRODUCTS(response.data);
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  console.log(PRODUCTS, "");
  return (
    <Container>
      <h1 className="mt-5 mb-5 text-center">Shop Items </h1>
      <Row className="container">
        {PRODUCTS &&
          PRODUCTS.map((product) => (
            <Col md={4} sm={6} xs={12} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};
