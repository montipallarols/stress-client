import axios from "../../lib/axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const USEREMOTION_POST_SUCCESS = "USEREMOTION_POST_SUCCESS";

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

export const userEmotionPostSuccess = (userEmotion) => ({
  type: USEREMOTION_POST_SUCCESS,
  payload: userEmotion,
});

export const signUp = (firstName, lastName, email, password, phone) => {
  return async (dispatch, getState) => {
    console.log("REACHED?");
    try {
      console.log("fired");
      const response = await axios.post(`/signup`, {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      console.log("response?");
      dispatch(loginSucces(response.data));
    } catch (error) {
      console.log("...or no response?", error);
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
      console.log("Login response", response.data);
      dispatch(loginSucces(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
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
      } else {
        console.log(error);
      }
    }
    dispatch(logOut());
  };
};

export const addUserEmotion = (level, description, needHelp, date) => {
  return async (dispatch, getState) => {
    const { id } = selectUser(getState());
    console.log(id);
    dispatch(appLoading());
    try {
      const response = await axios.post(`/user/${id}`, {
        level,
        description,
        needHelp,
        date,
      });

      dispatch(userEmotionPostSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "feeling created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
