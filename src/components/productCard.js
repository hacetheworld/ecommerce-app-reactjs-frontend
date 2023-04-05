import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    thumbnail
  } = product;
  const id = _id;
  // console.log(id, "productCard");
  const dispatch = useDispatch();

  const addToCart = async (productId, cartQuantity) => {
    const token = localStorage.getItem("ecomAppToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      }
    };
    console.log(productId, cartQuantity);
    const response = await axios.post(
      "https://ecommerce-rest-api.vercel.app/api/v1/cart",
      {
        productId,
        cartQuantity
      },
      config
    );
    console.log(response.data, "response.data+response.id");
    if (response && response.data) {
      dispatch({
        type: "GET_CART",
        payload: {
          cart: response.data,
          totalPrice: 0
        }
      });
    }
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={thumbnail} />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title>{title}</Card.Title>
        </Link>
        <Card.Text>{description.slice(0, 100)}</Card.Text>
        <div className="product-info">
          <div className="product-price">
            <span className="price">
              ${(price - price * (discountPercentage / 100)).toFixed(2)}
            </span>
            {discountPercentage && (
              <span className="discount">{discountPercentage}% OFF</span>
            )}
          </div>
          <div className="product-rating">
            <span className="rating">{rating}</span>
            <i className="fas fa-star"></i>
          </div>
        </div>
      </Card.Body>
      <div className="mt-5 d-flex justify-content-between ">
        <Button variant="warning" onClick={() => addToCart(id, 1)}>
          Add to Cart
        </Button>
        <Link to={`/product/${id}`}>
          <Button variant="primary">View Product</Button>
        </Link>
      </div>
    </Card>
  );
};
