import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CheckoutComp = () => {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const cart = cartState.cart;
  const totalPrice = cartState.totalPrice;
  const quentity = cart.length;
  console.log(cart, totalPrice, "orderescomponent");
  const dispatch = useDispatch();

  const submitOrder = async (e) => {
    e.preventDefault();
    if (quentity <= 0) {
      alert("please add product first");
      return;
    }
    const shippingAddress = e.target.elements;
    const token = localStorage.getItem("ecomAppToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      }
    };
    const response = await axios.post(
      "https://ecommerce-rest-api.vercel.app/api/v1/order",
      { shippingAddress: shippingAddress[0].value },
      config
    );
    if (response && response.data.message) {
      dispatch({ type: "GET_CART", payload: { cart: [], totalPrice: 0 } });
      navigate("/thankYou");
    }
  };
  return (
    <div className="container mt-4 mb-4">
      <main>
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h2>Checkout form</h2>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{quentity}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart &&
                cart.map((productItem) => (
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{productItem.product.title}</h6>
                    </div>
                    <span className="text-muted">{`${productItem.product.price} X ${productItem.quantity}`}</span>
                  </li>
                ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{totalPrice}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <form
              onSubmit={submitOrder}
              className="needs-validation"
              novalidate
            >
              <div className="row g-3">
                <div className="col-12">
                  <label for="address" className="form-label">
                    Shipping address
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};