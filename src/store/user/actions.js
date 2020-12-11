import axios from "../../lib/axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessage,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const USEREMOTION_POST_SUCCESS = "USEREMOTION_POST_SUCCESS";

export function setLoading(loading) {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
}

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

export function userReflectionsFetched(reflections) {
  return {
    type: "REFLECTIONS_FETCHED",
    payload: reflections,
  };
}

export function reflectionCreated(reflection) {
  return {
    type: "REFLECTION_CREATED",
    payload: reflection,
  };
}

export const logOut = () => ({ type: LOG_OUT });

export const userEmotionPostSuccess = (userEmotion) => ({
  type: USEREMOTION_POST_SUCCESS,
  payload: userEmotion,
});

export const signUp = (firstName, lastName, email, password, phone) => {
  return async (dispatch, getState) => {
    // console.log("REACHED?");
    try {
      // console.log("fired");
      const response = await axios.post(`/signup`, {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      // console.log("response?");
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

export const addUserEmotion = (level, description, needHelp, userId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    const token = selectToken(getState());

    if (token === null) return;
    try {
      const response = await axios.post(
        `/user/${userId}`,
        {
          level,
          needHelp,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(userEmotionPostSuccess(response.data));
      dispatch(showMessage("feeling created"));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log("Is this undefined", error);
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

export function getUserReflections(userId) {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;
    console.log("did I get here?");
    try {
      const response = await axios.get(`/user/${userId}`);
      console.log("User reflection response", response.data.user.reflections);
      dispatch(userReflectionsFetched(response.data.user.reflections));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addReflection(today, userId, problem, solution, score) {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `user/reflections/${userId}/${today}`,
        {
          problem,
          solution,
          score,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("New reflection response", response.data);
      dispatch(reflectionCreated(response.data));
      dispatch(setLoading(false));
      dispatch(showMessage("reflection"));
    } catch (error) {
      console.log(error);
    }
  };
}
