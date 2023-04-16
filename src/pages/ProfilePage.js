import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import useRequireLogin from "../customHooks/notUserLoggedIn";
export const UserProfile = (props) => {
  // Protected route is loogedin
  useRequireLogin();
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 sidebar">
          <div className="profile-image-wrapper">
            <img src={userImage} className="rounded-circle profile-image" />
          </div>
          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <Link to="/" className="nav-link" activeClassName="active-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-9 main-content">
          <div className="profile-info">
            {window.location.pathname === "/profile" && (
              <>
                <h1>Welcome to your dashboard, {name}!</h1>
                <p>Email: {email}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
