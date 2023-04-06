import React from "react";
import { Navbar, Nav, Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { useAuthRedirect } from "../isLoggedIn";

export const UserProfile = (props) => {
  // Protected route is loogedin
  const userState = useSelector((state) => state.user.user);
  const obj = { name: "", email: "", userImage: "" };
  if (userState) {
    obj["name"] = userState.name;
    obj["email"] = userState.email;
    obj["userImage"] = userState.userImage;
  }
  // else {
  //   useAuthRedirect();
  // }
  const { name, email, userImage } = obj;
  console.log(userState, "userStateiprofile");

  return (
    <div className="user-profile">
      <Container fluid>
        <Row>
          <Col sm={3} className="sidebar">
            <div className="profile-image-wrapper">
              <Image src={userImage} roundedCircle className="profile-image" />
            </div>
            <Nav className="flex-column mt-3">
              <Link to="/" className="nav-link" activeClassName="active-link">
                Home
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </Nav>
          </Col>
          <Col sm={9} className="main-content">
            <div className="profile-info">
              {window.location.pathname === "/profile" && (
                <>
                  <h1>Welcome to your dashboard, {name}!</h1>
                  <p>Email: {email}</p>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
