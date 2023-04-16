import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../customHooks/addToCart";
import { useDispatch } from "react-redux";
export const SingleProductPage = () => {
  const { productId } = useParams();
  // console.log(productId);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const getCurrentProduct = async () => {
    const response = await axios.get(
      `https://ecommerce-rest-api.vercel.app/api/v1/product/${productId}`
    );
    setProduct(response.data);
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
      toast.success("Product added to cart!", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, []);

  console.log(product, "pfef");

  const p = {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
  };

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images
  } = product;

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col lg={6}>
            <Image src={thumbnail} fluid />
            <Row className="mt-2">
              {images &&
                images.map((img, idx) => (
                  <Col xs={3} key={idx}>
                    <Image src={img} fluid />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col lg={6} className="d-flex flex-column justify-content-between">
            <div>
              <h3>{title}</h3>
              <p className="text-muted">{description}</p>
              <p>
                <strong>Price:</strong> ${price}
              </p>
              <p>
                <strong>Discount:</strong> {discountPercentage}% off
              </p>
              <p>
                <strong>Brand:</strong> {brand}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Stock:</strong> {stock}
              </p>
              <div className="d-flex align-items-center">
                {Array.from({ length: Math.floor(rating) }, (_, i) => (
                  <BsStarFill key={i} className="text-warning" />
                ))}
                {rating % 1 > 0 && <BsStarHalf className="text-warning" />}
                {Array.from({ length: Math.floor(5 - rating) }, (_, i) => (
                  <BsStar key={i} className="text-warning" />
                ))}
                <span className="ml-2">{rating && rating.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={addToCart}>
              Add to Cart
            </button>
          </Col>
        </Row>
      </Container>
      {/* <Reviews /> */}
    </>
  );
};
