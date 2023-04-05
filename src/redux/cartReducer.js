const initialState = {
  cart: [],
  totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        cart: action.payload.cart,
        totalPrice: action.payload.totalPrice
      };
    default:
      return state;
  }
};
