import { useState, useContext, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthRedirect } from "../isLoggedIn";
import "./SignIn.css";
export const SignInPage = () => {
  // Check for islogin
  useAuthRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // From redux
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const response = await axios.post(
        "https://ecommerce-rest-api.vercel.app/api/v1/signin",
        { email, password }
      );
      if (response.data && response.data.message) {
        setError(response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      if (response.data && response.data.newUser) {
        localStorage.setItem("ecomAppToken", response.data.token);
        localStorage.setItem("ecomUser", JSON.stringify(response.data.newUser));
        dispatch({ type: "LOGIN_LOGOUT", payload: response.data.newUser });
        navigate("/shop");
      }
    } catch (error) {
      setError("Invalid email or password");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <Container className="mb-2 mt-5">
      <h1 className="text-center mb-5">SignIn</h1>
      {error && (
        <Alert variant="danger">
          <h4>{error}</h4>
        </Alert>
      )}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
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
