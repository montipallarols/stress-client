import { LOG_OUT, LOGIN_SUCCES, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  // token: localStorage.getItem("token"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCES:
      // localStorage.getItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      // localStorage.removeItem("token");
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
