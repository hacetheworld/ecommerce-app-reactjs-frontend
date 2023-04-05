import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className="text-center">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for doesn't exist.</p>
          <Link to="/" variant="primary">
            Go to Homepage
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
