const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const totalPriceFromStorage = localStorage.getItem("totalPrice")
  ? JSON.parse(localStorage.getItem("totalPrice"))
  : 0;

const initialState = {
  cartItems: cartItemsFromStorage,
  totalPrice: totalPriceFromStorage
};

const updateLocalStorage = (cartItems, totalPrice) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
};

const addToCart = (state, action) => {
  const { product, quantity } = action.payload;
  const itemExists = state.cartItems.find(
    (item) => item.product._id === product._id
  );

  if (itemExists) {
    const updatedCartItems = state.cartItems.map((item) =>
      item.product._id === product._id
        ? { product, quantity: item.quantity + quantity }
        : item
    );

    const updatedTotalPrice = state.totalPrice + product.price * quantity;

    updateLocalStorage(updatedCartItems, updatedTotalPrice);

    return {
      ...state,
      cartItems: updatedCartItems,
      totalPrice: updatedTotalPrice
    };
  } else {
    const newCartItem = { product, quantity };
    const updatedCartItems = [...state.cartItems, newCartItem];

    const updatedTotalPrice = state.totalPrice + product.price * quantity;

    updateLocalStorage(updatedCartItems, updatedTotalPrice);

    return {
      ...state,
      cartItems: updatedCartItems,
      totalPrice: updatedTotalPrice
    };
  }
};

const removeFromCart = (state, action) => {
  const { product, quantity } = action.payload;
  const itemExists = state.cartItems.find(
    (item) => item.product._id === product._id
  );

  if (itemExists) {
    const updatedCartItems = state.cartItems.map((item) =>
      item.product._id === product._id
        ? { product, quantity: item.quantity - quantity }
        : item
    );

    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity > 0
    );

    const updatedTotalPrice = state.totalPrice - product.price * quantity;

    updateLocalStorage(filteredCartItems, updatedTotalPrice);

    return {
      ...state,
      cartItems: filteredCartItems,
      totalPrice: updatedTotalPrice
    };
  } else {
    return state;
  }
};

const emptyCart = (state) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("totalPrice");
  return {
    ...state,
    cartItems: [],
    totalPrice: 0
  }
};


const updateCart = (state, action) => {
  const { product, quantity } = action.payload;
  const itemExists = state.cartItems.find(
    (item) => item.product._id === product._id
  );

  if (itemExists) {
    const updatedCartItems = state.cartItems.map((item) =>
      item.product._id === product._id ? { product, quantity } : item
    );

    const updatedTotalPrice =
      state.totalPrice -
      itemExists.product.price * itemExists.quantity +
      product.price * quantity;

    updateLocalStorage(updatedCartItems, updatedTotalPrice);

    return {
      ...state,
      cartItems: updatedCartItems,
      totalPrice: updatedTotalPrice
    };
  } else {
    return state;
  }
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    case "SET_TOTAL_PRICE":
      return { ...state, totalPrice: action.payload };
    case "ADD_TO_CART":
      return addToCart(state, action);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, action);
    case "UPDATE_CART":
      return updateCart(state, action);
    case "EMPTY_CART":
      return emptyCart();
    default:
      return state;
  }
};
