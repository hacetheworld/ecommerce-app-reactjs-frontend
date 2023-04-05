import { useDispatch } from "react-redux";
import axios from "axios";

export const useCart = () => {
  const dispatch = useDispatch();
  const addToCart = async (productId, cartQuantity) => {
    const token = localStorage.getItem("ecomAppToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      }
    };
    const response = await axios.post(
      "https://ecommerce-rest-api.vercel.app/api/v1/cart",
      {
        productId,
        cartQuantity
      },
      config
    );
    console.log(response.data, "response.datin hook");
    if (response && response.data) {
      dispatch({
        type: "GET_CART",
        payload: {
          cart: response.data,
          totalPrice: calculateTotal(response.data)
        }
      });
    }
  };

  const getCart = async () => {
    const token = localStorage.getItem("ecomAppToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      }
    };
    const response = await axios.get(
      "https://ecommerce-rest-lprmkz9iw-hacetheworld.vercel.app/api/v1/cart",
      config
    );
    console.log(response.data, "getData in cart");
    if (response && response.data) {
      dispatch({
        type: "GET_CART",
        payload: {
          cart: response.data,
          totalPrice: calculateTotal(response.data)
        }
      });
    }
  };

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return {
    addToCart,
    getCart,
    calculateTotal
  };
};
