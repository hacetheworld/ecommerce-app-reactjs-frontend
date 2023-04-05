import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useAuthRedirect } from "../isLoggedIn";

import { useDispatch, useSelector } from "react-redux";
export const SignUpPage = () => {
  // Check for islogin and if lo
  useAuthRedirect();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState("");

  // From redux
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    setUserImage(file);
    // };
  };
  const getData = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("userImage", userImage);
    // console.log(myForm);
    // const user = { name, email, password, userImage };
    const response = await axios.post(
      "https://ecommerce-rest-api.vercel.app/api/v1/signup",
      myForm,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(response.data);
    if (response.data && response.data.newUser) {
      localStorage.setItem("ecomAppToken", response.data.token);
      localStorage.setItem("ecomUser", JSON.stringify(response.data.newUser));
      dispatch({ type: "LOGIN_LOGOUT", payload: response.data.newUser });
      navigate("/");
    }
  };

  return (
    <Container className="mb-2 mt-5">
      <h1 className="text-center mb-5">SignUp</h1>
      <div className="signup-container">
        <form
          onSubmit={getData}
          className="signup-form"
          encType="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <input
            type="file"
            id="userImage"
            name="userImage"
            onChange={(e) => changeImageHandler(e)}
          />
          <button type="submit">Signup</button>
          <p>
            Already have an account? <Link to="/signin">Login here</Link>.
          </p>
        </form>
      </div>
    </Container>
  );
};
