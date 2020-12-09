import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const setMessage = (text) => {
  return {
    type: SET_MESSAGE,
    payload: text
  };
};

export const showMessage = (
  text
) => {
  return dispatch => {
    dispatch(setMessage(text));
  };
};
