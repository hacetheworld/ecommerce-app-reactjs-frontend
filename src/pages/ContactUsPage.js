import { useState } from "react";
import { Container } from "react-bootstrap";
import "./SignUp.css";
import axios from "axios";
export const ContactPage = () => {
  const submitForm = async (e) => {
    e.preventDefault();
    const { name, email, message } = e.target.elements;
    // console.log(name, email, message);
    const data = {
      name: name.value,

      email: email.value,
      message: message.value
    };

    const response = await axios.post(
      "https://ecommerce-rest-api.vercel.app/api/v1/contactus",
      data
    );

    console.log(response.data,"conatct")
  };

  return (
    <Container className="mb-5 mt-5">
      <h1 className="text-center mb-5">Contact Form</h1>
      <div className="signup-container">
        <form onSubmit={submitForm} className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Message</label>
          <textarea
            className="form-control"
            name="message"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Container>
  );
};
