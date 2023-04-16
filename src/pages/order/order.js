import React, { useState } from "react";
import { Table } from "react-bootstrap";

export function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      _id: "1",
      customer: { email: "johndoe@example.com" },
      products: [
        { _id: "1", product: { name: "Product A" }, quantity: 2 },
        { _id: "2", product: { name: "Product B" }, quantity: 1 }
      ],
      status: "Completed",
      shippingAddress: "123 Main St, Anytown, USA",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      totalAmount: 123.45,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  return (
    <div className="container">
      <h1 className="my-5">Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Status</th>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Total Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer.email}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.product.name} ({product.quantity})
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.status}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.paymentStatus}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{new Date(order.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
