import "./styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import { ShopPage } from "./pages/ShopPage";
import { SingleProductPage } from "./pages/SingleProductPage";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { ContactPage } from "./pages/ContactUsPage";
import { UserProfile } from "./pages/ProfilePage";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/404";
import { ToastContainer } from "react-toastify";

import { CheckoutComp } from "./components/Checkout";
import { ThankYou } from "./pages/thankYou";

import { useDispatch, useSelector } from "react-redux";
import { OrdersPage } from "./pages/order/order";
export default function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);
  let user = localStorage.getItem("ecomUser");
  if (!userState && user) {
    user = JSON.parse(user);
    dispatch({ type: "LOGIN_LOGOUT", payload: user });
  }
  console.log(userState, "userState");
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<SingleProductPage />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/checkout" element={<CheckoutComp />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/thankYou" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
