import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  console.log(cartItems, "cartirms");

  const handleAddToCart = (product, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    toast.success("Product Quantity updated to cart!", { autoClose: 2000 });
  };

  const handleRemoveFromCart = (product, quantity) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { product, quantity } });
    toast.warning("Product quantity remove from  cart!", { autoClose: 2000 });
  };

  return (
    <Container className="mt-3 mb-5">
      {cartItems.length > 0 ? (
        <>
          <Row>
            <Col>
              {cartItems.map((item) => (
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
                            onClick={() =>
                              handleRemoveFromCart(item.product, 1)
                            }
                            variant="outline-secondary"
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            onClick={() => handleAddToCart(item.product, 1)}
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
              <Link to="/checkout">
                <Button>Checkout</Button>
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <h3>Your cart is empty</h3>
      )}
    </Container>
  );
};
