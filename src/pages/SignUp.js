import { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthRedirect } from "../isLoggedIn";
import { useDispatch, useSelector } from "react-redux";

export const SignUpPage = () => {
  useAuthRedirect();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState("");
  const [error, setError] = useState("");

  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  const getData = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("userImage", userImage);

    try {
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
      } else if (response.data && response.data.message) {
        setError(response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <Container className="mb-2 mt-5">
      <h1 className="text-center mb-5">SignUp</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
