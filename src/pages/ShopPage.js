import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { ProductCard } from "../components/productCard";
import axios from "axios";

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce-rest-api.vercel.app/api/v1/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5 text-center">Shop Items</h1>
      <Row>
        <Col md={4} sm={6} xs={12}>
          <Form.Control
            type="text"
            placeholder="Search by title"
            onChange={handleSearchInputChange}
          />
        </Col>
      </Row>
      <Row className="container">
        {loading ? (
          <Spinner animation="border" role="status" className="mx-auto">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : currentProducts.length ? (
          currentProducts.map((product) => (
            <Col md={4} sm={6} xs={12} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <h5 className="mx-auto">No products to display.</h5>
        )}
      </Row>
      <div className="mt-3 d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(
                products.filter((product) =>
                  product.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ).length / productsPerPage
              )
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
};
