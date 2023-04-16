import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid ">
        <Link className="navbar-brand text-white" to="/">
          AMAZON
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          onClick={toggleMenu}
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`offcanvas offcanvas-end ${showMenu ? "show" : ""}`}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              AMAZON
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleMenu}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body bg-dark">
            <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <div className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/shop"
                  onClick={toggleMenu}
                >
                  SHOP
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/cart" onClick={toggleMenu}>
                  Cart
                </Link>
              </div>
              {/*               

              <div className="nav-item">
                <Link className="nav-link" to="/checkout" onClick={toggleMenu}>
                  Checkout
                </Link>
              </div> */}
              
              {!user ? (
                <>
                  <div className="nav-item">
                    <Link
                      className="nav-link"
                      to="/signin"
                      onClick={toggleMenu}
                    >
                      SignIn
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      className="nav-link"
                      to="/signup"
                      onClick={toggleMenu}
                    >
                      Signup
                    </Link>
                  </div>
                </>
              ) : (
                <>
                <div className="nav-item">
                <Link className="nav-link" to="/profile" onClick={toggleMenu}>
                  Profile
                </Link>
              </div>
                <div className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    onClick={() => {
                      localStorage.removeItem("ecomAppToken");
                      localStorage.removeItem("ecomUser");
                      dispatch({ type: "LOGIN_LOGOUT", payload: null });
                      toggleMenu();
                    }}
                  >
                    Logout
                  </Link>
                </div>
                </>
              )}

              <div className="nav-item">
                <Link className="nav-link" to="/contact" onClick={toggleMenu}>
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
