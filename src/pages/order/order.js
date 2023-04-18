import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("ecomAppToken");
    const config = {
      headers: {
        "x-access-token": `${token}`
      }
    };
    fetch("https://ecommerce-rest-api.vercel.app/api/v1/order", config)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data, "data");
          setOrders(data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(orders, "orders");

  return (
    <div className="container">
      <h1 className="my-5">Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Status</th>
            <th>Shipping Address</th>
            <th>Total Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                <ul>
                  {order.orderItems.map((product) => (
                    <li key={product.product._id}>
                      {product.product.title} ({product.quantity})
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.status}</td>
              <td>{order.shippingAddress}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{new Date(order.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
