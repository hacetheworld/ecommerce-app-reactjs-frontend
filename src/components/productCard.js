import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productCard.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
    toast.success("Product added to cart!", { autoClose: 2000 });
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
        <Button variant="warning" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Link to={`/product/${id}`}>
          <Button variant="primary">View Product</Button>
        </Link>
      </div>
    </Card>
  );
};
