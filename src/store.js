import { createStore, combineReducers } from "redux";
import { cartReducer } from "./redux/cartReducer";
import { userReducer } from "./redux/userReducer";

export const store = createStore(
  combineReducers({ cart: cartReducer, user: userReducer })
);
