import axios from "../../lib/axios";

export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSucces = (userWithToken) => {
  return {
    type: LOGIN_SUCCES,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => {
  return {
    type: TOKEN_STILL_VALID,
    payload: userWithoutToken,
  };
};

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (firstName, lastName, email, password, phone) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/signup`, {
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      dispatch(loginSucces(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/login`, {
        email,
        password,
      });

      dispatch(loginSucces(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    try {
      const response = await axios.get(`/me`, {
        header: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      }
    }
    dispatch(logOut());
  };
};
