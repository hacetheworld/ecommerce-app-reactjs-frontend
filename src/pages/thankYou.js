import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ThankYou = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className="text-center">
          <h1>Thank You For Shopping</h1>
          <p>Please Browse More Product</p>
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
