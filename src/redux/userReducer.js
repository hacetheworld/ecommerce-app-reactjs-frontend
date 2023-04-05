const initialState = {
  user: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_LOGOUT":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
