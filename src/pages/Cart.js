import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../customHooks/addToCart";
import { Link } from "react-router-dom";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { addToCart, getCart, calculateTotal } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container className="mt-3 mb-5">
      <Row>
        <Col>
          {cartItems &&
            cartItems.map((item) => (
              <Card className="mb-3" key={item.product._id}>
                <Card.Body>
                  <Row>
                    <Col xs={3}>
                      <Card.Img src={item.product.thumbnail} />
                    </Col>
                    <Col xs={9}>
                      <Card.Title>{item.product.title}</Card.Title>
                      <Card.Text>Price: ${item.product.price}</Card.Text>
                      <div className="d-flex">
                        <Button
                          onClick={() => addToCart(item.product._id, -1)}
                          variant="outline-secondary"
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          onClick={() => addToCart(item.product._id, 1)}
                          variant="outline-secondary"
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Total: ${totalPrice}</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link className="primary" to="/checkout">
            Checkout
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
