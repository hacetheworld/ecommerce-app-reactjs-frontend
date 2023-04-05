import { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import { useAuthRedirect } from "../isLoggedIn";
export const SignInPage = () => {
  // Check for islogin
  useAuthRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // From redux

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async (e) => {
    e.preventDefault();
    const user = { email, password };

    if (email === "" || password === "") {
      return;
    }
    const response = await axios.post(
      "https://ecommerce-rest-lprmkz9iw-hacetheworld.vercel.app/api/v1/signin",
      user
    );
    console.log(response.data, "responsein signin");
    if (response.data && response.data.newUser) {
      localStorage.setItem("ecomAppToken", response.data.token);
      localStorage.setItem("ecomUser", JSON.stringify(response.data.newUser));
      dispatch({ type: "LOGIN_LOGOUT", payload: response.data.newUser });
      navigate("/shop");
    }
  };

  return (
    <Container className="mb-2 mt-5">
      <h1 className="text-center mb-5">SignIn</h1>
      <div className="login-container">
        <form onSubmit={getData} className="login-form">
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
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>.
          </p>
        </form>
      </div>
    </Container>
  );
};
